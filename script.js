/*
 * script.js — logic, state, live-results API and rendering.
 *
 * Static tournament data (TEAMS, CHANNELS, STADIUMS, GROUP_FIXTURES,
 * KNOCKOUT_MATCHES, the Annex C map, etc.) lives in data.js, which must be
 * loaded first. Those top-level consts are visible here via the shared
 * global scope of classic scripts.
 */

/* =================== LIVE RESULTS API =================== */

const API_BASE = "https://worldcup26.ir";
let teamIdToCode = null;
let syncIntervalId = null;
let liveKeys = {};
let syncRunning = false;

/* =================== TOAST NOTIFICATIONS =================== */

/* Show a small notification (bottom-right on desktop, bottom on phones).
   Returns a controller so a long-running toast can be updated/dismissed:
     const t = showToast("A obter resultados…", { kind: "loading", sticky: true });
     t.update("Resultados atualizados", { kind: "success" });
     t.dismiss(2500); */
function showToast(
  message,
  { kind = "info", sticky = false, duration = 3500 } = {},
) {
  const host = document.getElementById("toasts");
  if (!host) return { update() {}, dismiss() {} };

  const icons = {
    loading: '<span class="toast-spinner" aria-hidden="true"></span>',
    success: '<span class="toast-ico">✓</span>',
    error: '<span class="toast-ico">⚠️</span>',
    info: '<span class="toast-ico">ℹ️</span>',
  };

  const el = document.createElement("div");
  el.className = `toast toast-${kind}`;
  el.setAttribute("role", "status");
  el.innerHTML = `${icons[kind] || ""}<span class="toast-msg"></span>`;
  el.querySelector(".toast-msg").textContent = message;
  host.appendChild(el);
  /* trigger the slide-in transition on the next frame */
  requestAnimationFrame(() => el.classList.add("show"));

  let timer = null;
  const remove = () => {
    el.classList.remove("show");
    el.addEventListener("transitionend", () => el.remove(), { once: true });
    /* safety net if the transition never fires */
    setTimeout(() => el.remove(), 400);
  };
  const dismiss = (delay = 0) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(remove, delay);
  };
  if (!sticky) dismiss(duration);

  return {
    update(newMessage, { kind: newKind } = {}) {
      if (newKind) {
        el.className = `toast toast-${newKind} show`;
        const ico = icons[newKind] || "";
        el.innerHTML = `${ico}<span class="toast-msg"></span>`;
      }
      el.querySelector(".toast-msg").textContent = newMessage;
    },
    dismiss,
  };
}

/* Fetch JSON from the live-results API. */
async function apiFetchJSON(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/* Build fixture timestamp map for time-window filtering.
	 Key = groupLetter+index, value = epoch ms (Portugal time, UTC+1). */
function buildFixtureTimestamps() {
  const map = {};
  for (const gl of GROUP_LETTERS) {
    GROUP_FIXTURES[gl].forEach((f, i) => {
      const parts = f.date.split("/");
      const d = +parts[0],
        m = +parts[1];
      const timeParts = f.time.split(":");
      const h = +timeParts[0],
        min = +timeParts[1];
      /* 2026-06-11 is start of tournament */
      map[gl + i] = Date.UTC(
        2026,
        m - 1,
        d,
        h - 1,
        min,
      ); /* Portugal UTC+1 -> UTC */
    });
  }
  /* knockout matches */
  KNOCKOUT_MATCHES.forEach((m) => {
    const whenParts = m.when.split("·").map((s) => s.trim());
    const dateParts = whenParts[0].split("/");
    const d = +dateParts[0],
      month = +dateParts[1];
    const rest = whenParts[1] || "";
    const timeMatch = rest.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      const h = +timeMatch[1],
        min = +timeMatch[2];
      map[`ko-${m.id}`] = Date.UTC(2026, month - 1, d, h - 1, min);
    }
  });
  return map;
}
const fixtureTimestamps = buildFixtureTimestamps();

async function ensureTeamMapping() {
  if (teamIdToCode) return;
  teamIdToCode = {};
  try {
    const data = await apiFetchJSON("/get/teams");
    const list = data.teams || data.matches || data || [];
    (Array.isArray(list) ? list : []).forEach((t) => {
      if (t.fifa_code) teamIdToCode[t.id] = t.fifa_code;
    });
  } catch (e) {
    /* allow a later attempt to rebuild the mapping */
    teamIdToCode = null;
    console.warn("[api] team mapping failed", e);
    throw e;
  }
}

/* Match an API game object to our fixture key. Returns fixtureKey string or null. */
function apiMatchToFixtureKey(matchData) {
  const m = matchData;
  if (m.type !== "group") return null;
  const gl = m.group;
  if (gl?.length !== 1) return null;
  const homeCode = teamIdToCode?.[m.home_team_id];
  const awayCode = teamIdToCode?.[m.away_team_id];
  if (!homeCode || !awayCode) return null;
  const fixtures = GROUP_FIXTURES[gl];
  if (!fixtures) return null;
  for (let i = 0; i < fixtures.length; i++) {
    const f = fixtures[i];
    if (f.home === homeCode && f.away === awayCode) return gl + i;
  }
  return null;
}

/* Fetch team mapping + all games, write scores for finished matches. */
async function fetchAllResults() {
  const btn = document.getElementById("fetchBtn");
  if (!btn) return;
  btn.disabled = true;
  btn.textContent = "📥 A obter…";
  const toast = showToast("A obter resultados…", {
    kind: "loading",
    sticky: true,
  });
  try {
    await ensureTeamMapping();
    const data = await apiFetchJSON("/get/games");
    const games = data.games || data.matches || data;
    if (!Array.isArray(games)) {
      toast.update("Sem resultados disponíveis", { kind: "info" });
      toast.dismiss(3000);
      btn.disabled = false;
      btn.textContent = "📥 Obter resultados";
      return;
    }
    let updated = 0;
    for (const m of games) {
      if (m.finished !== "TRUE" && m.time_elapsed === "notstarted") continue;
      if (
        m.home_score === "" ||
        m.away_score === "" ||
        m.home_score == null ||
        m.away_score == null
      )
        continue;
      const key = apiMatchToFixtureKey(m);
      if (!key) continue;
      state.groupScores[key] = [m.home_score, m.away_score];
      updated++;
    }
    if (updated > 0) {
      saveState();
      renderAll();
    }
    toast.update(
      updated > 0
        ? `Resultados atualizados (${updated} ${updated === 1 ? "jogo" : "jogos"})`
        : "Já estás atualizado",
      { kind: "success" },
    );
    toast.dismiss(3000);
    btn.disabled = false;
    btn.textContent = "📥 Obter resultados";
    return;
  } catch (e) {
    console.warn("[api] fetch failed", e);
    toast.update("Falha ao obter resultados. Tenta de novo.", {
      kind: "error",
    });
    toast.dismiss(4000);
    /* Briefly surface the failure on the button so it doesn't look frozen. */
    btn.textContent = "⚠️ Falhou — tentar de novo";
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "📥 Obter resultados";
    }, 2500);
    return;
  }
}

