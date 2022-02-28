const LANDMARKS = [
  {
    name: "Slabs",
    dbName: "Slabs",
    center: [52.579816675, 13.427338875],
    zoom: 16,
    latLngBounds: [
      [52.58092793, 13.42544291],
      [52.57870542, 13.42923484],
    ],
  },
  {
    name: "Single Family Housing",
    dbName: "SingleFamilyHousing",
    center: [52.58473108, 13.41398555],
    zoom: 16,
    latLngBounds: [
      [52.58584282, 13.41209156],
      [52.58361934, 13.41587954],
    ],
  },
  {
    name: "Industry",
    dbName: "Industry",
    center: [52.587923065, 13.41707339],
    zoom: 16,
    latLngBounds: [
      [52.58903163, 13.41516811],
      [52.5868145, 13.41897867],
    ],
  },
  {
    name: "Open Blocks",
    dbName: "OpenBlocks",
    center: [52.568774675, 13.424919295],
    zoom: 16,
    latLngBounds: [
      [52.56988753, 13.42301827],
      [52.56766182, 13.42682032],
    ],
  },
];

const DESIGN_STRATEGIES = [
  { id: 0, name: "1", dbName: 1 },
  { id: 1, name: "2", dbName: 2 },
  { id: 2, name: "3", dbName: 3 },
  { id: 3, name: "4", dbName: 4 },
  { id: 4, name: "5", dbName: 5 },
  { id: 5, name: "All", dbName: 6 },
];

const MAP_VARIABLES = [
  { name: "ET", dbName: "Evap" },
  { name: "L", dbName: "PrcL" },
  { name: "Q", dbName: "LSrfo" },
  { name: "S", dbName: "SWCup" },
];

export { LANDMARKS, DESIGN_STRATEGIES, MAP_VARIABLES };
