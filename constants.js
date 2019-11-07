var fileName = "Aggregate Court Size Data - Judgeships by Court.csv";

var supreme_dictionary = [
  { jdcode: [], name: 'Supreme Court', column: 'N/A', size: 9 }
]

var appellate_dictionary = [
  { jdcode: [0],                                                          name: 'DC',               column: 'DC',               size: 11 },
  { jdcode: [39, 37, 50, 93, 70],                                         name: 'First Circuit',    column: 'First Circuit',    size: 6 },
  { jdcode: [13, 53, 54, 55, 56, 81],                                     name: 'Second Circuit',   column: 'Second Circuit',   size: 13 },
  { jdcode: [14, 51, 67, 68, 69, 94],                                     name: 'Third Circuit',    column: 'Third Circuit',    size: 14 },
  { jdcode: [38, 57, 58, 59, 71, 82, 83, 86, 87],                         name: 'Fourth Circuit',   column: 'Fourth Circuit',   size: 15 },
  { jdcode: [34, 35, 36, 43, 44, 76, 77, 78, 79],                         name: 'Fifth Circuit',    column: 'Fifth Circuit',    size: 17 },
  { jdcode: [32, 33, 61, 62, 40, 41, 73, 74, 75],                         name: 'Sixth Circuit',    column: 'Sixth Circuit',    size: 16 },
  { jdcode: [24, 25, 26, 27, 28, 88, 89],                                 name: 'Seventh Circuit',  column: 'Seventh Circuit',  size: 11 },
  { jdcode: [ 6,  7, 29, 30, 42, 45, 46, 60, 48, 72],                     name: 'Eighth Circuit',   column: 'Eighth Circuit',   size: 11 },
  { jdcode: [ 4,  5,  8,  9, 10, 11, 91, 22, 23, 92, 47, 49, 66, 84, 85], name: 'Ninth Circuit',    column: 'Ninth Circuit',    size: 29 },
  { jdcode: [12, 31, 63, 64, 65, 52, 80, 90],                             name: 'Tenth Circuit',    column: 'Tenth Circuit',    size: 12 },
  { jdcode: [ 1,  2,  3, 19, 20, 21, 16, 17, 18],                         name: 'Eleventh Circuit', column: 'Eleventh Circuit', size: 12 },
  { jdcode: [], name: 'Federal Circuit',  column: 'Federal Circuit',  size: 12 }
];