/* Single sync pass: fetch /get/games, update live + finished within 3h window. */
async function doSync() {
  if (syncRunning) return;
  syncRunning = true;
  try {
    await ensureTeamMapping();
    const now = Date.now();
    const windowStart = now - 3 * 3600000;
    const windowEnd = now + 2 * 3600000;
    const data = await apiFetchJSON("/get/games");
    const games = data.games || data.matches || data;
    if (!Array.isArray(games)) return;
    const newLive = {};
    for (const m of games) {
      const key = apiMatchToFixtureKey(m);
      if (!key) continue;
      const ts = fixtureTimestamps[key];
      if (!ts || ts < windowStart || ts > windowEnd) continue;
      if (m.finished === "TRUE") {
        state.groupScores[key] = [m.home_score, m.away_score];
        continue;
      }
      if (m.time_elapsed === "notstarted") continue;
      state.groupScores[key] = [m.home_score, m.away_score];
      newLive[key] = m.time_elapsed;
    }
    liveKeys = newLive;
    saveState();
    renderAll();
  } catch (e) {
    console.warn("[api] sync pass failed", e);
  }
  syncRunning = false;
}

function toggleSync() {
  const btn = document.getElementById("syncBtn");
  if (!btn) return;
  if (syncIntervalId) {
    clearInterval(syncIntervalId);
    syncIntervalId = null;
    btn.textContent = "🔴 Manter sincronizado";
    btn.classList.remove("active");
    liveKeys = {};
    renderAll();
    return;
  }
  btn.textContent = "⏹ Parar sincronização";
  btn.classList.add("active");
  doSync();
  syncIntervalId = setInterval(doSync, 60000);
}

/* =================== STATE =================== */
/* Everything the user types lives here and is persisted to localStorage:
	 - groupScores:   "A0".."L5" -> [homeGoals, awayGoals] as strings
	 - knockoutGames: matchId -> {key:"HOME|AWAY", homeGoals, awayGoals, penaltyWinnerSide}
	 - cards:         teamCode -> [yellows, secondYellows, directReds] */
const STORAGE_KEY = "wc26wallchart";
let state;

function freshState() {
  return { groupScores: {}, knockoutGames: {}, cards: {} };
}
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      return {
        groupScores: saved.groupScores || {},
        knockoutGames: saved.knockoutGames || {},
        cards: saved.cards || {},
      };
    }
  } catch (_error) {}
  return freshState();
}
state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_error) {}
}

/* =================== GROUP STAGE LOGIC =================== */

/* Conduct ("fair play") score: -1 yellow, -3 second yellow, -4 direct red.
	 Higher (closer to 0) is better. */
function conductScore(teamCode) {
  const cards = state.cards[teamCode] || [0, 0, 0];
  const yellows = +cards[0] || 0,
    secondYellows = +cards[1] || 0;
  const directReds = +cards[2] || 0;
  return -(yellows + 3 * secondYellows + 4 * directReds);
}

/* Compute table + finishing order for one group letter. Returns:
	 { teams, stats, playedResults, order, rankingNotes, complete } */
function computeGroup(groupLetter) {
  const fixtures = GROUP_FIXTURES[groupLetter];
  const teams = [
    ...new Set(fixtures.flatMap((fixture) => [fixture.home, fixture.away])),
  ];

  const stats = {};
  teams.forEach((team) => {
    stats[team] = {
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    };
  });

  const playedResults = [];
  fixtures.forEach((fixture, index) => {
    const score = state.groupScores[groupLetter + index];
    if (
      !score ||
      score[0] === "" ||
      score[1] === "" ||
      score[0] == null ||
      score[1] == null
    )
      return;
    const homeGoals = +score[0],
      awayGoals = +score[1];
    if (Number.isNaN(homeGoals) || Number.isNaN(awayGoals)) return;

    playedResults.push({
      home: fixture.home,
      away: fixture.away,
      homeGoals,
      awayGoals,
    });
    const homeStats = stats[fixture.home],
      awayStats = stats[fixture.away];
    homeStats.played++;
    awayStats.played++;
    homeStats.goalsFor += homeGoals;
    homeStats.goalsAgainst += awayGoals;
    awayStats.goalsFor += awayGoals;
    awayStats.goalsAgainst += homeGoals;
    if (homeGoals > awayGoals) {
      homeStats.wins++;
      awayStats.losses++;
      homeStats.points += 3;
    } else if (homeGoals < awayGoals) {
      awayStats.wins++;
      homeStats.losses++;
      awayStats.points += 3;
    } else {
      homeStats.draws++;
      awayStats.draws++;
      homeStats.points++;
      awayStats.points++;
    }
  });
  teams.forEach((team) => {
    stats[team].goalDifference =
      stats[team].goalsFor - stats[team].goalsAgainst;
  });

  /* rankingNotes[team]=true when the FIFA ranking had to break the tie */
  const rankingNotes = {};
  const order = rankGroupTeams(teams, stats, playedResults, rankingNotes);
  return {
    teams,
    stats,
    playedResults,
    order,
    rankingNotes,
    complete: playedResults.length === 6,
  };
}

/* FIFA tie-break procedure:
	 points -> head-to-head (points, GD, goals; re-applied among teams still
	 level) -> overall GD -> overall goals -> conduct score -> FIFA ranking. */
function rankGroupTeams(teams, stats, playedResults, rankingNotes) {
  const pointClusters = clusterByValue(teams, (team) => stats[team].points);
  let order = [];
  pointClusters.forEach((cluster) => {
    order = order.concat(
      cluster.length > 1
        ? breakTieHeadToHead(cluster, stats, playedResults, rankingNotes, 0)
        : cluster,
    );
  });
  return order;
}

/* Sort descending by keyFunction and group items that share the same value. */
function clusterByValue(items, keyFunction) {
  const sorted = [...items].sort(
    (itemA, itemB) => keyFunction(itemB) - keyFunction(itemA),
  );
  const clusters = [];
  let currentCluster = [],
    currentValue = null;
  sorted.forEach((item) => {
    const value = keyFunction(item);
    if (currentCluster.length && value !== currentValue) {
      clusters.push(currentCluster);
      currentCluster = [];
    }
    currentCluster.push(item);
    currentValue = value;
  });
  if (currentCluster.length) clusters.push(currentCluster);
  return clusters;
}

/* Criteria a-c: points, goal difference and goals scored counting only the
	 matches between the tied teams; re-applied recursively to any subset that
	 remains level, as the regulations require. */
