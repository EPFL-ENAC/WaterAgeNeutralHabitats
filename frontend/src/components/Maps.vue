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
          </v-col>

          <v-col cols="3">
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
          </v-col>

          <v-col cols="3">
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
          </v-col>

          <v-col cols="3">
            <v-card-title> Map variable </v-card-title>
            <v-card flat>
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
                <colormap :map-variable="mapVariableName" />
              </v-card-text>
            </v-card>

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
import { mapState } from "vuex";
import { eventBus } from "@/main";
import InfoTooltip from "@/components/InfoTooltip";
const axios = require("axios");
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

      geojsonData: {},
      waterBlue: "#7db1f5",
      legendSparklineValue: [0, 2, 0, 1, 3, 0, 2, 3, 0],
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
    this.displayVectorData("data/PankeRiver.geojson");
    this.displayVectorData("data/PankePankowWatershed.geojson");
    this.displayVectorData("data/SubcatchmentOutline.geojson");

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
    },
    newLandmarkFocus() {
      this.removeOverlayImages();
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
