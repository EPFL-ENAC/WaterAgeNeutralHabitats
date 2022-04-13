const DATA_URL =
  process.env.NODE_ENV === "production"
    ? "https://enacit4r-cdn.epfl.ch/WANH/2022-05-06/data"
    : "/data";

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
    symbol: {
      current:
        "path://M 378.17477,37.146314 V 169.43799 H 245.88309 V 37.146314 Z",
      conservative:
        "path://M 238.06641,214.50391 V 360.02344 H 383.58789 V 214.50391 Z m 13.22851,13.22851 h 119.0625 v 119.0625 h -119.0625 z",
      radical:
        "path://M 221.83008,389.45312 V 574.66211 H 407.03711 V 389.45312 Z m 52.91601,52.91602 h 79.375 v 79.375 h -79.375 z",
    },
    tinySvg: "/icons/tinySlabs.svg",
    svg: "/icons/Slabs.svg",
  },
  {
    name: "Single-family Houses",
    dbName: "SingleFamilyHousing",
    center: [52.58473108, 13.41398555],
    zoom: 16,
    latLngBounds: [
      [52.58584282, 13.41209156],
      [52.58361934, 13.41587954],
    ],
    symbol: {
      current:
        "path://M 132.29167,180.00001 H 0 V 87.395836 L 66.145835,21.250001 132.29167,87.395836 Z",
      conservative:
        "path://M 66.146484,11.896484 -6.6152344,84.65625 V 186.61523 H 138.90625 V 84.65625 Z m 0,18.707032 59.531246,59.53125 V 173.38477 H 6.6152344 V 90.134766 Z",
      radical:
        "path://M 66.146484,-16.167969 -26.458984,76.435547 V 206.45898 H 158.75 V 76.435547 Z m 0,74.835938 39.687496,39.6875 V 153.54102 H 26.458984 V 98.355469 Z",
    },
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
    symbol: {
      current:
        "path://M 243.3136,17.217147 166.46399,170.91441 H 320.16126 C 294.54525,119.68205 268.92947,68.449577 243.3136,17.217147 Z",
      conservative:
        "path://m 255.83398,191.4082 c -29.18762,58.3655 -58.36901,116.73412 -87.55273,175.10157 H 343.38281 C 314.20126,308.14188 285.01715,249.77527 255.83398,191.4082 Z m -0.002,29.58203 66.14453,132.28907 v 0.002 H 189.6875 Z",
      radical:
        "path://M 242.75375,375.99515 123.0936,615.31351 h 239.31836 z m 0,118.32617 34.03711,68.07617 h -68.07617 z",
    },
    tinySvg: "/icons/tinyIndustry.svg",
    svg: "/icons/Industry.svg",
  },
  {
    name: "Open Block Housing",
    dbName: "OpenBlocks",
    center: [52.568774675, 13.424919295],
    zoom: 16,
    latLngBounds: [
      [52.56988753, 13.42301827],
      [52.56766182, 13.42682032],
    ],
    symbol: {
      current:
        "path://m 396.21565,100.19102 a 66.145836,66.145836 0 0 1 -66.14584,66.14584 66.145836,66.145836 0 0 1 -66.14583,-66.14584 66.145836,66.145836 0 0 1 66.14583,-66.14584 66.145836,66.145836 0 0 1 66.14584,66.14584 z",
      conservative:
        "path://m 333.4375,202.54492 c -40.10612,1e-5 -72.75977,32.6556 -72.75977,72.76172 0,40.10612 32.65365,72.75976 72.75977,72.75977 40.10613,0 72.75977,-32.65364 72.75977,-72.75977 0,-40.10613 -32.65364,-72.76172 -72.75977,-72.76172 z m 0,13.23047 c 32.95655,0 59.53125,26.5747 59.53125,59.53125 0,32.95655 -26.5747,59.53125 -59.53125,59.53125 -32.95655,0 -59.53125,-26.5747 -59.53125,-59.53125 0,-32.95655 26.5747,-59.53125 59.53125,-59.53125 z",
      radical:
        "path://m 337.92773,357.06836 c -50.83048,0 -92.60351,41.77303 -92.60351,92.60352 0,50.83048 41.77303,92.60546 92.60351,92.60546 50.83049,10e-6 92.60352,-41.77498 92.60352,-92.60546 0,-50.83049 -41.77303,-92.60352 -92.60352,-92.60352 z m 0,52.91602 c 22.2322,-10e-6 39.68751,17.4553 39.6875,39.6875 10e-6,22.23219 -17.4553,39.6875 -39.6875,39.6875 -22.23219,-10e-6 -39.6875,-17.45531 -39.6875,-39.6875 0,-22.2322 17.45531,-39.6875 39.6875,-39.6875 z",
    },
    tinySvg: "/icons/tinyOpenBlocks.svg",
    svg: "/icons/OpenBlocks.svg",
  },
];