function breakTieHeadToHead(
  tiedTeams,
  stats,
  playedResults,
  rankingNotes,
  depth,
) {
  if (tiedTeams.length === 1) return tiedTeams;
  if (depth > 4) return breakTieOverall(tiedTeams, stats, rankingNotes);

  const tiedSet = new Set(tiedTeams);
  const headToHead = {};
  tiedTeams.forEach((team) => {
    headToHead[team] = { points: 0, goalDifference: 0, goalsFor: 0 };
  });
  playedResults.forEach((result) => {
    if (!tiedSet.has(result.home) || !tiedSet.has(result.away)) return;
    headToHead[result.home].goalsFor += result.homeGoals;
    headToHead[result.home].goalDifference +=
      result.homeGoals - result.awayGoals;
    headToHead[result.away].goalsFor += result.awayGoals;
    headToHead[result.away].goalDifference +=
      result.awayGoals - result.homeGoals;
    if (result.homeGoals > result.awayGoals)
      headToHead[result.home].points += 3;
    else if (result.homeGoals < result.awayGoals)
      headToHead[result.away].points += 3;
    else {
      headToHead[result.home].points++;
      headToHead[result.away].points++;
    }
  });

  /* Single comparable number: points first, then GD, then goals. */
  const headToHeadKey = (team) =>
    headToHead[team].points * 10000 +
    headToHead[team].goalDifference * 100 +
    headToHead[team].goalsFor;

  const subClusters = clusterByValue(tiedTeams, headToHeadKey);
  if (subClusters.length === 1)
    return breakTieOverall(tiedTeams, stats, rankingNotes);

  let order = [];
  subClusters.forEach((cluster) => {
    order = order.concat(
      cluster.length > 1
        ? breakTieHeadToHead(
            cluster,
            stats,
            playedResults,
            rankingNotes,
            depth + 1,
          )
        : cluster,
    );
  });
  return order;
}

/* Criteria d-g: overall goal difference, overall goals scored, conduct
	 score, FIFA ranking. Flags teams whose tie needed the FIFA ranking. */
function breakTieOverall(tiedTeams, stats, rankingNotes) {
  const sorted = [...tiedTeams].sort(
    (teamA, teamB) =>
      stats[teamB].goalDifference - stats[teamA].goalDifference ||
      stats[teamB].goalsFor - stats[teamA].goalsFor ||
      conductScore(teamB) - conductScore(teamA) ||
      TEAMS[teamA].fifaRank - TEAMS[teamB].fifaRank,
  );
  for (let i = 0; i < sorted.length - 1; i++) {
    const above = sorted[i],
      below = sorted[i + 1];
    const stillLevel =
      stats[above].goalDifference === stats[below].goalDifference &&
      stats[above].goalsFor === stats[below].goalsFor &&
      conductScore(above) === conductScore(below);
    if (stillLevel) {
      rankingNotes[above] = true;
      rankingNotes[below] = true;
    }
  }
  return sorted;
}

/* =================== THIRD-PLACED TEAMS =================== */

/* Rank the 12 third-placed teams; the best 8 advance.
	 Criteria: points -> GD -> goals -> conduct -> FIFA ranking. */
function rankThirdPlacedTeams(groupsData) {
  const thirdPlaced = GROUP_LETTERS.map((groupLetter) => {
    const group = groupsData[groupLetter];
    const teamCode = group.order[2];
    return {
      groupLetter,
      teamCode,
      stats: group.stats[teamCode],
      complete: group.complete,
    };
  });

  const rankingNotes = {};
  thirdPlaced.sort(
    (entryA, entryB) =>
      entryB.stats.points - entryA.stats.points ||
      entryB.stats.goalDifference - entryA.stats.goalDifference ||
      entryB.stats.goalsFor - entryA.stats.goalsFor ||
      conductScore(entryB.teamCode) - conductScore(entryA.teamCode) ||
      TEAMS[entryA.teamCode].fifaRank - TEAMS[entryB.teamCode].fifaRank,
  );
  for (let i = 0; i < thirdPlaced.length - 1; i++) {
    const above = thirdPlaced[i],
      below = thirdPlaced[i + 1];
    const stillLevel =
      above.stats.points === below.stats.points &&
      above.stats.goalDifference === below.stats.goalDifference &&
      above.stats.goalsFor === below.stats.goalsFor &&
      conductScore(above.teamCode) === conductScore(below.teamCode);
    if (stillLevel) {
      rankingNotes[above.teamCode] = true;
      rankingNotes[below.teamCode] = true;
    }
  }
  return { list: thirdPlaced, rankingNotes };
}

/* =================== TOURNAMENT CONTEXT =================== */

/* One pass over everything derived from the user's inputs:
	 group tables, third-place ranking and (once all 72 matches are in)
	 the Annex C assignment of thirds to round-of-32 matches. */
function buildTournamentContext() {
  const groupsData = {};
  GROUP_LETTERS.forEach((groupLetter) => {
    groupsData[groupLetter] = computeGroup(groupLetter);
  });

  const thirdPlaceRanking = rankThirdPlacedTeams(groupsData);
  const groupStageComplete = GROUP_LETTERS.every(
    (groupLetter) => groupsData[groupLetter].complete,
  );

  let thirdPlaceAssignments = null;
  if (groupStageComplete) {
    const bestEight = thirdPlaceRanking.list.slice(0, 8);
    const combinationKey = bestEight
      .map((entry) => entry.groupLetter)
      .sort()
      .join("");
    const slotGroups = THIRD_PLACE_BRACKET_MAP[combinationKey];
    if (slotGroups) {
      thirdPlaceAssignments = {};
      THIRD_PLACE_MATCH_ORDER.forEach((matchId, index) => {
        const sourceGroup = slotGroups[index];
        thirdPlaceAssignments[matchId] = groupsData[sourceGroup].order[2];
      });
    }
  }
  return {
    groupsData,
    thirdPlaceRanking,
    groupStageComplete,
    thirdPlaceAssignments,
  };
}

/* =================== KNOCKOUT LOGIC =================== */

/* Cache of computed knockout results for the current render pass
	 (winners cascade, so later matches reuse earlier results). */
const knockoutCache = {};
function clearKnockoutCache() {
  for (const key in knockoutCache) delete knockoutCache[key];
}

/* Resolve a knockout match. Returns:
	 { home, away, winner, loser, entry, wentToPenalties, needsPenaltyPick } */
function computeKnockoutResult(matchId, context) {
  const match = KNOCKOUT_BY_ID[matchId];
  const home = resolveSlot(match.slots[0], context);
  const away = resolveSlot(match.slots[1], context);
  if (!home || !away)
    return { home, away, winner: null, loser: null, entry: null };

  /* The pairing key invalidates a stored score when upstream results change. */
  const pairingKey = `${home}|${away}`;
  const entry = state.knockoutGames[matchId];
  const entryIsValid = entry && entry.key === pairingKey;
  if (
    !entryIsValid ||
    entry.homeGoals === "" ||
    entry.awayGoals === "" ||
    entry.homeGoals == null ||
    entry.awayGoals == null
  )
    return {
      home,
      away,
      winner: null,
      loser: null,
      entry: entryIsValid ? entry : null,
    };

  const homeGoals = +entry.homeGoals,
    awayGoals = +entry.awayGoals;
  if (Number.isNaN(homeGoals) || Number.isNaN(awayGoals))
    return { home, away, winner: null, loser: null, entry };
  if (homeGoals > awayGoals)
    return { home, away, winner: home, loser: away, entry };
  if (homeGoals < awayGoals)
    return { home, away, winner: away, loser: home, entry };

  /* Draw: the user picks who survives extra time / penalties. */
  if (entry.penaltyWinnerSide === 0)
    return {
      home,
      away,
      winner: home,
      loser: away,
      entry,
      wentToPenalties: true,
    };
  if (entry.penaltyWinnerSide === 1)
    return {
      home,
      away,
      winner: away,
      loser: home,
      entry,
      wentToPenalties: true,
    };
  return {
    home,
    away,
    winner: null,
    loser: null,
    entry,
    needsPenaltyPick: true,
  };
}

