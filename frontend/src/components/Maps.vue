<template>
  <v-container>
    <v-card>
      <v-card-title>
        Maps
        <v-spacer />
        <info-tooltip>
          The maps display .. (TO BE DETAILED DEPENDING ON CHANGE MAPS OR
          SCENARIOS MAPS... But must detail here anyway the SCENARIOs
          definitions, as WELL as the Design strategies) . These maps have
          spatial resolution 1 meter and size 250x250. The reference system is
          EPSG:25833 (ETRS89 / UTM zone 33N). A map was produced every 5 days,
          after a spinup period of 364 days. (CHANGE TO DAILY???)
          <h3>Map variables</h3>
          <ul>
            <li><b>ET</b> : `Evap`</li>
            <li>
              <b>S</b> : [to be decided after looking at `SatDef` or `SWCup`]
            </li>
            <li>
              <b>Q</b> : [to be decided after looking at `LSrfo` or the
              difference `LSrfo`-`LSrfi`]
            </li>
            <li><b>L</b> : [to be decided after looking at `PrcL3`, `Rchg`]</li>
          </ul>
          <h3>Key Functionalities</h3>
          <ul>
            <li>Change maps opacity [TBD ...]</li>
            <li>Select design strategies [TBD ...]</li>
          </ul>
        </info-tooltip>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-card flat>
              <v-card-title> Currently </v-card-title>
              <div id="map0" />
              <v-spacer />
              <v-slider
                dense
                v-model="opacity"
                label="opacity"
                min="0"
                max="100"
              />
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card flat>
              <v-card-title> Scenario R1 </v-card-title>
              <div id="map1" />
              <v-card-subtitle>
                <v-select
                  label="Design strategy"
                  :items="designStrategies"
                  item-text="name"
                  item-value="id"
                  v-model="myDesignStrategiesFocusId[0]"
                  @change="changeDesignStrategyFocus1"
                />
              </v-card-subtitle>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card flat>
              <v-card-title> Scenario R2 </v-card-title>
              <div id="map2" />
              <v-card-subtitle>
                <v-select
                  label="Design strategy"
                  :items="designStrategies"
                  item-text="name"
                  item-value="id"
                  v-model="myDesignStrategiesFocusId[1]"
                  @change="changeDesignStrategyFocus2"
                />
              </v-card-subtitle>
            </v-card>
          </v-col>

          <v-col cols="3">
            <v-card flat>
              <v-card-title> Map variable </v-card-title>
              <v-card-text>
                <v-radio-group v-model="myMapVariableFocusId" row>
                  <v-radio
                    v-for="(mapVariable, index) in mapVariables"
                    :key="index"
                    :label="mapVariable.name"
                    :value="index"
                    @click="clickMapVariableFocus"
                  />
                </v-radio-group>
              </v-card-text>
            </v-card>

            <v-card flat>
              <v-card-title> </v-card-title>
              <v-select
                label="Element highlight"
                :items="elementHighlightList"
                item-text="name"
                item-value="id"
                v-model="elementHighlightFocusId"
                @change="displayElementHighlight"
              />
            </v-card>

            <colormap :map-variable="mapVariableName" />

            <v-sparkline
              :value="legendSparklineValue"
              :color="waterBlue"
              height="30"
              padding="2"
              stroke-linecap="round"
              smooth
            >
            </v-sparkline>
            Panke River & watershed
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import L from "leaflet";
require("leaflet.sync");
const axios = require("axios");
import { mapState } from "vuex";
import { eventBus } from "@/main";
import InfoTooltip from "@/components/InfoTooltip";
import Colormap from "@/components/Colormap";

const nb_maps = 3;

