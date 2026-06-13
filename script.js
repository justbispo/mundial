/* All 48 teams: ISO-style code -> { name, flag, fifaRank }
	 fifaRank = position in the FIFA Men's World Ranking of 11 June 2026,
	 used automatically as the final tie-breaker. */
const TEAMS = {
  MEX: { name: "México", flag: "🇲🇽", fifaRank: 14 },
  KOR: { name: "Coreia do Sul", flag: "🇰🇷", fifaRank: 25 },
  RSA: { name: "África do Sul", flag: "🇿🇦", fifaRank: 60 },
  CZE: { name: "Chéquia", flag: "🇨🇿", fifaRank: 40 },
  CAN: { name: "Canadá", flag: "🇨🇦", fifaRank: 30 },
  SUI: { name: "Suíça", flag: "🇨🇭", fifaRank: 19 },
  QAT: { name: "Catar", flag: "🇶🇦", fifaRank: 56 },
  BIH: { name: "Bósnia e Herzegovina", flag: "🇧🇦", fifaRank: 64 },
  BRA: { name: "Brasil", flag: "🇧🇷", fifaRank: 6 },
  MAR: { name: "Marrocos", flag: "🇲🇦", fifaRank: 7 },
  SCO: { name: "Escócia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", fifaRank: 42 },
  HAI: { name: "Haiti", flag: "🇭🇹", fifaRank: 83 },
  USA: { name: "Estados Unidos", flag: "🇺🇸", fifaRank: 17 },
  PAR: { name: "Paraguai", flag: "🇵🇾", fifaRank: 41 },
  AUS: { name: "Austrália", flag: "🇦🇺", fifaRank: 27 },
  TUR: { name: "Turquia", flag: "🇹🇷", fifaRank: 22 },
  GER: { name: "Alemanha", flag: "🇩🇪", fifaRank: 10 },
  ECU: { name: "Equador", flag: "🇪🇨", fifaRank: 23 },
  CIV: { name: "Costa do Marfim", flag: "🇨🇮", fifaRank: 33 },
  CUW: { name: "Curaçao", flag: "🇨🇼", fifaRank: 82 },
  NED: { name: "Países Baixos", flag: "🇳🇱", fifaRank: 8 },
  JPN: { name: "Japão", flag: "🇯🇵", fifaRank: 18 },
  TUN: { name: "Tunísia", flag: "🇹🇳", fifaRank: 45 },
  SWE: { name: "Suécia", flag: "🇸🇪", fifaRank: 38 },
  BEL: { name: "Bélgica", flag: "🇧🇪", fifaRank: 9 },
  IRN: { name: "Irão", flag: "🇮🇷", fifaRank: 20 },
  EGY: { name: "Egito", flag: "🇪🇬", fifaRank: 29 },
  NZL: { name: "Nova Zelândia", flag: "🇳🇿", fifaRank: 85 },
  ESP: { name: "Espanha", flag: "🇪🇸", fifaRank: 2 },
  URU: { name: "Uruguai", flag: "🇺🇾", fifaRank: 16 },
  KSA: { name: "Arábia Saudita", flag: "🇸🇦", fifaRank: 61 },
  CPV: { name: "Cabo Verde", flag: "🇨🇻", fifaRank: 67 },
  FRA: { name: "França", flag: "🇫🇷", fifaRank: 3 },
  SEN: { name: "Senegal", flag: "🇸🇳", fifaRank: 15 },
  NOR: { name: "Noruega", flag: "🇳🇴", fifaRank: 31 },
  IRQ: { name: "Iraque", flag: "🇮🇶", fifaRank: 57 },
  ARG: { name: "Argentina", flag: "🇦🇷", fifaRank: 1 },
  AUT: { name: "Áustria", flag: "🇦🇹", fifaRank: 24 },
  ALG: { name: "Argélia", flag: "🇩🇿", fifaRank: 28 },
  JOR: { name: "Jordânia", flag: "🇯🇴", fifaRank: 63 },
  POR: { name: "Portugal", flag: "🇵🇹", fifaRank: 5 },
  COL: { name: "Colômbia", flag: "🇨🇴", fifaRank: 13 },
  UZB: { name: "Uzbequistão", flag: "🇺🇿", fifaRank: 50 },
  COD: { name: "RD Congo", flag: "🇨🇩", fifaRank: 46 },
  ENG: { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", fifaRank: 4 },
  CRO: { name: "Croácia", flag: "🇭🇷", fifaRank: 11 },
  GHA: { name: "Gana", flag: "🇬🇭", fifaRank: 73 },
  PAN: { name: "Panamá", flag: "🇵🇦", fifaRank: 34 },
};

const CHANNELS = {
  s1: {
    name: "Sport TV 1",
    abbreviation: "STV1",
    icon: "icons/sporttv1",
    ext: "svg",
  },
  s5: {
    name: "Sport TV 5",
    abbreviation: "STV5",
    icon: "icons/sporttv5",
    ext: "svg",
  },
  s: {
    name: "Sport TV (canal por anunciar)",
    abbreviation: "STV",
    icon: "icons/sporttv",
    ext: "svg",
  },
  lm: {
    name: "LiveModeTV (YouTube)",
    abbreviation: "LM",
    icon: "icons/livemodetv",
    ext: "svg",
  },
  sic: { name: "SIC", abbreviation: "SIC", icon: "icons/sic", ext: "png" },
  rtp: { name: "RTP 1", abbreviation: "RTP1", icon: "icons/rtp1", ext: "svg" },
  tvi: { name: "TVI", abbreviation: "TVI", icon: "icons/tvi", ext: "png" },
};

/* Group-stage fixtures. Times are Portugal Continental (UTC+1). */
const GROUP_LETTERS = "ABCDEFGHIJKL".split("");
const GROUP_FIXTURES = {
  A: [
    {
      home: "MEX",
      away: "RSA",
      date: "11/06",
      time: "20:00",
      channels: ["tvi", "s5", "lm"],
    },
    {
      home: "KOR",
      away: "CZE",
      date: "12/06",
      time: "03:00",
      channels: ["s5"],
    },
    {
      home: "CZE",
      away: "RSA",
      date: "18/06",
      time: "17:00",
      channels: ["s5"],
    },
    {
      home: "MEX",
      away: "KOR",
      date: "19/06",
      time: "02:00",
      channels: ["s5"],
    },
    {
      home: "CZE",
      away: "MEX",
      date: "25/06",
      time: "02:00",
      channels: ["s5"],
    },
    {
      home: "RSA",
      away: "KOR",
      date: "25/06",
      time: "02:00",
      channels: ["s1"],
    },
  ],
  B: [
    {
      home: "CAN",
      away: "BIH",
      date: "12/06",
      time: "20:00",
      channels: ["sic", "s1", "s5", "lm"],
    },
    {
      home: "QAT",
      away: "SUI",
      date: "13/06",
      time: "20:00",
      channels: ["s5"],
    },
    {
      home: "SUI",
      away: "BIH",
      date: "18/06",
      time: "20:00",
      channels: ["rtp", "s1", "s5", "lm"],
    },
    {
      home: "CAN",
      away: "QAT",
      date: "18/06",
      time: "23:00",
      channels: ["s5"],
    },
    {
      home: "SUI",
      away: "CAN",
      date: "24/06",
      time: "20:00",
      channels: ["s5"],
    },
    {
      home: "BIH",
      away: "QAT",
      date: "24/06",
      time: "20:00",
      channels: ["s1"],
    },
  ],
  C: [
    {
      home: "BRA",
      away: "MAR",
      date: "13/06",
      time: "23:00",
      channels: ["s1", "s5", "lm"],
    },
    {
      home: "HAI",
      away: "SCO",
      date: "14/06",
      time: "02:00",
      channels: ["s1"],
    },
    {
      home: "SCO",
      away: "MAR",
      date: "19/06",
      time: "23:00",
      channels: ["s5"],
    },
    {
      home: "BRA",
      away: "HAI",
      date: "20/06",
      time: "01:30",
      channels: ["s1", "s5", "lm"],
    },
    {
      home: "SCO",
      away: "BRA",
      date: "24/06",
      time: "23:00",
      channels: ["s1", "lm"],
    },
    {
      home: "MAR",
      away: "HAI",
      date: "24/06",
      time: "23:00",
      channels: ["s5"],
    },
  ],
  D: [
    {
      home: "USA",
      away: "PAR",
      date: "13/06",
      time: "02:00",
      channels: ["s5"],
    },
    {
      home: "AUS",
      away: "TUR",
      date: "14/06",
      time: "05:00",
      channels: ["s5"],
    },
    {
      home: "USA",
      away: "AUS",
      date: "19/06",
      time: "20:00",
      channels: ["s5"],
    },
    {
      home: "TUR",
      away: "PAR",
      date: "20/06",
      time: "04:00",
      channels: ["s5"],
    },
    {
      home: "TUR",
      away: "USA",
      date: "26/06",
      time: "03:00",
      channels: ["s5"],
    },
    {
      home: "PAR",
      away: "AUS",
      date: "26/06",
      time: "03:00",
      channels: ["s1"],
    },
  ],
  E: [
    {
      home: "GER",
      away: "CUW",
      date: "14/06",
      time: "18:00",
      channels: ["s1", "s5", "lm"],
    },
    {
      home: "CIV",
      away: "ECU",
      date: "15/06",
      time: "00:00",
      channels: ["s5"],
    },
    {
      home: "GER",
      away: "CIV",
      date: "20/06",
      time: "21:00",
      channels: ["tvi", "s1", "s5", "lm"],
    },
    {
      home: "ECU",
      away: "CUW",
      date: "21/06",
      time: "01:00",
      channels: ["s5"],
    },
    {
      home: "CUW",
      away: "CIV",
      date: "25/06",
      time: "21:00",
      channels: ["s1"],
    },
    {
      home: "ECU",
      away: "GER",
      date: "25/06",
      time: "21:00",
      channels: ["sic", "s5", "lm"],
    },
  ],
  F: [
    {
      home: "NED",
      away: "JPN",
      date: "14/06",
      time: "21:00",
      channels: ["s5"],
    },
    {
      home: "SWE",
      away: "TUN",
      date: "15/06",
      time: "03:00",
      channels: ["s5"],
    },
    {
      home: "NED",
      away: "SWE",
      date: "20/06",
      time: "18:00",
      channels: ["s5"],
    },
    {
      home: "TUN",
      away: "JPN",
      date: "21/06",
      time: "05:00",
      channels: ["s5"],
    },
    {
      home: "JPN",
      away: "SWE",
      date: "26/06",
      time: "00:00",
      channels: ["s5"],
    },
    {
      home: "TUN",
      away: "NED",
      date: "26/06",
      time: "00:00",
      channels: ["s1"],
    },
  ],
  G: [
    {
      home: "BEL",
      away: "EGY",
      date: "15/06",
      time: "20:00",
      channels: ["s5"],
    },
    {
      home: "IRN",
      away: "NZL",
      date: "16/06",
      time: "02:00",
      channels: ["s5"],
    },
    {
      home: "BEL",
      away: "IRN",
      date: "21/06",
      time: "20:00",
      channels: ["s5"],
    },
    {
      home: "NZL",
      away: "EGY",
      date: "22/06",
      time: "02:00",
      channels: ["s5"],
    },
    {
      home: "EGY",
      away: "IRN",
      date: "27/06",
      time: "04:00",
      channels: ["s1"],
    },
    {
      home: "NZL",
      away: "BEL",
      date: "27/06",
      time: "04:00",
      channels: ["s5"],
    },
  ],
  H: [
    {
      home: "ESP",
      away: "CPV",
      date: "15/06",
      time: "17:00",
      channels: ["s5", "lm"],
    },
    {
      home: "KSA",
      away: "URU",
      date: "15/06",
      time: "23:00",
      channels: ["s5"],
    },
    {
      home: "ESP",
      away: "KSA",
      date: "21/06",
      time: "17:00",
      channels: ["s1", "s5", "lm"],
    },
    {
      home: "URU",
      away: "CPV",
      date: "21/06",
      time: "23:00",
      channels: ["s5"],
    },
    {
      home: "CPV",
      away: "KSA",
      date: "27/06",
      time: "01:00",
      channels: ["s1"],
    },
    {
      home: "URU",
      away: "ESP",
      date: "27/06",
      time: "01:00",
      channels: ["s5"],
    },
  ],
  I: [
    {
      home: "FRA",
      away: "SEN",
      date: "16/06",
      time: "20:00",
      channels: ["rtp", "s1", "s5", "lm"],
    },
    {
      home: "IRQ",
      away: "NOR",
      date: "16/06",
      time: "23:00",
      channels: ["s5"],
    },
    {
      home: "FRA",
      away: "IRQ",
      date: "22/06",
      time: "22:00",
      channels: ["s5"],
    },
    {
      home: "NOR",
      away: "SEN",
      date: "23/06",
      time: "01:00",
      channels: ["s5"],
    },
    {
      home: "NOR",
      away: "FRA",
      date: "26/06",
      time: "20:00",
      channels: ["tvi", "s5", "lm"],
    },
    {
      home: "SEN",
      away: "IRQ",
      date: "26/06",
      time: "20:00",
      channels: ["s1"],
    },
  ],
  J: [
    {
      home: "ARG",
      away: "ALG",
      date: "17/06",
      time: "02:00",
      channels: ["s5"],
    },
    {
      home: "AUT",
      away: "JOR",
      date: "17/06",
      time: "05:00",
      channels: ["s5"],
    },
    {
      home: "ARG",
      away: "AUT",
      date: "22/06",
      time: "18:00",
      channels: ["s1", "s5", "lm"],
    },
    {
      home: "JOR",
      away: "ALG",
      date: "23/06",
      time: "04:00",
      channels: ["s5"],
    },
    {
      home: "ALG",
      away: "AUT",
      date: "28/06",
      time: "03:00",
      channels: ["s1"],
    },
    {
      home: "JOR",
      away: "ARG",
      date: "28/06",
      time: "03:00",
      channels: ["s5"],
    },
  ],
  K: [
    {
      home: "POR",
      away: "COD",
      date: "17/06",
      time: "18:00",
      channels: ["sic", "s1", "s5", "lm"],
    },
    {
      home: "UZB",
      away: "COL",
      date: "18/06",
      time: "03:00",
      channels: ["s5"],
    },
    {
      home: "POR",
      away: "UZB",
      date: "23/06",
      time: "18:00",
      channels: ["tvi", "s1", "s5", "lm"],
    },
    {
      home: "COL",
      away: "COD",
      date: "24/06",
      time: "03:00",
      channels: ["s5"],
    },
    {
      home: "COL",
      away: "POR",
      date: "28/06",
      time: "00:30",
      channels: ["rtp", "s5", "lm"],
    },
    {
      home: "COD",
      away: "UZB",
      date: "28/06",
      time: "00:30",
      channels: ["s1"],
    },
  ],
  L: [
    {
      home: "ENG",
      away: "CRO",
      date: "17/06",
      time: "21:00",
      channels: ["s5"],
    },
    {
      home: "GHA",
      away: "PAN",
      date: "18/06",
      time: "00:00",
      channels: ["s5"],
    },
    {
      home: "ENG",
      away: "GHA",
      date: "23/06",
      time: "21:00",
      channels: ["s5"],
    },
    {
      home: "PAN",
      away: "CRO",
      date: "24/06",
      time: "00:00",
      channels: ["s5"],
    },
    {
      home: "PAN",
      away: "ENG",
      date: "27/06",
      time: "22:00",
      channels: ["s5"],
    },
    {
      home: "CRO",
      away: "GHA",
      date: "27/06",
      time: "22:00",
      channels: ["s1"],
    },
  ],
};

/* FIFA Annex C: all 495 combinations of the 8 groups that supply the
	 qualified third-placed teams. Key = those 8 group letters, sorted.
	 Value = which group's third goes to each slot, in the order
	 [Match 79, 85, 81, 74, 82, 77, 87, 80] (i.e. vs winners of A,B,D,E,G,I,K,L). */
const THIRD_PLACE_MATCH_ORDER = [79, 85, 81, 74, 82, 77, 87, 80];
const THIRD_PLACE_BRACKET_MAP = {
  EFGHIJKL: "EJIFHGLK",
  DFGHIJKL: "HGIDJFLK",
  DEGHIJKL: "EJIDHGLK",
  DEFHIJKL: "EJIDHFLK",
  DEFGIJKL: "EGIDJFLK",
  DEFGHJKL: "EGJDHFLK",
  DEFGHIKL: "EGIDHFLK",
  DEFGHIJL: "EGJDHFLI",
  DEFGHIJK: "EGJDHFIK",
  CFGHIJKL: "HGICJFLK",
  CEGHIJKL: "EJICHGLK",
  CEFHIJKL: "EJICHFLK",
  CEFGIJKL: "EGICJFLK",
  CEFGHJKL: "EGJCHFLK",
  CEFGHIKL: "EGICHFLK",
  CEFGHIJL: "EGJCHFLI",
  CEFGHIJK: "EGJCHFIK",
  CDGHIJKL: "HGICJDLK",
  CDFHIJKL: "CJIDHFLK",
  CDFGIJKL: "CGIDJFLK",
  CDFGHJKL: "CGJDHFLK",
  CDFGHIKL: "CGIDHFLK",
  CDFGHIJL: "CGJDHFLI",
  CDFGHIJK: "CGJDHFIK",
  CDEHIJKL: "EJICHDLK",
  CDEGIJKL: "EGICJDLK",
  CDEGHJKL: "EGJCHDLK",
  CDEGHIKL: "EGICHDLK",
  CDEGHIJL: "EGJCHDLI",
  CDEGHIJK: "EGJCHDIK",
  CDEFIJKL: "CJEDIFLK",
  CDEFHJKL: "CJEDHFLK",
  CDEFHIKL: "CEIDHFLK",
  CDEFHIJL: "CJEDHFLI",
  CDEFHIJK: "CJEDHFIK",
  CDEFGJKL: "CGEDJFLK",
  CDEFGIKL: "CGEDIFLK",
  CDEFGIJL: "CGEDJFLI",
  CDEFGIJK: "CGEDJFIK",
  CDEFGHKL: "CGEDHFLK",
  CDEFGHJL: "CGJDHFLE",
  CDEFGHJK: "CGJDHFEK",
  CDEFGHIL: "CGEDHFLI",
  CDEFGHIK: "CGEDHFIK",
  CDEFGHIJ: "CGJDHFEI",
  BFGHIJKL: "HJBFIGLK",
  BEGHIJKL: "EJIBHGLK",
  BEFHIJKL: "EJBFIHLK",
  BEFGIJKL: "EJBFIGLK",
  BEFGHJKL: "EJBFHGLK",
  BEFGHIKL: "EGBFIHLK",
  BEFGHIJL: "EJBFHGLI",
  BEFGHIJK: "EJBFHGIK",
  BDGHIJKL: "HJBDIGLK",
  BDFHIJKL: "HJBDIFLK",
  BDFGIJKL: "IGBDJFLK",
  BDFGHJKL: "HGBDJFLK",
  BDFGHIKL: "HGBDIFLK",
  BDFGHIJL: "HGBDJFLI",
  BDFGHIJK: "HGBDJFIK",
  BDEHIJKL: "EJBDIHLK",
  BDEGIJKL: "EJBDIGLK",
  BDEGHJKL: "EJBDHGLK",
  BDEGHIKL: "EGBDIHLK",
  BDEGHIJL: "EJBDHGLI",
  BDEGHIJK: "EJBDHGIK",
  BDEFIJKL: "EJBDIFLK",
  BDEFHJKL: "EJBDHFLK",
  BDEFHIKL: "EIBDHFLK",
  BDEFHIJL: "EJBDHFLI",
  BDEFHIJK: "EJBDHFIK",
  BDEFGJKL: "EGBDJFLK",
  BDEFGIKL: "EGBDIFLK",
  BDEFGIJL: "EGBDJFLI",
  BDEFGIJK: "EGBDJFIK",
  BDEFGHKL: "EGBDHFLK",
  BDEFGHJL: "HGBDJFLE",
  BDEFGHJK: "HGBDJFEK",
  BDEFGHIL: "EGBDHFLI",
  BDEFGHIK: "EGBDHFIK",
  BDEFGHIJ: "HGBDJFEI",
  BCGHIJKL: "HJBCIGLK",
  BCFHIJKL: "HJBCIFLK",
  BCFGIJKL: "IGBCJFLK",
  BCFGHJKL: "HGBCJFLK",
  BCFGHIKL: "HGBCIFLK",
  BCFGHIJL: "HGBCJFLI",
  BCFGHIJK: "HGBCJFIK",
  BCEHIJKL: "EJBCIHLK",
  BCEGIJKL: "EJBCIGLK",
  BCEGHJKL: "EJBCHGLK",
  BCEGHIKL: "EGBCIHLK",
  BCEGHIJL: "EJBCHGLI",
  BCEGHIJK: "EJBCHGIK",
  BCEFIJKL: "EJBCIFLK",
  BCEFHJKL: "EJBCHFLK",
  BCEFHIKL: "EIBCHFLK",
  BCEFHIJL: "EJBCHFLI",
  BCEFHIJK: "EJBCHFIK",
  BCEFGJKL: "EGBCJFLK",
  BCEFGIKL: "EGBCIFLK",
  BCEFGIJL: "EGBCJFLI",
  BCEFGIJK: "EGBCJFIK",
  BCEFGHKL: "EGBCHFLK",
  BCEFGHJL: "HGBCJFLE",
  BCEFGHJK: "HGBCJFEK",
  BCEFGHIL: "EGBCHFLI",
  BCEFGHIK: "EGBCHFIK",
  BCEFGHIJ: "HGBCJFEI",
  BCDHIJKL: "HJBCIDLK",
  BCDGIJKL: "IGBCJDLK",
  BCDGHJKL: "HGBCJDLK",
  BCDGHIKL: "HGBCIDLK",
  BCDGHIJL: "HGBCJDLI",
  BCDGHIJK: "HGBCJDIK",
  BCDFIJKL: "CJBDIFLK",
  BCDFHJKL: "CJBDHFLK",
  BCDFHIKL: "CIBDHFLK",
  BCDFHIJL: "CJBDHFLI",
  BCDFHIJK: "CJBDHFIK",
  BCDFGJKL: "CGBDJFLK",
  BCDFGIKL: "CGBDIFLK",
  BCDFGIJL: "CGBDJFLI",
  BCDFGIJK: "CGBDJFIK",
  BCDFGHKL: "CGBDHFLK",
  BCDFGHJL: "CGBDHFLJ",
  BCDFGHJK: "HGBCJFDK",
  BCDFGHIL: "CGBDHFLI",
  BCDFGHIK: "CGBDHFIK",
  BCDFGHIJ: "HGBCJFDI",
  BCDEIJKL: "EJBCIDLK",
  BCDEHJKL: "EJBCHDLK",
  BCDEHIKL: "EIBCHDLK",
  BCDEHIJL: "EJBCHDLI",
  BCDEHIJK: "EJBCHDIK",
  BCDEGJKL: "EGBCJDLK",
  BCDEGIKL: "EGBCIDLK",
  BCDEGIJL: "EGBCJDLI",
  BCDEGIJK: "EGBCJDIK",
  BCDEGHKL: "EGBCHDLK",
  BCDEGHJL: "HGBCJDLE",
  BCDEGHJK: "HGBCJDEK",
  BCDEGHIL: "EGBCHDLI",
  BCDEGHIK: "EGBCHDIK",
  BCDEGHIJ: "HGBCJDEI",
  BCDEFJKL: "CJBDEFLK",
  BCDEFIKL: "CEBDIFLK",
  BCDEFIJL: "CJBDEFLI",
  BCDEFIJK: "CJBDEFIK",
  BCDEFHKL: "CEBDHFLK",
  BCDEFHJL: "CJBDHFLE",
  BCDEFHJK: "CJBDHFEK",
  BCDEFHIL: "CEBDHFLI",
  BCDEFHIK: "CEBDHFIK",
  BCDEFHIJ: "CJBDHFEI",
  BCDEFGKL: "CGBDEFLK",
  BCDEFGJL: "CGBDJFLE",
  BCDEFGJK: "CGBDJFEK",
  BCDEFGIL: "CGBDEFLI",
  BCDEFGIK: "CGBDEFIK",
  BCDEFGIJ: "CGBDJFEI",
  BCDEFGHL: "CGBDHFLE",
  BCDEFGHK: "CGBDHFEK",
  BCDEFGHJ: "HGBCJFDE",
  BCDEFGHI: "CGBDHFEI",
  AFGHIJKL: "HJIFAGLK",
  AEGHIJKL: "EJIAHGLK",
  AEFHIJKL: "EJIFAHLK",
  AEFGIJKL: "EJIFAGLK",
  AEFGHJKL: "EGJFAHLK",
  AEFGHIKL: "EGIFAHLK",
  AEFGHIJL: "EGJFAHLI",
  AEFGHIJK: "EGJFAHIK",
  ADGHIJKL: "HJIDAGLK",
  ADFHIJKL: "HJIDAFLK",
  ADFGIJKL: "IGJDAFLK",
  ADFGHJKL: "HGJDAFLK",
  ADFGHIKL: "HGIDAFLK",
  ADFGHIJL: "HGJDAFLI",
  ADFGHIJK: "HGJDAFIK",
  ADEHIJKL: "EJIDAHLK",
  ADEGIJKL: "EJIDAGLK",
  ADEGHJKL: "EGJDAHLK",
  ADEGHIKL: "EGIDAHLK",
  ADEGHIJL: "EGJDAHLI",
  ADEGHIJK: "EGJDAHIK",
  ADEFIJKL: "EJIDAFLK",
  ADEFHJKL: "HJEDAFLK",
  ADEFHIKL: "HEIDAFLK",
  ADEFHIJL: "HJEDAFLI",
  ADEFHIJK: "HJEDAFIK",
  ADEFGJKL: "EGJDAFLK",
  ADEFGIKL: "EGIDAFLK",
  ADEFGIJL: "EGJDAFLI",
  ADEFGIJK: "EGJDAFIK",
  ADEFGHKL: "HGEDAFLK",
  ADEFGHJL: "HGJDAFLE",
  ADEFGHJK: "HGJDAFEK",
  ADEFGHIL: "HGEDAFLI",
  ADEFGHIK: "HGEDAFIK",
  ADEFGHIJ: "HGJDAFEI",
  ACGHIJKL: "HJICAGLK",
  ACFHIJKL: "HJICAFLK",
  ACFGIJKL: "IGJCAFLK",
  ACFGHJKL: "HGJCAFLK",
  ACFGHIKL: "HGICAFLK",
  ACFGHIJL: "HGJCAFLI",
  ACFGHIJK: "HGJCAFIK",
  ACEHIJKL: "EJICAHLK",
  ACEGIJKL: "EJICAGLK",
  ACEGHJKL: "EGJCAHLK",
  ACEGHIKL: "EGICAHLK",
  ACEGHIJL: "EGJCAHLI",
  ACEGHIJK: "EGJCAHIK",
  ACEFIJKL: "EJICAFLK",
  ACEFHJKL: "HJECAFLK",
  ACEFHIKL: "HEICAFLK",
  ACEFHIJL: "HJECAFLI",
  ACEFHIJK: "HJECAFIK",
  ACEFGJKL: "EGJCAFLK",
  ACEFGIKL: "EGICAFLK",
  ACEFGIJL: "EGJCAFLI",
  ACEFGIJK: "EGJCAFIK",
  ACEFGHKL: "HGECAFLK",
  ACEFGHJL: "HGJCAFLE",
  ACEFGHJK: "HGJCAFEK",
  ACEFGHIL: "HGECAFLI",
  ACEFGHIK: "HGECAFIK",
  ACEFGHIJ: "HGJCAFEI",
  ACDHIJKL: "HJICADLK",
  ACDGIJKL: "IGJCADLK",
  ACDGHJKL: "HGJCADLK",
  ACDGHIKL: "HGICADLK",
  ACDGHIJL: "HGJCADLI",
  ACDGHIJK: "HGJCADIK",
  ACDFIJKL: "CJIDAFLK",
  ACDFHJKL: "HJFCADLK",
  ACDFHIKL: "HFICADLK",
  ACDFHIJL: "HJFCADLI",
  ACDFHIJK: "HJFCADIK",
  ACDFGJKL: "CGJDAFLK",
  ACDFGIKL: "CGIDAFLK",
  ACDFGIJL: "CGJDAFLI",
  ACDFGIJK: "CGJDAFIK",
  ACDFGHKL: "HGFCADLK",
  ACDFGHJL: "CGJDAFLH",
  ACDFGHJK: "HGJCAFDK",
  ACDFGHIL: "HGFCADLI",
  ACDFGHIK: "HGFCADIK",
  ACDFGHIJ: "HGJCAFDI",
  ACDEIJKL: "EJICADLK",
  ACDEHJKL: "HJECADLK",
  ACDEHIKL: "HEICADLK",
  ACDEHIJL: "HJECADLI",
  ACDEHIJK: "HJECADIK",
  ACDEGJKL: "EGJCADLK",
  ACDEGIKL: "EGICADLK",
  ACDEGIJL: "EGJCADLI",
  ACDEGIJK: "EGJCADIK",
  ACDEGHKL: "HGECADLK",
  ACDEGHJL: "HGJCADLE",
  ACDEGHJK: "HGJCADEK",
  ACDEGHIL: "HGECADLI",
  ACDEGHIK: "HGECADIK",
  ACDEGHIJ: "HGJCADEI",
  ACDEFJKL: "CJEDAFLK",
  ACDEFIKL: "CEIDAFLK",
  ACDEFIJL: "CJEDAFLI",
  ACDEFIJK: "CJEDAFIK",
  ACDEFHKL: "HEFCADLK",
  ACDEFHJL: "HJFCADLE",
  ACDEFHJK: "HJECAFDK",
  ACDEFHIL: "HEFCADLI",
  ACDEFHIK: "HEFCADIK",
  ACDEFHIJ: "HJECAFDI",
  ACDEFGKL: "CGEDAFLK",
  ACDEFGJL: "CGJDAFLE",
  ACDEFGJK: "CGJDAFEK",
  ACDEFGIL: "CGEDAFLI",
  ACDEFGIK: "CGEDAFIK",
  ACDEFGIJ: "CGJDAFEI",
  ACDEFGHL: "HGFCADLE",
  ACDEFGHK: "HGECAFDK",
  ACDEFGHJ: "HGJCAFDE",
  ACDEFGHI: "HGECAFDI",
  ABGHIJKL: "HJBAIGLK",
  ABFHIJKL: "HJBAIFLK",
  ABFGIJKL: "IJBFAGLK",
  ABFGHJKL: "HJBFAGLK",
  ABFGHIKL: "HGBAIFLK",
  ABFGHIJL: "HJBFAGLI",
  ABFGHIJK: "HJBFAGIK",
  ABEHIJKL: "EJBAIHLK",
  ABEGIJKL: "EJBAIGLK",
  ABEGHJKL: "EJBAHGLK",
  ABEGHIKL: "EGBAIHLK",
  ABEGHIJL: "EJBAHGLI",
  ABEGHIJK: "EJBAHGIK",
  ABEFIJKL: "EJBAIFLK",
  ABEFHJKL: "EJBFAHLK",
  ABEFHIKL: "EIBFAHLK",
  ABEFHIJL: "EJBFAHLI",
  ABEFHIJK: "EJBFAHIK",
  ABEFGJKL: "EJBFAGLK",
  ABEFGIKL: "EGBAIFLK",
  ABEFGIJL: "EJBFAGLI",
  ABEFGIJK: "EJBFAGIK",
  ABEFGHKL: "EGBFAHLK",
  ABEFGHJL: "HJBFAGLE",
  ABEFGHJK: "HJBFAGEK",
  ABEFGHIL: "EGBFAHLI",
  ABEFGHIK: "EGBFAHIK",
  ABEFGHIJ: "HJBFAGEI",
  ABDHIJKL: "IJBDAHLK",
  ABDGIJKL: "IJBDAGLK",
  ABDGHJKL: "HJBDAGLK",
  ABDGHIKL: "IGBDAHLK",
  ABDGHIJL: "HJBDAGLI",
  ABDGHIJK: "HJBDAGIK",
  ABDFIJKL: "IJBDAFLK",
  ABDFHJKL: "HJBDAFLK",
  ABDFHIKL: "HIBDAFLK",
  ABDFHIJL: "HJBDAFLI",
  ABDFHIJK: "HJBDAFIK",
  ABDFGJKL: "FJBDAGLK",
  ABDFGIKL: "IGBDAFLK",
  ABDFGIJL: "FJBDAGLI",
  ABDFGIJK: "FJBDAGIK",
  ABDFGHKL: "HGBDAFLK",
  ABDFGHJL: "HGBDAFLJ",
  ABDFGHJK: "HGBDAFJK",
  ABDFGHIL: "HGBDAFLI",
  ABDFGHIK: "HGBDAFIK",
  ABDFGHIJ: "HGBDAFIJ",
  ABDEIJKL: "EJBAIDLK",
  ABDEHJKL: "EJBDAHLK",
  ABDEHIKL: "EIBDAHLK",
  ABDEHIJL: "EJBDAHLI",
  ABDEHIJK: "EJBDAHIK",
  ABDEGJKL: "EJBDAGLK",
  ABDEGIKL: "EGBAIDLK",
  ABDEGIJL: "EJBDAGLI",
  ABDEGIJK: "EJBDAGIK",
  ABDEGHKL: "EGBDAHLK",
  ABDEGHJL: "HJBDAGLE",
  ABDEGHJK: "HJBDAGEK",
  ABDEGHIL: "EGBDAHLI",
  ABDEGHIK: "EGBDAHIK",
  ABDEGHIJ: "HJBDAGEI",
  ABDEFJKL: "EJBDAFLK",
  ABDEFIKL: "EIBDAFLK",
  ABDEFIJL: "EJBDAFLI",
  ABDEFIJK: "EJBDAFIK",
  ABDEFHKL: "HEBDAFLK",
  ABDEFHJL: "HJBDAFLE",
  ABDEFHJK: "HJBDAFEK",
  ABDEFHIL: "HEBDAFLI",
  ABDEFHIK: "HEBDAFIK",
  ABDEFHIJ: "HJBDAFEI",
  ABDEFGKL: "EGBDAFLK",
  ABDEFGJL: "EGBDAFLJ",
  ABDEFGJK: "EGBDAFJK",
  ABDEFGIL: "EGBDAFLI",
  ABDEFGIK: "EGBDAFIK",
  ABDEFGIJ: "EGBDAFIJ",
  ABDEFGHL: "HGBDAFLE",
  ABDEFGHK: "HGBDAFEK",
  ABDEFGHJ: "HGBDAFEJ",
  ABDEFGHI: "HGBDAFEI",
  ABCHIJKL: "IJBCAHLK",
  ABCGIJKL: "IJBCAGLK",
  ABCGHJKL: "HJBCAGLK",
  ABCGHIKL: "IGBCAHLK",
  ABCGHIJL: "HJBCAGLI",
  ABCGHIJK: "HJBCAGIK",
  ABCFIJKL: "IJBCAFLK",
  ABCFHJKL: "HJBCAFLK",
  ABCFHIKL: "HIBCAFLK",
  ABCFHIJL: "HJBCAFLI",
  ABCFHIJK: "HJBCAFIK",
  ABCFGJKL: "CJBFAGLK",
  ABCFGIKL: "IGBCAFLK",
  ABCFGIJL: "CJBFAGLI",
  ABCFGIJK: "CJBFAGIK",
  ABCFGHKL: "HGBCAFLK",
  ABCFGHJL: "HGBCAFLJ",
  ABCFGHJK: "HGBCAFJK",
  ABCFGHIL: "HGBCAFLI",
  ABCFGHIK: "HGBCAFIK",
  ABCFGHIJ: "HGBCAFIJ",
  ABCEIJKL: "EJBAICLK",
  ABCEHJKL: "EJBCAHLK",
  ABCEHIKL: "EIBCAHLK",
  ABCEHIJL: "EJBCAHLI",
  ABCEHIJK: "EJBCAHIK",
  ABCEGJKL: "EJBCAGLK",
  ABCEGIKL: "EGBAICLK",
  ABCEGIJL: "EJBCAGLI",
  ABCEGIJK: "EJBCAGIK",
  ABCEGHKL: "EGBCAHLK",
  ABCEGHJL: "HJBCAGLE",
  ABCEGHJK: "HJBCAGEK",
  ABCEGHIL: "EGBCAHLI",
  ABCEGHIK: "EGBCAHIK",
  ABCEGHIJ: "HJBCAGEI",
  ABCEFJKL: "EJBCAFLK",
  ABCEFIKL: "EIBCAFLK",
  ABCEFIJL: "EJBCAFLI",
  ABCEFIJK: "EJBCAFIK",
  ABCEFHKL: "HEBCAFLK",
  ABCEFHJL: "HJBCAFLE",
  ABCEFHJK: "HJBCAFEK",
  ABCEFHIL: "HEBCAFLI",
  ABCEFHIK: "HEBCAFIK",
  ABCEFHIJ: "HJBCAFEI",
  ABCEFGKL: "EGBCAFLK",
  ABCEFGJL: "EGBCAFLJ",
  ABCEFGJK: "EGBCAFJK",
  ABCEFGIL: "EGBCAFLI",
  ABCEFGIK: "EGBCAFIK",
  ABCEFGIJ: "EGBCAFIJ",
  ABCEFGHL: "HGBCAFLE",
  ABCEFGHK: "HGBCAFEK",
  ABCEFGHJ: "HGBCAFEJ",
  ABCEFGHI: "HGBCAFEI",
  ABCDIJKL: "IJBCADLK",
  ABCDHJKL: "HJBCADLK",
  ABCDHIKL: "HIBCADLK",
  ABCDHIJL: "HJBCADLI",
  ABCDHIJK: "HJBCADIK",
  ABCDGJKL: "CJBDAGLK",
  ABCDGIKL: "IGBCADLK",
  ABCDGIJL: "CJBDAGLI",
  ABCDGIJK: "CJBDAGIK",
  ABCDGHKL: "HGBCADLK",
  ABCDGHJL: "HGBCADLJ",
  ABCDGHJK: "HGBCADJK",
  ABCDGHIL: "HGBCADLI",
  ABCDGHIK: "HGBCADIK",
  ABCDGHIJ: "HGBCADIJ",
  ABCDFJKL: "CJBDAFLK",
  ABCDFIKL: "CIBDAFLK",
  ABCDFIJL: "CJBDAFLI",
  ABCDFIJK: "CJBDAFIK",
  ABCDFHKL: "HFBCADLK",
  ABCDFHJL: "CJBDAFLH",
  ABCDFHJK: "HJBCAFDK",
  ABCDFHIL: "HFBCADLI",
  ABCDFHIK: "HFBCADIK",
  ABCDFHIJ: "HJBCAFDI",
  ABCDFGKL: "CGBDAFLK",
  ABCDFGJL: "CGBDAFLJ",
  ABCDFGJK: "CGBDAFJK",
  ABCDFGIL: "CGBDAFLI",
  ABCDFGIK: "CGBDAFIK",
  ABCDFGIJ: "CGBDAFIJ",
  ABCDFGHL: "CGBDAFLH",
  ABCDFGHK: "HGBCAFDK",
  ABCDFGHJ: "HGBCAFDJ",
  ABCDFGHI: "HGBCAFDI",
  ABCDEJKL: "EJBCADLK",
  ABCDEIKL: "EIBCADLK",
  ABCDEIJL: "EJBCADLI",
  ABCDEIJK: "EJBCADIK",
  ABCDEHKL: "HEBCADLK",
  ABCDEHJL: "HJBCADLE",
  ABCDEHJK: "HJBCADEK",
  ABCDEHIL: "HEBCADLI",
  ABCDEHIK: "HEBCADIK",
  ABCDEHIJ: "HJBCADEI",
  ABCDEGKL: "EGBCADLK",
  ABCDEGJL: "EGBCADLJ",
  ABCDEGJK: "EGBCADJK",
  ABCDEGIL: "EGBCADLI",
  ABCDEGIK: "EGBCADIK",
  ABCDEGIJ: "EGBCADIJ",
  ABCDEGHL: "HGBCADLE",
  ABCDEGHK: "HGBCADEK",
  ABCDEGHJ: "HGBCADEJ",
  ABCDEGHI: "HGBCADEI",
  ABCDEFKL: "CEBDAFLK",
  ABCDEFJL: "CJBDAFLE",
  ABCDEFJK: "CJBDAFEK",
  ABCDEFIL: "CEBDAFLI",
  ABCDEFIK: "CEBDAFIK",
  ABCDEFIJ: "CJBDAFEI",
  ABCDEFHL: "HFBCADLE",
  ABCDEFHK: "HEBCAFDK",
  ABCDEFHJ: "HJBCAFDE",
  ABCDEFHI: "HEBCAFDI",
  ABCDEFGL: "CGBDAFLE",
  ABCDEFGK: "CGBDAFEK",
  ABCDEFGJ: "CGBDAFEJ",
  ABCDEFGI: "CGBDAFEI",
  ABCDEFGH: "HGBCAFDE",
};

/* Knockout matches. Slot tokens:
	 "1A"/"2A" = winner / runner-up of group A
	 "T79"     = best third-placed team allocated to match 79 (per Annex C)
	 "W73"/"L101" = winner / loser of an earlier match
	 "when" = date · Portugal time (UTC+1) · venue. */
const KNOCKOUT_MATCHES = [
  {
    id: 73,
    slots: ["2A", "2B"],
    when: "28/06 · 20:00 · Los Angeles",
    channels: ["s"],
  },
  {
    id: 74,
    slots: ["1E", "T74"],
    when: "29/06 · 21:30 · Boston",
    thirdFromGroups: "A/B/C/D/F",
    channels: ["s"],
  },
  {
    id: 75,
    slots: ["1F", "2C"],
    when: "30/06 · 02:00 · Monterrei",
    channels: ["s"],
  },
  {
    id: 76,
    slots: ["1C", "2F"],
    when: "29/06 · 18:00 · Houston",
    channels: ["s"],
  },
  {
    id: 77,
    slots: ["1I", "T77"],
    when: "30/06 · 22:00 · Nova Iorque/NJ",
    thirdFromGroups: "C/D/F/G/H",
    channels: ["s"],
  },
  {
    id: 78,
    slots: ["2E", "2I"],
    when: "30/06 · 18:00 · Dallas",
    channels: ["s"],
  },
  {
    id: 79,
    slots: ["1A", "T79"],
    when: "01/07 · 02:00 · Cidade do México",
    thirdFromGroups: "C/E/F/H/I",
    channels: ["s"],
  },
  {
    id: 80,
    slots: ["1L", "T80"],
    when: "01/07 · 17:00 · Atlanta",
    thirdFromGroups: "E/H/I/J/K",
    channels: ["s"],
  },
  {
    id: 81,
    slots: ["1D", "T81"],
    when: "02/07 · 01:00 · Baía de SF",
    thirdFromGroups: "B/E/F/I/J",
    channels: ["s"],
  },
  {
    id: 82,
    slots: ["1G", "T82"],
    when: "01/07 · 21:00 · Seattle",
    thirdFromGroups: "A/E/H/I/J",
    channels: ["s"],
  },
  {
    id: 83,
    slots: ["2K", "2L"],
    when: "03/07 · 00:00 · Toronto",
    channels: ["s"],
  },
  {
    id: 84,
    slots: ["1H", "2J"],
    when: "02/07 · 20:00 · Los Angeles",
    channels: ["s"],
  },
  {
    id: 85,
    slots: ["1B", "T85"],
    when: "03/07 · 04:00 · Vancouver",
    thirdFromGroups: "E/F/G/I/J",
    channels: ["s"],
  },
  {
    id: 86,
    slots: ["1J", "2H"],
    when: "03/07 · 23:00 · Miami",
    channels: ["s"],
  },
  {
    id: 87,
    slots: ["1K", "T87"],
    when: "04/07 · 02:30 · Kansas City",
    thirdFromGroups: "D/E/I/J/L",
    channels: ["s"],
  },
  {
    id: 88,
    slots: ["2D", "2G"],
    when: "03/07 · 19:00 · Dallas",
    channels: ["s"],
  },
  {
    id: 89,
    slots: ["W74", "W77"],
    when: "04/07 · 22:00 · Filadélfia",
    channels: ["s"],
  },
  {
    id: 90,
    slots: ["W73", "W75"],
    when: "04/07 · 18:00 · Houston",
    channels: ["s"],
  },
  {
    id: 91,
    slots: ["W76", "W78"],
    when: "05/07 · 21:00 · Nova Iorque/NJ",
    channels: ["s"],
  },
  {
    id: 92,
    slots: ["W79", "W80"],
    when: "06/07 · 01:00 · Cidade do México",
    channels: ["s"],
  },
  {
    id: 93,
    slots: ["W83", "W84"],
    when: "06/07 · 20:00 · Dallas",
    channels: ["s"],
  },
  {
    id: 94,
    slots: ["W81", "W82"],
    when: "07/07 · 01:00 · Seattle",
    channels: ["s"],
  },
  {
    id: 95,
    slots: ["W86", "W88"],
    when: "07/07 · 17:00 · Atlanta",
    channels: ["s"],
  },
  {
    id: 96,
    slots: ["W85", "W87"],
    when: "07/07 · 21:00 · Vancouver",
    channels: ["s"],
  },
  {
    id: 97,
    slots: ["W89", "W90"],
    when: "09/07 · 21:00 · Boston",
    channels: ["s"],
  },
  {
    id: 98,
    slots: ["W93", "W94"],
    when: "10/07 · 20:00 · Los Angeles",
    channels: ["s"],
  },
  {
    id: 99,
    slots: ["W91", "W92"],
    when: "11/07 · 22:00 · Miami",
    channels: ["s"],
  },
  {
    id: 100,
    slots: ["W95", "W96"],
    when: "12/07 · 02:00 · Kansas City",
    channels: ["s"],
  },
  {
    id: 101,
    slots: ["W97", "W98"],
    when: "14/07 · 20:00 · Dallas",
    channels: ["s"],
  },
  {
    id: 102,
    slots: ["W99", "W100"],
    when: "15/07 · 20:00 · Atlanta",
    channels: ["s"],
  },
  {
    id: 103,
    slots: ["L101", "L102"],
    when: "18/07 · 22:00 · Miami",
    channels: ["s"],
  },
  {
    id: 104,
    slots: ["W101", "W102"],
    when: "19/07 · 20:00 · Nova Iorque/NJ",
    channels: ["rtp", "s", "lm"],
  },
];
const KNOCKOUT_BY_ID = {};
KNOCKOUT_MATCHES.forEach((match) => {
  KNOCKOUT_BY_ID[match.id] = match;
});

/* Visual layout of the bracket grid: which matches go in each column,
	 and how many grid rows each match box spans. */
const BRACKET_COLUMNS = [
  {
    column: 1,
    rowSpan: 1,
    matchIds: [74, 77, 73, 75, 83, 84, 81, 82, 76, 78, 79, 80, 86, 88, 85, 87],
  }, // round of 32
  { column: 2, rowSpan: 2, matchIds: [89, 90, 93, 94, 91, 92, 95, 96] }, // round of 16
  { column: 3, rowSpan: 4, matchIds: [97, 98, 99, 100] }, // quarter-finals
  { column: 4, rowSpan: 8, matchIds: [101, 102] }, // semi-finals
];
const FINAL_MATCH_ID = 104,
  THIRD_PLACE_MATCH_ID = 103;
/* =================== LIVE RESULTS API =================== */

const API_BASE = "https://worldcup26.ir";
let teamIdToCode = null;
let syncIntervalId = null;
let liveKeys = {};
let syncRunning = false;

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
    const res = await fetch(`${API_BASE}/get/teams`);
    const data = await res.json();
    const list = data.teams || data.matches || data || [];
    (Array.isArray(list) ? list : []).forEach((t) => {
      if (t.fifa_code) teamIdToCode[t.id] = t.fifa_code;
    });
  } catch (e) {
    console.warn("[api] team mapping failed", e);
  }
}