/* Turn a slot token ("1A", "2B", "T79", "W73", "L101") into a team code,
	 or null while it cannot be resolved yet. */
function resolveSlot(slotToken, context) {
  const kind = slotToken[0];
  if (kind === "1" || kind === "2") {
    const group = context.groupsData[slotToken[1]];
    if (!group.complete) return null;
    return group.order[kind === "1" ? 0 : 1];
  }
  if (kind === "T") {
    const matchId = +slotToken.slice(1);
    return context.thirdPlaceAssignments
      ? context.thirdPlaceAssignments[matchId] || null
      : null;
  }
  if (kind === "W" || kind === "L") {
    const matchId = +slotToken.slice(1);
    if (!(matchId in knockoutCache))
      knockoutCache[matchId] = computeKnockoutResult(matchId, context);
    return kind === "W"
      ? knockoutCache[matchId].winner
      : knockoutCache[matchId].loser;
  }
  return null;
}

/* Human label for an unresolved slot. */
function describeSlot(slotToken, match) {
  const kind = slotToken[0];
  if (kind === "1") return `Vencedor Grupo ${slotToken[1]}`;
  if (kind === "2") return `2.º Grupo ${slotToken[1]}`;
  if (kind === "T") return `3.º · Grupos ${match.thirdFromGroups || ""}`;
  if (kind === "W") {
    const matchId = +slotToken.slice(1);
    return matchId === 101 || matchId === 102
      ? `Vencedor MF${matchId - 100}`
      : `Vencedor J${matchId}`;
  }
  if (kind === "L") return `Vencido MF${+slotToken.slice(1) - 100}`;
  return slotToken;
}

/* =================== RENDERING =================== */
const escapeHTML = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function channelChipsHTML(channelIds, extraClass) {
  const theme = document.documentElement.getAttribute("data-theme");
  const themeSuffix = theme === "dark" ? "_dark" : "_light";
  return (
    `<span class="bcs ${extraClass || ""}">` +
    channelIds
      .map((id) => {
        const channel = CHANNELS[id];
        const iconPath = channel.icon + (id === "lm" ? themeSuffix : "");
        return (
          `<span class="bc" title="${channel.name}">` +
          `<img src="${iconPath}.${channel.ext}" alt="">` +
          `<i>${channel.abbreviation}</i></span>`
        );
      })
      .join("") +
    `</span>`
  );
}

function renderGroups(context) {
  let html = "";
  const bestEightThirds = new Set(
    context.thirdPlaceRanking.list.slice(0, 8).map((entry) => entry.teamCode),
  );

  GROUP_LETTERS.forEach((groupLetter) => {
    const group = context.groupsData[groupLetter];

    /* fixtures + score inputs */
    let fixturesHTML = "";
    GROUP_FIXTURES[groupLetter].forEach((fixture, index) => {
      const score = state.groupScores[groupLetter + index] || ["", ""];
      const fixtureKey = `${groupLetter}${index}`;
      const isLive = liveKeys[fixtureKey];
      const liveBadge = isLive ? `<span class="live-min">${isLive}</span>` : "";
      fixturesHTML += `<div class="fx ${isLive ? "live" : ""}">
        <span class="d"><b>${fixture.date}</b><b>${fixture.time}</b>${liveBadge}</span>
        <span class="h">${escapeHTML(TEAMS[fixture.home].name)} ${TEAMS[fixture.home].flag}</span>
        <span class="mid">
          <input class="sc" data-k="gs-${groupLetter}${index}-0" value="${score[0] ?? ""}" placeholder="·" inputmode="numeric" maxlength="2">
          <input class="sc" data-k="gs-${groupLetter}${index}-1" value="${score[1] ?? ""}" placeholder="·" inputmode="numeric" maxlength="2">
        </span>
        <span class="a">${TEAMS[fixture.away].flag} ${escapeHTML(TEAMS[fixture.away].name)}</span>
        ${channelChipsHTML(fixture.channels)}
      </div>`;
    });

    /* standings table */
    let standingsHTML = "";
    group.order.forEach((teamCode, position) => {
      const teamStats = group.stats[teamCode];
      let rowClass = "",
        dotClass = "tbd",
        dotTitle = "";
      if (group.complete) {
        if (position < 2) {
          rowClass = "r-adv";
          dotClass = "adv";
          dotTitle = "Apurada para os 16 avos de final";
        } else if (position === 2) {
          if (bestEightThirds.has(teamCode)) {
            rowClass = "r-third";
            dotClass = "third";
            dotTitle = context.groupStageComplete
              ? "Apurada como uma das 8 melhores terceiras"
              : "Neste momento dentro das 8 melhores terceiras";
          } else {
            rowClass = context.groupStageComplete ? "r-out" : "";
            dotClass = context.groupStageComplete ? "out" : "tbd";
            dotTitle = context.groupStageComplete
              ? "Eliminada"
              : "Neste momento fora das 8 melhores terceiras";
          }
        } else {
          rowClass = "r-out";
          dotClass = "out";
          dotTitle = "Eliminada";
        }
      }
      const rankingMark = group.rankingNotes[teamCode]
        ? `<sup class="tiemark" title="Empate resolvido pelo ranking FIFA (#${TEAMS[teamCode].fifaRank})">R</sup>`
        : "";
      standingsHTML += `<tr class="${rowClass}">
        <td><span class="qdot ${dotClass}" title="${dotTitle}"></span></td>
        <td class="team">${TEAMS[teamCode].flag} ${escapeHTML(TEAMS[teamCode].name)}${rankingMark}</td>
        <td>${teamStats.played}</td><td class="cv">${teamStats.wins}</td><td class="ce">${teamStats.draws}</td><td class="cd">${teamStats.losses}</td>
        <td>${teamStats.goalsFor}</td><td>${teamStats.goalsAgainst}</td>
        <td>${teamStats.goalDifference > 0 ? "+" : ""}${teamStats.goalDifference}</td>
        <td class="pts">${teamStats.points}</td>
      </tr>`;
    });

    /* tie-break drawer: cards per team */
    let cardsHTML = "";
    group.order.forEach((teamCode) => {
      const cards = state.cards[teamCode] || ["", "", ""];
      cardsHTML += `<tr>
        <td class="tl">${TEAMS[teamCode].flag} ${escapeHTML(TEAMS[teamCode].name)}</td>
        <td><input class="fpi" data-k="fp-${teamCode}-0" value="${cards[0] ?? ""}" inputmode="numeric" maxlength="2"></td>
        <td><input class="fpi" data-k="fp-${teamCode}-1" value="${cards[1] ?? ""}" inputmode="numeric" maxlength="2"></td>
        <td><input class="fpi" data-k="fp-${teamCode}-2" value="${cards[2] ?? ""}" inputmode="numeric" maxlength="2"></td>
        <td><b>${conductScore(teamCode)}</b></td>
        <td>#${TEAMS[teamCode].fifaRank}</td>
      </tr>`;
    });

    html += `<div class="gcard">
      <div class="gcard-head"><span class="gl">${groupLetter}</span><span class="gt">Grupo ${groupLetter}</span>
        <span class="badge ${group.complete ? "done" : "live"}">${group.complete ? "Concluído" : `${group.playedResults.length} / 6 jogados`}</span></div>
      <div class="gcard-body">
        <div class="fixtures">${fixturesHTML}</div>
        <div class="standwrap">
          <table class="stand">
            <colgroup>
              <col class="c-dot"><col class="c-team">
              <col class="c-num"><col class="c-num"><col class="c-num"><col class="c-num">
              <col class="c-num"><col class="c-num"><col class="c-num"><col class="c-pts">
            </colgroup>
            <thead><tr><th></th><th class="tl">Equipa</th><th>J</th><th class="cv">V</th><th class="ce">E</th><th class="cd">D</th><th>GM</th><th>GS</th><th>DG</th><th>Pts</th></tr></thead>
            <tbody>${standingsHTML}</tbody>
          </table>
          <details class="fp"><summary>Dados de desempate · cartões e conduta</summary>
        <table class="fpt">
          <colgroup>
            <col class="c-team">
            <col class="c-num"><col class="c-num"><col class="c-num">
            <col class="c-stat"><col class="c-stat">
          </colgroup>
          <thead><tr><th class="tl">Equipa</th><th title="Cartão amarelo (−1)">🟨</th><th title="Duplo amarelo (−3)">🟨🟨</th><th title="Vermelho direto (−4)">🟥</th><th>Pont.</th><th>FIFA</th></tr></thead>
          <tbody>${cardsHTML}</tbody>
        </table>
        <div class="fpnote">Pontuação de conduta = −1 por amarelo, −3 por duplo amarelo, −4 por vermelho direto. Um amarelo seguido de vermelho direto soma os dois (−1 −4 = −5). Só conta se as equipas continuarem empatadas após o confronto direto e os golos; o ranking FIFA (coluna da direita, 11 jun 2026) desfaz automaticamente qualquer empate restante.</div>
          </details>
        </div>
      </div>
    </div>`;
  });

  document.getElementById("groupsGrid").innerHTML = html;
}

