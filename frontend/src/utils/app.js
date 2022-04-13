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
    symbols: {
      existing:
        "path://M -6.6152344,41.09375 V 186.61523 H 138.90625 V 41.09375 h -6.61523 z M 6.6152344,54.322266 H 125.67773 V 173.38477 H 6.6152344 Z",
      conservative:
        "path://M 13.228516,34.478516 V 60.9375 H 66.146484 V 34.478516 Z m 105.833984,0 V 47.708984 60.9375 87.396484 h 26.45898 v -39.6875 H 132.29102 V 34.478516 Z M -13.228516,87.396484 V 140.3125 H 13.228516 V 87.396484 Z M 119.0625,140.3125 V 166.77148 180 193.22852 h 26.45898 V 140.3125 Z M 13.228516,166.77148 v 26.45704 h 52.917968 v -26.45704 z",
      radical:
        "path://M -15.875,31.833984 V 195.875 H 148.16602 V 31.833984 h -15.875 z m 31.75,31.75 H 116.41602 V 164.125 H 15.875 Z",
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
    symbols: {
      existing:
        "path://M 66.146484,11.896484 -6.6152344,84.65625 V 186.61523 H 138.90625 V 180 84.65625 Z m 0,18.707032 59.531246,59.53125 V 173.38477 H 6.6152344 V 90.134766 Z",
      conservative:
        "path://M 66.146484,2.5410156 37.417969,31.269531 56.126953,49.978516 66.146484,39.958984 74.835938,48.648438 93.544922,29.939453 Z M 112.25391,48.648438 93.544922,67.357422 119.0625,92.875 v 5.869141 h 26.45898 V 81.916016 Z m -93.544926,1.330078 -31.9375,31.9375 V 100.625 h 26.457032 v -7.75 L 37.417969,68.6875 Z M 119.0625,125.20312 v 41.56836 h -13.22852 v 26.45704 h 26.45704 v -15.10938 h 13.23046 v -52.91602 z m -132.291016,1.88086 v 66.14454 H 0 v -26.45704 h 13.228516 v -39.6875 z m 39.6875,39.6875 v 26.45704 H 79.375 v -26.45704 z",
      radical:
        "path://M 66.146484,-1.2011719 -15.875,80.820312 V 195.875 H 148.16602 V 180 80.820312 Z m -0.002,44.9003909 50.271489,50.271484 V 164.125 H 15.875 V 93.970703 Z",
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
    symbols: {
      existing:
        "path://M 66.146484,32.917969 -10.703125,186.61523 H 142.99414 l -4.78711,-9.57421 z m 0,29.580078 55.441406,110.886723 H 10.703125 Z",
      conservative:
        "path://M 66.146484,18.126953 42.597656,65.224609 65.951172,76.902344 89.927734,124.85156 113.5918,113.01953 Z M 18.931641,112.55469 -21.404297,193.22852 H 37.041016 V 166.77148 H 21.404297 l 21.193359,-42.38476 z m 118.326169,47.79492 -12.8457,6.42187 H 89.958984 v 26.45704 h 42.332036 l 21.19603,-0.11884 -9.36205,-19.0257 z",
      radical:
        "path://M 66.146484,12.210938 -25.685547,195.875 H 157.97852 l -11.48829,-22.97461 z m 0,70.996093 L 106.60547,164.125 H 25.6875 Z",
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
    symbols: {
      existing:
        "path://m 332.54154,34.165611 c -40.10612,0 -72.76172,32.65364 -72.76171,72.759769 -1e-5,40.10613 32.65559,72.76172 72.76171,72.76172 40.10613,0 72.75977,-32.6556 72.75977,-72.76172 0,-40.106119 -32.65364,-72.759769 -72.75977,-72.759769 z m 0,13.22852 c 32.95655,0 59.53126,26.5747 59.53125,59.531249 0,32.95655 -26.5747,59.53125 -59.53125,59.53125 -32.95655,0 -59.53125,-26.5747 -59.53125,-59.53125 0,-32.956549 26.5747,-59.531249 59.53125,-59.531249 z",
      conservative:
        "path://m 337.11967,209.67538 -2.24609,26.36328 c 6.99951,0.59633 13.92979,2.63597 20.11914,5.92774 l 12.42382,-23.35938 c -9.38798,-4.99293 -19.71863,-8.03042 -30.29687,-8.93164 z m -31.30469,3.54297 c -10.11628,3.26457 -19.47816,8.56231 -27.49023,15.50391 l 17.32617,19.99609 c 5.32051,-4.60966 11.6169,-8.16655 18.29102,-10.32031 z m 85.94727,25.36914 -20.48243,16.74805 c 4.45118,5.44377 7.82059,11.84107 9.7793,18.57617 l 25.40625,-7.38867 c -2.96785,-10.20507 -7.98798,-19.72295 -14.70312,-27.93555 z m -132.71094,15.05273 c -4.72077,9.53352 -7.44814,19.94727 -8.04492,30.53907 l 26.41601,1.48828 c 0.39561,-7.02125 2.23105,-14.00895 5.33985,-20.28711 z m 150.57422,35.10352 -26.45899,0.0254 c 0.007,7.04687 -1.41631,14.13425 -4.15234,20.58203 l 24.35547,10.33398 c 4.15673,-9.79582 6.26562,-20.34704 6.25586,-30.9414 z m -129.24024,17.77344 -24.93359,8.85351 c 3.55705,10.01591 9.12417,19.22199 16.29492,27.0293 l 19.48633,-17.89844 c -4.76127,-5.18394 -8.50069,-11.3758 -10.84766,-17.98437 z m 86.72852,20.20117 c -5.04759,4.91032 -11.12957,8.83002 -17.66797,11.36914 l 9.57812,24.66406 c 9.90694,-3.84725 18.94305,-9.67892 26.53907,-17.06836 z m -58.85547,10.18554 -11.04687,24.04102 c 9.66989,4.44331 20.15992,6.86223 30.75781,7.1543 l 0.72851,-26.44922 c -7.03576,-0.1939 -14.07684,-1.82248 -20.43945,-4.7461 z",
      radical:
        "path://m 330.25053,375.48983 c -45.11083,0 -82.02149,36.91066 -82.02149,82.02149 1e-5,45.11082 36.91067,82.01953 82.02149,82.01953 45.11082,0 82.02148,-36.90871 82.02148,-82.01953 0,-45.11083 -36.91066,-82.02149 -82.02148,-82.02149 z m 0,31.75 c 27.95185,0 50.27148,22.31964 50.27148,50.27149 0,27.95184 -22.31964,50.26953 -50.27148,50.26953 -27.95185,0 -50.27148,-22.31768 -50.27149,-50.26953 0,-27.95186 22.31964,-50.27149 50.27149,-50.27149 z",
    },
    tinySvg: "/icons/tinyOpenBlocks.svg",
    svg: "/icons/OpenBlocks.svg",
  },
];

const SCENARIOS = [
  {
    id: 0,
    dbName: "existing",
    name: "Existing Condition",
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