/* Reverse map from our team code to API team IDs */
function _buildTeamCodeToId() {
  const rev = {};
  if (!teamIdToCode) return rev;
  for (const [id, fifaCode] of Object.entries(teamIdToCode)) {
    rev[fifaCode] = id;
  }
  return rev;
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

/* Find matches within [startEpoch,endEpoch] time window.
	 Returns [{apiId, fixtureKey}] */
function _findMatchesInWindow(startEpoch, endEpoch) {
  const result = [];
  for (const gl of GROUP_LETTERS) {
    GROUP_FIXTURES[gl].forEach((f, i) => {
      const key = gl + i;
      const ts = fixtureTimestamps[key];
      if (ts && ts >= startEpoch && ts <= endEpoch) {
        const homeCode = teamIdToCode
          ? Object.entries(teamIdToCode).find(
              ([_id, code]) => code === f.home,
            )?.[0]
          : "";
        const awayCode = teamIdToCode
          ? Object.entries(teamIdToCode).find(
              ([_id, code]) => code === f.away,
            )?.[0]
          : "";
        if (homeCode && awayCode) {
          /* API match id = index within group-specific games. Need actual API id.
						 We'll match by teams instead. Store fixtureKey and rely on teams. */
          result.push({ fixtureKey: key, home: f.home, away: f.away });
        }
      }
    });
  }
  return result;
}

/* Fetch team mapping + all games, write scores for finished matches. */
async function fetchAllResults() {
  const btn = document.getElementById("fetchBtn");
  if (!btn) return;
  btn.disabled = true;
  btn.textContent = "📥 A obter…";
  try {
    await ensureTeamMapping();
    const res = await fetch(`${API_BASE}/get/games`);
    const data = await res.json();
    const games = data.games || data.matches || data;
    if (!Array.isArray(games)) return;
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
  } catch (e) {
    console.warn("[api] fetch failed", e);
  }
  btn.disabled = false;
  btn.textContent = "📥 Obter resultados";
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
    const res = await fetch(`${API_BASE}/get/games`);
    const data = await res.json();
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
	 - cards:         teamCode -> [yellows, secondYellows, directReds, yellowPlusReds] */
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

/* Conduct ("fair play") score: -1 yellow, -3 second yellow, -4 direct red,
	 -5 yellow followed by direct red. Higher (closer to 0) is better. */
function conductScore(teamCode) {
  const cards = state.cards[teamCode] || [0, 0, 0, 0];
  const yellows = +cards[0] || 0,
    secondYellows = +cards[1] || 0;
  const directReds = +cards[2] || 0,
    yellowPlusReds = +cards[3] || 0;
  return -(yellows + 3 * secondYellows + 4 * directReds + 5 * yellowPlusReds);
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
      const cards = state.cards[teamCode] || ["", "", "", ""];
      cardsHTML += `<tr>
        <td class="tl">${TEAMS[teamCode].flag} ${escapeHTML(TEAMS[teamCode].name)}</td>
        <td><input class="fpi" data-k="fp-${teamCode}-0" value="${cards[0] ?? ""}" inputmode="numeric" maxlength="2"></td>
        <td><input class="fpi" data-k="fp-${teamCode}-1" value="${cards[1] ?? ""}" inputmode="numeric" maxlength="2"></td>
        <td><input class="fpi" data-k="fp-${teamCode}-2" value="${cards[2] ?? ""}" inputmode="numeric" maxlength="2"></td>
        <td><input class="fpi" data-k="fp-${teamCode}-3" value="${cards[3] ?? ""}" inputmode="numeric" maxlength="2"></td>
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
            <col class="c-num"><col class="c-num"><col class="c-num"><col class="c-num">
            <col class="c-num"><col class="c-num">
          </colgroup>
          <thead><tr><th class="tl">Equipa</th><th title="Cartão amarelo (−1)">🟨</th><th title="Duplo amarelo (−3)">🟨🟨</th><th title="Vermelho direto (−4)">🟥</th><th title="Amarelo + vermelho direto (−5)">🟨+🟥</th><th>Pont.</th><th>FIFA</th></tr></thead>
          <tbody>${cardsHTML}</tbody>
        </table>
        <div class="fpnote">Pontuação de conduta = −1 por amarelo, −3 por duplo amarelo, −4 por vermelho direto, −5 por amarelo + vermelho direto. Só conta se as equipas continuarem empatadas após o confronto direto e os golos; o ranking FIFA (coluna da direita, 11 jun 2026) desfaz automaticamente qualquer empate restante.</div>
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

  /* emphasise time in date-time-venue string, like group stage does */
  const whenParts = match.when.split("·").map((p) => p.trim());
  const whenHTML =
    whenParts.length === 3
      ? `${whenParts[0]} · <b>${whenParts[1]}</b> · ${whenParts[2]}`
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

function renderBracket(context) {
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
  document.getElementById("bracketGrid").innerHTML = html;

  /* Align column 5 connector with center of final match box */
  requestAnimationFrame(() => {
    const cell = document.querySelector("#bracketGrid .bcell.conn-in");
    const finalBox = cell?.querySelector(".bk.final");
    if (cell && finalBox) {
      const cellRect = cell.getBoundingClientRect();
      const finalRect = finalBox.getBoundingClientRect();
      const centerY = finalRect.top + finalRect.height / 2 - cellRect.top;
      cell.style.setProperty("--conn-top", `${centerY}px`);
    }
  });
}

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
    if (!state.cards[id]) state.cards[id] = ["", "", "", ""];
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

/* =================== THEME =================== */
const themeButton = document.getElementById("themeBtn");
function applyTheme(themeName) {
  document.documentElement.setAttribute("data-theme", themeName);
  themeButton.textContent = themeName === "dark" ? "◑ Claro" : "◐ Escuro";
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