function renderThirdPlaceTable(context) {
  let rowsHTML = "";
  context.thirdPlaceRanking.list.forEach((entry, index) => {
    const insideCut = index < 8;
    const rankingMark = context.thirdPlaceRanking.rankingNotes[entry.teamCode]
      ? `<sup class="tiemark" title="Empate resolvido pelo ranking FIFA (#${TEAMS[entry.teamCode].fifaRank})">R</sup>`
      : "";
    const status = entry.complete
      ? insideCut
        ? '<span class="in">APURADA</span>'
        : '<span class="outx">FORA</span>'
      : '<span style="color:var(--ph)">…</span>';
    rowsHTML += `<tr class="${index === 7 ? "cut" : ""}">
      <td>${index + 1}</td>
      <td><b>${entry.groupLetter}</b></td>
      <td class="team">${TEAMS[entry.teamCode].flag} ${escapeHTML(TEAMS[entry.teamCode].name)}${rankingMark}</td>
      <td>${entry.stats.played}</td><td><b>${entry.stats.points}</b></td>
      <td>${entry.stats.goalDifference > 0 ? "+" : ""}${entry.stats.goalDifference}</td><td>${entry.stats.goalsFor}</td>
      <td>${conductScore(entry.teamCode)}</td><td>#${TEAMS[entry.teamCode].fifaRank}</td>
      <td>${status}</td>
    </tr>`;
  });

  const provisionalNote = context.groupStageComplete
    ? ""
    : '<div class="fpnote" style="margin-top:9px">A classificação é provisória até estarem inseridos os 72 jogos da fase de grupos — só então o Anexo C da FIFA fixa as terceiras classificadas no quadro.</div>';

  document.getElementById("thirdsWrap").innerHTML = `
    <table class="thirds">
      <thead><tr><th>#</th><th>Grp</th><th class="tl">Equipa (atual 3.ª)</th><th>J</th><th>Pts</th><th>DG</th><th>GM</th><th>Conduta</th><th>FIFA</th><th>Estado</th></tr></thead>
      <tbody>${rowsHTML}</tbody>
    </table>${provisionalNote}`;
}