const SCENARIOS = [
  {
    id: 0,
    dbName: "current",
    name: "Current Conditions",
    color: "black",
    svg: "/icons/scenario_0.svg",
    designStrategies: [0],
  },
  {
    id: 1,
    dbName: "conservative",
    name: "Conservative Scenario",
    color: "#bababa",
    svg: "/icons/scenario_R1.svg",
    designStrategies: [9, 1, 2, 3, 4],
  },
  {
    id: 2,
    dbName: "radical",
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
    dbName: "LSrfn",
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
  timeseries: (landmarkFocusId, designStrategyFocusId) => {
    const landmark = LANDMARKS[landmarkFocusId].dbName;
    const design = DESIGN_STRATEGIES[designStrategyFocusId].dbName;
    return `${DATA_URL}/${landmark}_${design}_SIM2/timeseries.json`;
  },
  colormap: (mapVariable) => `${DATA_URL}/colormaps/cmap_${mapVariable}.json`,
  keyDates: "/keyDates.json",
  elementsGeojson: (landmark) =>
    `${DATA_URL}/elements/Elements_${landmark}.geojson`,
  pankeRiverGeojson: `${DATA_URL}/Panke/PankeRiver.geojson`,
  pankeRiverlineGeojson: `${DATA_URL}/Panke/PankeRiverline.geojson`,
  pankePankowWatershedGeojson: `${DATA_URL}/Panke/PankePankowWatershed.geojson`,
  watershedGeojson: `${DATA_URL}/Panke/Watershed.geojson`,
  subcatchmentsGeojson: `${DATA_URL}/Panke/Subcatchments.geojson`,
  extentIndustryGeojson: `${DATA_URL}/landmarks/Extent_Industry.geojson`,
  extentOpenBlocksGeojson: `${DATA_URL}/landmarks/Extent_OpenBlocks.geojson`,
  extentSingleFamilyHousingGeojson: `${DATA_URL}/landmarks/Extent_SingleFamilyHousing.geojson`,
  extentSlabsGeojson: `${DATA_URL}/landmarks/Extent_Slabs.geojson`,
  summaryFluxesData: `${DATA_URL}/summary_fluxes.json`,
  overlayImage: (
    landmarkFocusId,
    designStrategyFocusId,
    mapVariableFocusId,
    dayFocus
  ) => {
    if (dayFocus === -1) return "";

    const landmark = LANDMARKS[landmarkFocusId].dbName;
    const design = DESIGN_STRATEGIES[designStrategyFocusId].dbName;
    const mapVariable = MAP_VARIABLES[mapVariableFocusId].dbName;
    const numLength = 11 - MAP_VARIABLES[mapVariableFocusId].dbName.length;
    const dayNum = ("0000000" + dayFocus).slice(-numLength);

    return `${DATA_URL}/${landmark}_${design}_SIM2/${mapVariable}${dayNum}.jpg`;
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