var district_dictionary = [

  { jdcode:  0, name: "DC",               column: "DC",               size: 15},

  { jdcode: 39, name: "MA",               column: "First Circuit",    size: 13 },
  { jdcode: 37, name: "ME",               column: "First Circuit",    size: 3 },
  { jdcode: 50, name: "NH",               column: "First Circuit",    size: 3 },
  { jdcode: 93, name: "PR",               column: "First Circuit",    size: 7 },
  { jdcode: 70, name: "RI",               column: "First Circuit",    size: 3 },

  { jdcode: 13, name: "CT",               column: "Second Circuit",   size: 8 },
  { jdcode: 53, name: "NY Eastern",       column: "Second Circuit",   size: 15 },
  { jdcode: 54, name: "NY Northern",      column: "Second Circuit",   size: 5 },
  { jdcode: 55, name: "NY Southern",      column: "Second Circuit",   size: 28 },
  { jdcode: 56, name: "NY Western",       column: "Second Circuit",   size: 4 },
  { jdcode: 81, name: "VT",               column: "Second Circuit",   size: 2 },

  { jdcode: 14, name: "DE",               column: "Third Circuit",    size: 4 },
  { jdcode: 51, name: "NJ",               column: "Third Circuit",    size: 17 },
  { jdcode: 67, name: "PA Eastern",       column: "Third Circuit",    size: 22 },
  { jdcode: 68, name: "PA Middle",        column: "Third Circuit",    size: 6 },
  { jdcode: 69, name: "PA Western",       column: "Third Circuit",    size: 10 },
  { jdcode: 94, name: "VI",               column: "Third Circuit",    size: 2 },

  { jdcode: 38, name: "MD",               column: "Fourth Circuit",   size: 10 },
  { jdcode: 57, name: "NC Eastern",       column: "Fourth Circuit",   size: 4 },
  { jdcode: 58, name: "NC Middle",        column: "Fourth Circuit",   size: 4 },
  { jdcode: 59, name: "NC Western",       column: "Fourth Circuit",   size: 5 },
  { jdcode: 71, name: "SC",               column: "Fourth Circuit",   size: 10 },
  { jdcode: 82, name: "VA Eastern",       column: "Fourth Circuit",   size: 11 },
  { jdcode: 83, name: "VA Western",       column: "Fourth Circuit",   size: 4 },
  { jdcode: 86, name: "WV Northern",      column: "Fourth Circuit",   size: 3 },
  { jdcode: 87, name: "WV Southern",      column: "Fourth Circuit",   size: 5 },

  { jdcode: 34, name: "LA Eastern",       column: "Fifth Circuit", size: 12 },
  { jdcode: 35, name: "LA Middle",        column: "Fifth Circuit", size: 3 },
  { jdcode: 36, name: "LA Western",       column: "Fifth Circuit", size: 7 },
  { jdcode: 43, name: "MS Northern",      column: "Fifth Circuit", size: 3 },
  { jdcode: 44, name: "MS Southern",      column: "Fifth Circuit", size: 6 },
  { jdcode: 76, name: "TX Eastern",       column: "Fifth Circuit", size: 8 },
  { jdcode: 77, name: "TX Northern",      column: "Fifth Circuit", size: 12 },
  { jdcode: 78, name: "TX Southern",      column: "Fifth Circuit", size: 19 },
  { jdcode: 79, name: "TX Western",       column: "Fifth Circuit", size: 13 },

  { jdcode: 32, name: "KY Eastern",       column: "Sixth Circuit", size: 6 },
  { jdcode: 33, name: "KY Western",       column: "Sixth Circuit", size: 5 },
  { jdcode: 61, name: "OH Northern",      column: "Sixth Circuit", size: 11 },
  { jdcode: 62, name: "OH Southern",      column: "Sixth Circuit", size: 8 },
  { jdcode: 40, name: "MI Eastern",       column: "Sixth Circuit", size: 15 },
  { jdcode: 41, name: "MI Western",       column: "Sixth Circuit", size: 4 },
  { jdcode: 73, name: "TN Eastern",       column: "Sixth Circuit", size: 5 },
  { jdcode: 74, name: "TN Middle",        column: "Sixth Circuit", size: 4 },
  { jdcode: 75, name: "TN Western",       column: "Sixth Circuit", size: 5 },

  { jdcode: 24, name: "IL Central",       column: "Seventh Circuit", size: 4 },
  { jdcode: 25, name: "IL Northern",      column: "Seventh Circuit", size: 22 },
  { jdcode: 26, name: "IL Southern",      column: "Seventh Circuit", size: 4 },
  { jdcode: 27, name: "IN Northern",      column: "Seventh Circuit", size: 5 },
  { jdcode: 28, name: "IN Southern",      column: "Seventh Circuit", size: 5 },
  { jdcode: 88, name: "WI Eastern",       column: "Seventh Circuit", size: 5 },
  { jdcode: 89, name: "WI Western",       column: "Seventh Circuit", size: 2 },

  { jdcode:  6, name: "AR Eastern",       column: "Eighth Circuit", size: 5 },
  { jdcode:  7, name: "AR Western",       column: "Eighth Circuit", size: 3 },
  { jdcode: 29, name: "IA Northern",      column: "Eighth Circuit", size: 2 },
  { jdcode: 30, name: "IA Southern",      column: "Eighth Circuit", size: 3 },
  { jdcode: 42, name: "MN",               column: "Eighth Circuit", size: 7 },
  { jdcode: 45, name: "MO Eastern",       column: "Eighth Circuit", size: 9 },
  { jdcode: 46, name: "MO Western",       column: "Eighth Circuit", size: 7 },
  { jdcode: 60, name: "ND",               column: "Eighth Circuit", size: 2 },
  { jdcode: 48, name: "NE",               column: "Eighth Circuit", size: 3 },
  { jdcode: 72, name: "SD",               column: "Eighth Circuit", size: 3 },

  { jdcode:  4, name: "AK",               column: "Ninth Circuit", size: 3 },
  { jdcode:  5, name: "AZ",               column: "Ninth Circuit", size: 13 },
  { jdcode:  8, name: "CA Central",       column: "Ninth Circuit", size: 28 },
  { jdcode:  9, name: "CA Eastern",       column: "Ninth Circuit", size: 6 },
  { jdcode: 10, name: "CA Northern",      column: "Ninth Circuit", size: 14 },
  { jdcode: 11, name: "CA Southern",      column: "Ninth Circuit", size: 13 },
  { jdcode: 91, name: "GU",               column: "Ninth Circuit", size: 1 },
  { jdcode: 22, name: "HI",               column: "Ninth Circuit", size: 4 },
  { jdcode: 23, name: "ID",               column: "Ninth Circuit", size: 2 },
  { jdcode: 92, name: "MP",               column: "Ninth Circuit", size: 1 },
  { jdcode: 47, name: "MT",               column: "Ninth Circuit", size: 3 },
  { jdcode: 49, name: "NV",               column: "Ninth Circuit", size: 7 },
  { jdcode: 66, name: "OR",               column: "Ninth Circuit", size: 6 },
  { jdcode: 84, name: "WA Eastern",       column: "Ninth Circuit", size: 4 },
  { jdcode: 85, name: "WA Western",       column: "Ninth Circuit", size: 7 },

  { jdcode: 12, name: "CO",               column: "Tenth Circuit", size: 7 },
  { jdcode: 31, name: "KS",               column: "Tenth Circuit", size: 6 },
  { jdcode: 63, name: "OK Eastern",       column: "Tenth Circuit", size: 2 },
  { jdcode: 64, name: "OK Northern",      column: "Tenth Circuit", size: 4 },
  { jdcode: 65, name: "OK Western",       column: "Tenth Circuit", size: 7 },
  { jdcode: 52, name: "NM",               column: "Tenth Circuit", size: 7 },
  { jdcode: 80, name: "UT",               column: "Tenth Circuit", size: 5 },
  { jdcode: 90, name: "WY",               column: "Tenth Circuit", size: 3 },

  { jdcode:  1, name: "AL Middle",        column: "Eleventh Circuit", size: 3 },
  { jdcode:  2, name: "AL Northern",      column: "Eleventh Circuit", size: 8 },
  { jdcode:  3, name: "AL Southern",      column: "Eleventh Circuit", size: 3 },
  { jdcode: 19, name: "GA Middle",        column: "Eleventh Circuit", size: 4 },
  { jdcode: 20, name: "GA Northern",      column: "Eleventh Circuit", size: 11 },
  { jdcode: 21, name: "GA Southern",      column: "Eleventh Circuit", size: 3 },
  { jdcode: 16, name: "FL Middle",        column: "Eleventh Circuit", size: 15 },
  { jdcode: 17, name: "FL Northern",      column: "Eleventh Circuit", size: 4 },
  { jdcode: 18, name: "FL Southern",      column: "Eleventh Circuit", size: 18 }
]