/* One knockout match box. */
function knockoutBoxHTML(matchId, context, extraClass) {
  const match = KNOCKOUT_BY_ID[matchId];
  const result =
    knockoutCache[matchId] || computeKnockoutResult(matchId, context);
  const entry = state.knockoutGames[matchId];
  const pairingKey =
    result.home && result.away ? `${result.home}|${result.away}` : null;
  const scores =
    entry && entry.key === pairingKey
      ? [entry.homeGoals ?? "", entry.awayGoals ?? ""]
      : ["", ""];

  const roundLabel =
    matchId === FINAL_MATCH_ID
      ? "Final"
      : matchId === THIRD_PLACE_MATCH_ID
        ? "3.º lugar"
        : matchId >= 101
          ? "Meia-final"
          : matchId >= 97
            ? "Quartos de final"
            : matchId >= 89
              ? "Oitavos de final"
              : "16 avos de final";

  const tentativeTeam = (slotToken) => {
    const kind = slotToken[0];
    if (kind === "1" || kind === "2") {
      const group = context.groupsData[slotToken[1]];
      if (group.playedResults.length > 0 && !group.complete)
        return group.order[kind === "1" ? 0 : 1] || null;
    }
    return null;
  };

  const teamRowHTML = (teamCode, slotToken, scoreValue, side) => {
    const isKnown = !!teamCode;
    const tentative = !isKnown ? tentativeTeam(slotToken) : null;
    const showTentative = !!tentative;
    let rowClass = "";
    if (result.winner) rowClass = result.winner === teamCode ? "win" : "lose";
    return `<div class="bk-row ${rowClass}">
      <span class="fl">${isKnown ? TEAMS[teamCode].flag : "–"}</span>
      <span class="nm ${isKnown ? "" : "ph"}">${
        isKnown
          ? escapeHTML(TEAMS[teamCode].name)
          : showTentative
            ? `${escapeHTML(describeSlot(slotToken, match))} (${TEAMS[tentative].flag})`
            : escapeHTML(describeSlot(slotToken, match))
      }</span>
      <input class="ksc" data-k="ko-${matchId}-${side}" value="${scoreValue}" placeholder="·" inputmode="numeric" maxlength="2" ${isKnown && result.home && result.away ? "" : "disabled"}>
    </div>`;
  };

  let penaltiesHTML = "";
  if (result.needsPenaltyPick) {
    penaltiesHTML = `<div class="pens"><span>Prol. / penáltis — vencedor:</span>
      <button data-pw="${matchId}-0">${result.home}</button>
      <button data-pw="${matchId}-1">${result.away}</button></div>`;
  } else if (result.wentToPenalties) {
    penaltiesHTML = `<div class="pens"><span>venceu no prol. / penáltis:</span>
      <button data-pw="${matchId}-0" class="${result.entry.penaltyWinnerSide === 0 ? "sel" : ""}">${result.home}</button>
      <button data-pw="${matchId}-1" class="${result.entry.penaltyWinnerSide === 1 ? "sel" : ""}">${result.away}</button></div>`;
  }

  const channelsHTML = match.channels
    ? `<div class="bk-bc"><span>📺</span>${channelChipsHTML(match.channels, "lg")}</div>`
    : "";

  /* emphasise time in date-time-venue string, like group stage does.
     Each piece keeps its trailing separator glued (nowrap) so a "·" never
     dangles at the start of a wrapped line on narrow screens. */
  const whenParts = match.when.split("·").map((p) => p.trim());
  const venue =
    whenParts[2] === "Cidade do México"
      ? '<span class="v-full">Cidade do México</span><span class="v-short">Cd. do México</span>'
      : whenParts[2];
  const whenHTML =
    whenParts.length === 3
      ? `<span class="w-piece">${whenParts[0]} ·</span> <span class="w-piece"><b>${whenParts[1]}</b> ·</span> <span class="w-piece">${venue}</span>`
      : match.when;

  return `<div class="bk ${extraClass || ""}">
    <div class="bk-head"><span>J${matchId} · ${roundLabel}</span></div>
    <div class="bk-when">${whenHTML}</div>
    ${teamRowHTML(result.home, match.slots[0], scores[0], 0)}
    ${teamRowHTML(result.away, match.slots[1], scores[1], 1)}
    ${penaltiesHTML}
    ${channelsHTML}
  </div>`;
}

function renderBracketGrid(context) {
  const titles = [
    "16 avos de final · 28 jun–3 jul",
    "Oitavos · 4–7 jul",
    "Quartos · 9–12 jul",
    "Meias-finais · 14–15 jul",
    "Final · 19 jul · NI/NJ",
  ];
  let html = "";
  BRACKET_COLUMNS.forEach((columnSpec) => {
    columnSpec.matchIds.forEach((matchId, index) => {
      const startRow = index * columnSpec.rowSpan + 1;
      const connClass = index % 2 === 0 ? "conn-dn" : "conn-up";
      const extra = columnSpec.column === 4 ? " col4" : "";
      html += `<div class="bcell ${connClass}${extra}" style="grid-column:${columnSpec.column};grid-row:${startRow} / span ${columnSpec.rowSpan}">${knockoutBoxHTML(matchId, context)}</div>`;
    });
  });

  const finalResult =
    knockoutCache[FINAL_MATCH_ID] ||
    computeKnockoutResult(FINAL_MATCH_ID, context);
  const championHTML = finalResult.winner
    ? `<div class="champ"><div class="lbl">Campeões do Mundo</div><div class="nm">🏆 ${TEAMS[finalResult.winner].flag} ${escapeHTML(TEAMS[finalResult.winner].name)}</div></div>`
    : `<div class="champ empty"><div class="lbl">Campeões do Mundo</div><div class="nm">— por decidir —</div></div>`;

  html += `<div class="bcell conn-in" style="grid-column:5;grid-row:1 / span 16">
    <div class="final-col">
      ${championHTML}
      ${knockoutBoxHTML(FINAL_MATCH_ID, context, "final")}
      ${knockoutBoxHTML(THIRD_PLACE_MATCH_ID, context, "bronze")}
    </div>
  </div>`;
  document.getElementById("bracketGrid").className = "bracket-grid";
  document.getElementById("bracketGrid").innerHTML =
    `<div class="br-grid-labels">${titles.map((t) => `<span>${t}</span>`).join("")}</div>
<div class="br-grid-body">${html}</div>`;

  requestAnimationFrame(() => {
    const cell = document.querySelector(
      "#bracketGrid .br-grid-body .bcell.conn-in",
    );
    const finalBox = cell?.querySelector(".bk.final");
    if (cell && finalBox) {
      const cellRect = cell.getBoundingClientRect();
      const finalRect = finalBox.getBoundingClientRect();
      const centerY = finalRect.top + finalRect.height / 2 - cellRect.top;
      cell.style.setProperty("--conn-top", `${centerY}px`);
    }
  });
}

function renderBracketFlex(context) {
  const roundDefs = [
    {
      title: "16 avos de final · 28 jun–3 jul",
      matchIds: [
        73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
      ],
    },
    { title: "Oitavos · 4–7 jul", matchIds: [89, 90, 91, 92, 93, 94, 95, 96] },
    { title: "Quartos · 9–12 jul", matchIds: [97, 98, 99, 100] },
    { title: "Meias-finais · 14–15 jul", matchIds: [101, 102] },
  ];

  let html = roundDefs
    .map((round) => {
      const matchesHTML = round.matchIds
        .map(
          (id) => `<div class="br-match">${knockoutBoxHTML(id, context)}</div>`,
        )
        .join("");
      return `<div class="br-round"><div class="br-round-title">${round.title}</div><div class="br-matches">${matchesHTML}</div></div>`;
    })
    .join("");

  const finalResult =
    knockoutCache[FINAL_MATCH_ID] ||
    computeKnockoutResult(FINAL_MATCH_ID, context);
  const championHTML = finalResult.winner
    ? `<div class="champ"><div class="lbl">Campeões do Mundo</div><div class="nm">🏆 ${TEAMS[finalResult.winner].flag} ${escapeHTML(TEAMS[finalResult.winner].name)}</div></div>`
    : `<div class="champ empty"><div class="lbl">Campeões do Mundo</div><div class="nm">— por decidir —</div></div>`;

  html += `<div class="br-round br-round-final"><div class="br-round-title">Final · 19 jul · NI/NJ</div><div class="br-matches">
    <div class="br-match">${championHTML}</div>
    <div class="br-match">${knockoutBoxHTML(FINAL_MATCH_ID, context, "final")}</div>
    <div class="br-match">${knockoutBoxHTML(THIRD_PLACE_MATCH_ID, context, "bronze")}</div>
  </div></div>`;

  document.getElementById("bracketGrid").className = "bracket-flex";
  document.getElementById("bracketGrid").innerHTML = html;
}

function renderBracket(context) {
  if (window.innerWidth >= 1220) {
    renderBracketGrid(context);
  } else {
    renderBracketFlex(context);
  }
}

/* Fill the nav progress indicator: how many of the 104 matches have a result. */
/* =================== MATCHES (CALENDAR) VIEW =================== */

