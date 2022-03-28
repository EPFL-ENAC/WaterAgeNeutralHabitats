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
    name: "Existing Condition",
    color: "black",
    svg: "/icons/scenario_0.svg",
    designStrategies: [0],
  },
  {
    id: 1,
    dbName: "R1",
    name: "Conservative Scenario",
    color: "#bababa",
    svg: "/icons/scenario_R1.svg",
    designStrategies: [9, 1, 2, 3, 4],
  },
  {
    id: 2,
    dbName: "R2",
    name: "Radical Scenario",
    color: "purple",
    svg: "/icons/scenario_R2.svg",
    designStrategies: [10, 2, 3, 4, 5, 6, 7, 8],
  },
];

const DESIGN_STRATEGIES = [
  {
    id: 0,
    dbName: 0,
    name: "Existing condition",
    description: "Current situation",
    style: {},
  },
  {
    id: 1,
    dbName: 1,
    name: "Transform parking lots",
    description:
      "Surfaces devoted to car and truck parking are de-paved. Asphalt and pavement are replaced with stabilized grass surfaces",
    style: {},
  },
  {
    id: 2,
    dbName: 2,
    name: "Transform sidewalks",
    description:
      "Sidewalks are transformed both in their width and their depth. Sealed surfaces are replaced with more permeable material, and rows of trees are systematically planted along sidewalks.",
    style: {},
  },
  {
    id: 3,
    dbName: 3,
    name: "Transform public buildings open spaces",
    description:
      "Open spaces located on the grounds of public buildings (schools, police stations, etc.) are heavily transformed through the depaving of most sealed surfaces and the planting of new vegetation",
    style: {},
  },
  {
    id: 4,
    dbName: 4,
    name: "Regenerate lawns",
    description:
      "Lawn surfaces, mainly located in front of or in between collective housing buildings, as well as inside private gardens are to be more densely vegetated. Grass is let to grow longer, and more shrubs are planted on underused areas",
    style: {},
  },
  {
    id: 5,
    dbName: 5,
    name: "Depave 2dary streets",
    description:
      "Secondary streets receiving only local car traffic are de-paved. Asphalt and pavement are replaced with more permeable gravel surfaces, still allowing for slow motorized mobility",
    style: {},
  },
  {
    id: 6,
    dbName: 6,
    name: "Vegetate flat roofs",
    description:
      'Flat roofs are systematically transformed into "green" roofs capable of temporarily storing water. Runoff from the vegetated roofs will directly infiltrate in the ground around the building',
    style: {},
  },
  {
    id: 7,
    dbName: 7,
    name: "Transform residual sealed surfaces",
    description:
      'Sealed surfaces are defined as "residual" if they are neither used for parking, walking, driving, recreation or storing purposes. These surfaces are to be de-paved and planted with vegetation, while allowing for multiple uses',
    style: {},
  },
  {
    id: 8,
    dbName: 8,
    name: "Transform parking lots",
    description:
      "Surfaces devoted to car and truck parking are de-paved. Asphalt and pavement are replaced with stabilized grass surfaces, and trees are planted between parking spots",
    style: {},
  },
  {
    id: 9,
    dbName: 9,
    name: "Full scenario",
    description: "All Conservative strategies implemented",
    style: { fontWeight: "bold" },
  },
  {
    id: 10,
    dbName: 10,
    name: "Full scenario",
    description: "All Radical strategies implemented",
    style: { fontWeight: "bold" },
  },
];

const MAP_VARIABLES = [
  {
    // symbol: "ET",
    name: "Evapotranspiration",
    dbName: "Evap",
    tooltip: "BubbleEvapotranspiration",
  },
  {
    // symbol: "Q",
    name: "Surface runoff",
    dbName: "LSrfo",
    tooltip: "BubbleSurfaceRunoff",
  },
  {
    // symbol: "L",
    name: "Soil leakage",
    dbName: "PrcL3",
    tooltip: "BubbleLeakage",
  },
  {
    // symbol: "S",
    name: "Water storage",
    dbName: "SWCup",
    tooltip: "BubbleWaterStorage",
  },
];

const URLS = {
  welcomeImage: {
    png: "/welcome.png",
    alt: "surface runoff on permeable surfaces",
  },
  tiles:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  timeseries: (landmarkFocusId, designStrategyFocusId, scenarioId) => {
    const scenarioFolderEnding = ["R1", "R1", "R2"];
    const landmark = LANDMARKS[landmarkFocusId].dbName;
    const design =
      scenarioId === 0 ? 0 : DESIGN_STRATEGIES[designStrategyFocusId].dbName;
    const scenario = scenarioFolderEnding[scenarioId];

    return `/data/${landmark}_${design}_${scenario}/timeseries.json`;
  },
  colormap: (mapVariable) => `/data/colormaps/cmap_${mapVariable}.json`,
  keyDates: "/keyDates.json",
  elementsGeojson: (landmark) => `/data/elements/Elements_${landmark}.geojson`,
  pankeRiverGeojson: "/data/Panke/PankeRiver.geojson",
  pankeRiverlineGeojson: "/data/Panke/PankeRiverline.geojson",
  pankePankowWatershedGeojson: "/data/Panke/PankePankowWatershed.geojson",
  watershedGeojson: "/data/Panke/Watershed.geojson",
  subcatchmentsGeojson: "/data/Panke/Subcatchments.geojson",
  extentIndustryGeojson: "data/landmarks/Extent_Industry.geojson",
  extentOpenBlocksGeojson: "data/landmarks/Extent_OpenBlocks.geojson",
  extentSingleFamilyHousingGeojson:
    "data/landmarks/Extent_SingleFamilyHousing.geojson",
  extentSlabsGeojson: "data/landmarks/Extent_Slabs.geojson",
  summaryFluxesData: "/data/summary_fluxes.json",
  overlayImage: (
    landmarkFocusId,
    designStrategyFocusId,
    scenarioId,
    mapVariableFocusId,
    dayFocus
  ) => {
    if (dayFocus === -1) return "";

    const scenarioFolderEnding = ["R1", "R1", "R2"];
    const landmark = LANDMARKS[landmarkFocusId].dbName;
    const design =
      scenarioId === 0 ? 0 : DESIGN_STRATEGIES[designStrategyFocusId].dbName;
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
  back: "mdi-arrow-left",
  about: "mdi-information",
  close: "mdi-close",
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