export default {
  name: "Maps",
  components: {
    InfoTooltip,
    Colormap,
  },
  data() {
    return {
      tilesUrl:
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "Tiles &copy; Esri",
      maps: [],
      overlayImages: [null, null, null],
      needToSyncMapsAgain: false,
      opacity: 100,

      myMapVariableFocusId: 0, // set in mounted
      myDesignStrategiesFocusId: [0, 0], // set in mounted

      waterBlue: "#7db1f5",
      geojsonData: {},
      legendSparklineValue: [0, 2, 0, 1, 3, 0, 2, 3, 0],

      highlightColor: "#b3142b",
      elementHighlightJSONData: {
        // set in fetchElementHighlights
        Slabs: {},
        SingleFamilyHousing: {},
        Industry: {},
        OpenBlocks: {},
      },
      elementHighlightList: [
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
      ],
      elementHighlightFocusId: 0,
      currentElementHighlightLayer: null,
    };
  },
  computed: {
    ...mapState({
      landmarks: "landmarks",
      landmarkFocusId: "landmarkFocusId",
      overlayImagesFilepaths: "overlayImagesFilepaths",
      mapVariables: "mapVariables",
      mapVariableFocusId: "mapVariableFocusId",
      designStrategies: "designStrategies",
      designStrategiesFocusId: "designStrategiesFocusId",
    }),
    mapVariableName() {
      return this.mapVariables[this.mapVariableFocusId].dbName;
    },
  },
  mounted() {
    this.maps = new Array(nb_maps).fill().map((_val, index) =>
      L.map(`map${index}`, {
        layers: [
          L.tileLayer(this.tilesUrl, {
            attribution: this.attribution,
          }),
        ],
        center: this.landmarks[this.landmarkFocusId].center,
        zoom: this.landmarks[this.landmarkFocusId].zoom,
      })
    );

    // Display river & watershed on map2
    this.displayVectorData("data/Panke/PankeRiver.geojson");
    this.displayVectorData("data/Panke/PankePankowWatershed.geojson");

    this.syncAllMaps();
    eventBus.$on("newLandmarkFocus", () => {
      this.newLandmarkFocus();
    });

    this.maps[0].on("zoomend", this.mapsZoomedEnd);

    eventBus.$on("newOverlayImage", (mapId) => {
      this.addOverlayImage(mapId);
    });

    this.$store.dispatch("init");
    this.myMapVariableFocusId = this.mapVariableFocusId;
    this.myDesignStrategiesFocusId = this.designStrategiesFocusId;

    this.fetchElementHighlights();
  },
  beforeDestroy() {
    eventBus.$off("newLandmarkFocus");
    eventBus.$off("newOverlayImage");
    this.maps[0].off("zoomend");
  },
  watch: {
    opacity: {
      handler() {
        this.changeOpacity();
      },
    },
  },
  methods: {
    fetchElementHighlights() {
      Object.entries(this.elementHighlightJSONData).forEach(([k]) => {
        axios
          .get(`/data/elements/Elements_${k}.geojson`)
          .then((response) => {
            this.elementHighlightJSONData[k] = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },
    displayElementHighlight() {
      this.removeElementHighlight();

      if (this.elementHighlightFocusId !== 0) {
        // Display on map0
        this.currentElementHighlightLayer = L.geoJSON(
          this.elementHighlightJSONData[
            this.landmarks[this.landmarkFocusId].dbName
          ],
          {
            filter: (feature) => {
              return (
                feature.properties.Layer ==
                this.elementHighlightList[this.elementHighlightFocusId].dbName
              );
            },
            style: {
              color: this.highlightColor,
              fillOpacity: 0,
            },
          }
        ).addTo(this.maps[0]);
      }
    },
    removeElementHighlight() {
      if (this.currentElementHighlightLayer !== null) {
        this.maps[0].removeLayer(this.currentElementHighlightLayer);
      }
    },
    displayVectorData(geojsonFilepath) {
      axios
        .get(geojsonFilepath)
        .then((response) => {
          this.geojsonData[geojsonFilepath] = response.data;
          // Display on map2
          L.geoJSON(this.geojsonData[geojsonFilepath], {
            style: {
              color: this.waterBlue,
              fillColor: this.waterBlue,
              fillOpacity: 0.6,
            },
          }).addTo(this.maps[2]);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    addOverlayImage(mapId) {
      const imageLayer = L.imageOverlay(
        this.overlayImagesFilepaths[mapId],
        this.landmarks[this.landmarkFocusId].latLngBounds
      );
      imageLayer.once("load", () => {
        imageLayer.setStyle({
          opacity: this.opacity / 100,
        });
        imageLayer.addTo(this.maps[mapId]);
        this.removeOverlayImage(mapId);
        this.overlayImages[mapId] = imageLayer;
      });
      imageLayer._initImage();
    },
    addOverlayImages() {
      for (let mapId = 0; mapId < nb_maps; mapId++) {
        this.addOverlayImage(mapId);
      }
    },
    removeOverlayImage(mapId) {
      if (this.overlayImages[mapId] !== null) {
        this.overlayImages[mapId].remove(this.maps[mapId]);
      }
    },
    removeOverlayImages() {
      for (let i = 0; i < nb_maps; i++) {
        this.removeOverlayImage(i);
      }
    },
    changeOpacity() {
      for (let i = 0; i < nb_maps; i++) {
        if (this.overlayImages[i] !== null) {
          this.overlayImages[i].setStyle({
            opacity: this.opacity / 100,
          });
        }
      }
    },
    syncAllMaps() {
      for (let i = 0; i < nb_maps; i++) {
        for (let j = 0; j < nb_maps; j++) {
          if (i !== j) {
            this.maps[i].sync(this.maps[j]);
          }
        }
      }
    },
    unsyncAllMaps() {
      this.needToSyncMapsAgain = true;
      for (let i = 0; i < nb_maps; i++) {
        for (let j = 0; j < nb_maps; j++) {
          if (i !== j) {
            this.maps[i].unsync(this.maps[j]);
          }
        }
      }
    },
    mapsZoomedEnd() {
      if (this.needToSyncMapsAgain) {
        this.syncAllMaps();
        this.needToSyncMapsAgain = false;
      }
      this.addOverlayImages();
      this.displayElementHighlight();
    },
    newLandmarkFocus() {
      this.removeOverlayImages();
      this.removeElementHighlight();
      this.unsyncAllMaps();
      for (let i = 0; i < nb_maps; i++) {
        this.maps[i].flyTo(
          this.landmarks[this.landmarkFocusId].center,
          this.landmarks[this.landmarkFocusId].zoom
        );
      }
    },
    clickMapVariableFocus() {
      this.$store.dispatch("switchMapVariableFocus", {
        newMapVariableFocusId: this.myMapVariableFocusId,
      });
    },
    changeDesignStrategyFocus1() {
      this.$store.dispatch("switchDesignStrategyFocus", {
        scenarioMapId: 0,
        newDesignStrategyFocusId: this.myDesignStrategiesFocusId[0],
      });
    },
    changeDesignStrategyFocus2() {
      this.$store.dispatch("switchDesignStrategyFocus", {
        scenarioMapId: 1,
        newDesignStrategyFocusId: this.myDesignStrategiesFocusId[1],
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#map0,
#map1,
#map2 {
  height: 300px;
}
</style>