const WEEKDAYS_PT = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

/* Compact round label + group badge text for a knockout match id. */
function knockoutBadge(matchId) {
  if (matchId === FINAL_MATCH_ID) return "Final";
  if (matchId === THIRD_PLACE_MATCH_ID) return "3.º/4.º";
  if (matchId >= 101) return "Semi";
  if (matchId >= 97) return "Quartos";
  if (matchId >= 89) return "Oitavos";
  return "16 avos";
}

/* Resolved team-cell content for the matches list: real team when known,
   otherwise the placeholder slot label (e.g. "Vencedor Grupo A"). */
function matchTeamCell(teamCode, slotToken, match) {
  if (teamCode) {
    return `<span class="mt-flag">${TEAMS[teamCode].flag}</span><span class="mt-name">${escapeHTML(TEAMS[teamCode].name)}</span>`;
  }
  const label = slotToken ? describeSlot(slotToken, match) : "—";
  return `<span class="mt-flag">·</span><span class="mt-name ph">${escapeHTML(label)}</span>`;
}

/* Build a flat, time-sorted list of all 104 matches with everything the
   calendar view needs. */
function buildAllMatches(context) {
  const matches = [];

  GROUP_LETTERS.forEach((groupLetter) => {
    GROUP_FIXTURES[groupLetter].forEach((fixture, index) => {
      const fixtureKey = `${groupLetter}${index}`;
      const score = state.groupScores[fixtureKey];
      const hasScore =
        score &&
        score[0] !== "" &&
        score[1] !== "" &&
        score[0] != null &&
        score[1] != null;
      const matchKey = `${groupLetter}|${fixture.home}|${fixture.away}`;
      const stadiumId = GROUP_MATCH_STADIUM[matchKey];
      const matchNumber = GROUP_MATCH_NUMBER[matchKey];
      matches.push({
        ts: fixtureTimestamps[fixtureKey] ?? Number.MAX_SAFE_INTEGER,
        date: fixture.date,
        time: fixture.time,
        badgeNum: `J${matchNumber}`,
        badgePhase: `Grupo ${groupLetter}`,
        homeHTML: matchTeamCell(fixture.home, null, null),
        awayHTML: matchTeamCell(fixture.away, null, null),
        homeScore: hasScore ? score[0] : null,
        awayScore: hasScore ? score[1] : null,
        live: liveKeys[fixtureKey] || null,
        channels: fixture.channels,
        stadiumId,
      });
    });
  });

  KNOCKOUT_MATCHES.forEach((match) => {
    const result =
      knockoutCache[match.id] || computeKnockoutResult(match.id, context);
    const entry = state.knockoutGames[match.id];
    const pairingKey =
      result.home && result.away ? `${result.home}|${result.away}` : null;
    const hasScore =
      entry &&
      entry.key === pairingKey &&
      entry.homeGoals !== "" &&
      entry.awayGoals !== "" &&
      entry.homeGoals != null &&
      entry.awayGoals != null;
    const whenParts = match.when.split("·").map((part) => part.trim());
    matches.push({
      ts: fixtureTimestamps[`ko-${match.id}`] ?? Number.MAX_SAFE_INTEGER,
      date: whenParts[0],
      time: (whenParts[1] || "").match(/\d{1,2}:\d{2}/)?.[0] || "",
      badgeNum: `J${match.id}`,
      badgePhase: knockoutBadge(match.id),
      homeHTML: matchTeamCell(result.home, match.slots[0], match),
      awayHTML: matchTeamCell(result.away, match.slots[1], match),
      homeScore: hasScore ? entry.homeGoals : null,
      awayScore: hasScore ? entry.awayGoals : null,
      penalties: hasScore && result.wentToPenalties ? result.winner : null,
      live: null,
      channels: match.channels,
      stadiumId: KO_MATCH_STADIUM[match.id],
    });
  });

  matches.sort((a, b) => a.ts - b.ts);
  return matches;
}

/* Centre cell that lines results up by the dash and times up by the colon:
   left number / separator / right number share fixed-width columns. */
function matchResultHTML(match) {
  if (match.homeScore != null && match.awayScore != null) {
    const liveClass = match.live ? " live" : "";
    return `<span class="mres${liveClass}">
      <span class="rl">${escapeHTML(String(match.homeScore))}</span>
      <span class="rs">–</span>
      <span class="rr">${escapeHTML(String(match.awayScore))}</span>
    </span>`;
  }
  const [hh, mm] = (match.time || "").split(":");
  return `<span class="mres time">
    <span class="rl">${escapeHTML(hh || "")}</span>
    <span class="rs">:</span>
    <span class="rr">${escapeHTML(mm || "")}</span>
  </span>`;
}

function renderMatches(context) {
  const container = document.getElementById("matchesList");
  if (!container) return;

  const matches = buildAllMatches(context);

  /* Group consecutive (already time-sorted) matches by calendar day. */
  const days = [];
  let current = null;
  matches.forEach((match) => {
    if (!current || current.date !== match.date) {
      const [dd, mm] = match.date.split("/").map(Number);
      const weekday =
        WEEKDAYS_PT[new Date(Date.UTC(2026, mm - 1, dd)).getUTCDay()];
      current = { date: match.date, weekday, items: [] };
      days.push(current);
    }
    current.items.push(match);
  });

  let html = "";
  days.forEach((day) => {
    const rows = day.items
      .map((match) => {
        const stadium = match.stadiumId ? STADIUMS[match.stadiumId] : null;
        const venueHTML = stadium
          ? `<span class="m-venue"><b>${escapeHTML(stadium.name)}</b><span class="m-city">${escapeHTML(stadium.city)}</span></span>`
          : `<span class="m-venue"></span>`;
        const penaltyHTML = match.penalties
          ? `<span class="m-pen" title="Decidido no prolongamento / penáltis">pen ${escapeHTML(TEAMS[match.penalties].flag)}</span>`
          : "";
        return `<div class="mrow${match.live ? " live" : ""}">
          <span class="m-badge"><span class="m-badge-num">${escapeHTML(match.badgeNum)}</span><span class="m-badge-sep"> | </span><span class="m-badge-phase">${escapeHTML(match.badgePhase)}</span></span>
          <span class="m-home">${match.homeHTML}</span>
          ${matchResultHTML(match)}
          <span class="m-away">${match.awayHTML}${penaltyHTML}</span>
          ${channelChipsHTML(match.channels, "lg")}
          ${venueHTML}
        </div>`;
      })
      .join("");
    html += `<div class="mday">
      <div class="mday-head"><span class="mday-wd">${day.weekday}</span><span class="mday-dt">${escapeHTML(day.date)}</span><span class="mday-count">${day.items.length} ${day.items.length === 1 ? "jogo" : "jogos"}</span></div>
      <div class="mday-rows">${rows}</div>
    </div>`;
  });

  container.innerHTML = html;
}

