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
    symbol: "path://M 132.29167,47.708335 V 180.00001 H 0 V 47.708335 Z",
    tinySvg: "/icons/tinySlabs.svg",
    svg: "/icons/Slabs.svg",
  },
  {
    name: "Houses",
    dbName: "SingleFamilyHousing",
    center: [52.58473108, 13.41398555],
    zoom: 16,
    latLngBounds: [
      [52.58584282, 13.41209156],
      [52.58361934, 13.41587954],
    ],
    symbol:
      "path://M 132.29167,180.00001 H 0 L 0,87.395836 66.145835,21.250001 132.29167,87.395836 Z",
    tinySvg: "/icons/tinySingleFamilyHousing.svg",
    svg: "/icons/SingleFamilyHousing.svg",
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
    symbol: "path://M 132.29167,180.00001 H 0 L 66.145835,47.708335 Z",
    tinySvg: "/icons/tinyIndustry.svg",
    svg: "/icons/Industry.svg",
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
    symbol:
      "path://M 132.29167,113.85417 A 66.145836,66.145836 0 0 1 66.145836,180.00001 66.145836,66.145836 0 0 1 0,113.85417 66.145836,66.145836 0 0 1 66.145836,47.708336 66.145836,66.145836 0 0 1 132.29167,113.85417 Z",
    tinySvg: "/icons/tinyOpenBlocks.svg",
    svg: "/icons/OpenBlocks.svg",
  },
];

const SCENARIOS = [
  {
    id: 0,
    dbName: "0",
    name: "Current",
    color: "black",
    svg: "/icons/scenario_0.svg",
  },
  {
    id: 1,
    dbName: "R1",
    name: "Conservative ops",
    color: "#bababa",
    svg: "/icons/scenario_R1.svg",
  },
  {
    id: 2,
    dbName: "R2",
    name: "Radical ops",
    color: "purple",
    svg: "/icons/scenario_R2.svg",
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
  { name: "Evapotranspiration", dbName: "Evap" },
  { name: "Precipitation", dbName: "PrcL" },
  { name: "Surface runoff", dbName: "LSrfo" },
  { name: "Leakage", dbName: "SWCup" },
];

const URLS = {
  tiles:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  timeseries: (landmark, designStrategy, modelSetup) =>
    `/data/${landmark}_${designStrategy}_${modelSetup}/timeseries.json`,
  colormap: (mapVariable) => `/data/colormaps/cmap_${mapVariable}.json`,
  keyDates: "/keyDates.json",
  elementsGeojson: (landmark) => `/data/elements/Elements_${landmark}.geojson`,
  PankeRiverGeojsons: ["/data/Panke/PankeRiver.geojson"],
  PankeWatershedGeojsons: ["/data/Panke/PankePankowWatershed.geojson"],
  summaryFluxesData: "/data/summary_fluxes.json",
  overlayImage: (
    landmarkFocusId,
    designStrategiesFocusId,
    scenarioId,
    mapVariableFocusId,
    dayFocus
  ) => {
    if (dayFocus === -1) return "";

    const scenarioFolderEnding = ["R1", "R1", "R2"];
    const landmark = LANDMARKS[landmarkFocusId].dbName;
    const design =
      scenarioId === 0 ? 0 : DESIGN_STRATEGIES[designStrategiesFocusId].dbName;
    const scenario = scenarioFolderEnding[scenarioId];
    const mapVariable = MAP_VARIABLES[mapVariableFocusId].dbName;
    const roundedDay = dayFocus - (dayFocus % 5);
    const numLength = 11 - MAP_VARIABLES[mapVariableFocusId].dbName.length;
    const dayNum = ("0000000" + roundedDay).slice(-numLength);

    return `/data/${landmark}_${design}_${scenario}/${mapVariable}${dayNum}.jpg`;
  },
};

const ELEMENTS_HIGHLIGHT_LIST = [
  // set in fetchElementHighlights
  { id: 0, name: "none" },
  { id: 1, name: "parking lots", dbName: "1_PARKING LOTS" },
  { id: 2, name: "tree alignments", dbName: "2_TREE ALIGNMENTS" },
  { id: 3, name: "public surfaces", dbName: "3_PUBLIC SURFACES" },
  { id: 4, name: "lawns", dbName: "4_LAWNS" },
  { id: 5, name: "secondary streets", dbName: "5_SECONDARY STREETS" },
  { id: 6, name: "flat roofs", dbName: "6_FLAT ROOFS" },
  {
    id: 7,
    name: "residual sealed surfaces",
    dbName: "7_RESIDUAL SEALED SURFACES",
  },
];

const MDI_ICONS = {
  info: "mdi-information-outline",
  bubble: "mdi-message-outline",
};

export {
  LANDMARKS,
  SCENARIOS,
  DESIGN_STRATEGIES,
  MAP_VARIABLES,
  URLS,
  ELEMENTS_HIGHLIGHT_LIST,
  MDI_ICONS,
};