function renderProgress(context) {
  const progEl = document.getElementById("prog");
  if (!progEl) return;

  let groupPlayed = 0;
  GROUP_LETTERS.forEach((groupLetter) => {
    groupPlayed += context.groupsData[groupLetter].playedResults.length;
  });

  let knockoutPlayed = 0;
  KNOCKOUT_MATCHES.forEach((match) => {
    if (knockoutCache[match.id]?.winner) knockoutPlayed++;
  });

  const totalPlayed = groupPlayed + knockoutPlayed;
  progEl.textContent = `${totalPlayed} / 104 jogos`;
}

let renderBracketWidth = window.innerWidth;
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  if (
    (w >= 1220 && renderBracketWidth < 1220) ||
    (w < 1220 && renderBracketWidth >= 1220)
  ) {
    renderBracketWidth = w;
    renderAll();
  }
});

function renderAll() {
  const openDetails = Array.from(document.querySelectorAll("details.fp")).map(
    (el) => el.open,
  );

  clearKnockoutCache();
  const context = buildTournamentContext();
  KNOCKOUT_MATCHES.forEach((match) => {
    if (!(match.id in knockoutCache))
      knockoutCache[match.id] = computeKnockoutResult(match.id, context);
  });
  renderGroups(context);
  renderThirdPlaceTable(context);
  renderBracket(context);
  renderMatches(context);
  renderProgress(context);

  document.querySelectorAll("details.fp").forEach((el, i) => {
    if (openDetails[i]) el.open = true;
  });
}

/* Re-render but keep focus (and caret) on the input being typed in. */
function rerenderKeepingFocus() {
  const activeElement = document.activeElement;
  const focusKey = activeElement?.dataset ? activeElement.dataset.k : null;
  renderAll();
  if (focusKey) {
    const input = document.querySelector(`[data-k="${focusKey}"]`);
    if (input) {
      input.focus();
      try {
        const length = input.value.length;
        input.setSelectionRange(length, length);
      } catch (_error) {}
    }
  }
}

/* =================== EVENTS =================== */
/* All inputs carry data-k="kind-id-side":
	 gs-A0-0  -> group score, fixture A0, home side
	 fp-MEX-2 -> cards (fair play), team MEX, column 2 (direct reds)
	 ko-89-1  -> knockout score, match 89, away side */
document.addEventListener("input", (event) => {
  const inputKey = event.target.dataset?.k;
  if (!inputKey) return;

  const cleanValue = event.target.value.replace(/[^0-9]/g, "").slice(0, 2);
  if (cleanValue !== event.target.value) event.target.value = cleanValue;

  const [kind, id, side] = inputKey.split("-");
  if (kind === "gs") {
    if (!state.groupScores[id]) state.groupScores[id] = ["", ""];
    state.groupScores[id][+side] = cleanValue;
  } else if (kind === "fp") {
    if (!state.cards[id]) state.cards[id] = ["", "", ""];
    state.cards[id][+side] = cleanValue;
  } else if (kind === "ko") {
    const matchId = +id;
    clearKnockoutCache();
    const context = buildTournamentContext();
    const result = computeKnockoutResult(matchId, context);
    const pairingKey =
      result.home && result.away ? `${result.home}|${result.away}` : null;
    if (!pairingKey) return;

    let entry = state.knockoutGames[matchId];
    if (!entry || entry.key !== pairingKey) {
      entry = state.knockoutGames[matchId] = {
        key: pairingKey,
        homeGoals: "",
        awayGoals: "",
        penaltyWinnerSide: null,
      };
    }
    if (+side === 0) entry.homeGoals = cleanValue;
    else entry.awayGoals = cleanValue;
    if (entry.homeGoals !== entry.awayGoals) entry.penaltyWinnerSide = null;
  }
  saveState();
  rerenderKeepingFocus();
});

/* Penalty-winner buttons (data-pw="matchId-side"); clicking again unsets. */
document.addEventListener("click", (event) => {
  const penaltyKey = event.target.dataset?.pw;
  if (!penaltyKey) return;
  const [matchId, side] = penaltyKey.split("-").map(Number);
  const entry = state.knockoutGames[matchId];
  if (entry) {
    entry.penaltyWinnerSide = entry.penaltyWinnerSide === side ? null : side;
    saveState();
    renderAll();
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("Limpar todos os resultados, cartões e escolhas do quadro?")) {
    state = freshState();
    saveState();
    renderAll();
  }
});

document.getElementById("clearResultsBtn")?.addEventListener("click", () => {
  if (
    confirm(
      "Limpar apenas os resultados (grupo + eliminatórias)? Os cartões de conduta mantêm-se.",
    )
  ) {
    state.groupScores = {};
    state.knockoutGames = {};
    saveState();
    renderAll();
  }
});
document.getElementById("fetchBtn")?.addEventListener("click", fetchAllResults);
document.getElementById("syncBtn")?.addEventListener("click", toggleSync);

/* =================== TABS =================== */
const VIEW_KEY = `${STORAGE_KEY}-view`;
function setView(viewName) {
  const isMatches = viewName === "matches";
  document.getElementById("view-wallchart").hidden = isMatches;
  document.getElementById("view-matches").hidden = !isMatches;
  /* The section nav (Grupos / Melhores 3.ªˢ / Quadro) is sticky and belongs to
     the wallchart tab only; on the matches tab only the tabs stay pinned. */
  const sectionNav = document.getElementById("sectionNav");
  if (sectionNav) sectionNav.hidden = isMatches;
  document.querySelectorAll(".tab").forEach((tab) => {
    const active = tab.dataset.view === viewName;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  });
  try {
    localStorage.setItem(VIEW_KEY, viewName);
  } catch (_error) {}
}
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => setView(tab.dataset.view));
});
(function initView() {
  let viewName = null;
  try {
    viewName = localStorage.getItem(VIEW_KEY);
  } catch (_error) {}
  setView(viewName === "matches" ? "matches" : "wallchart");
})();

/* =================== THEME =================== */
const themeButton = document.getElementById("themeBtn");
function applyTheme(themeName) {
  document.documentElement.setAttribute("data-theme", themeName);
  const isDark = themeName === "dark";
  /* show the icon of the theme you'd switch *to* */
  themeButton.textContent = isDark ? "☀️" : "🌙";
  themeButton.title = isDark
    ? "Mudar para tema claro"
    : "Mudar para tema escuro";
  try {
    localStorage.setItem(`${STORAGE_KEY}-theme`, themeName);
  } catch (_error) {}
}
themeButton.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
  renderAll();
});
(function initTheme() {
  let themeName = null;
  try {
    themeName = localStorage.getItem(`${STORAGE_KEY}-theme`);
  } catch (_error) {}
  if (!themeName) {
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)",
    ).matches;
    themeName = prefersDark ? "dark" : "light";
  }
  applyTheme(themeName);
})();

renderAll();

/* Auto-fetch the latest results on load so the user doesn't have to press
   "Obter resultados" every time. Runs in the background; the button shows its
   own progress/failure state, and the page already rendered any saved data. */
fetchAllResults();
