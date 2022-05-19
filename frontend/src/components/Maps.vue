<template>
  <v-card class="ma-5" flat>
    <MapsHeader />
    <v-row>
      <v-col v-for="id in nbMaps" :key="id" cols="4">
        <v-responsive aspect-ratio="1">
          <div :id="`map${id - 1}`" class="oneLeafletMap" />
        </v-responsive>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import L from "leaflet";
require("leaflet.sync");
const axios = require("axios");
import { mapState } from "vuex";
import { LANDMARKS, URLS, TILES, ELEMENTS_HIGHLIGHT_LIST } from "@/utils/app";
import MapsHeader from "@/components/MapsHeader";

export default {
  name: "Maps",
  components: {
    MapsHeader,
  },
  data() {
    return {
      maps: [],
      overlayImages: [], // set in mounted
      needToSyncMapsAgain: false,

      waterBlue: "#7db1f5",
      geojsonData: {},

      highlightColor: "#b3142b",
      elementHighlightJSONData: {
        // set in fetchElementHighlights
        Slabs: {},
        SingleFamilyHousing: {},
        Industry: {},
        OpenBlocks: {},
      },
      currentElementHighlightLayers: [],
    };
  },
  props: {
    landmarksIds: {
      type: Array,
      required: true,
    },
    withPankeGeojsons: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      mapVariableFocusId: "mapVariableFocusId",
      designStrategiesFocusId: "designStrategiesFocusId",
      dayFocus: "dayFocus",
      overlayOpacity: "overlayOpacity",
      elementHighlightFocusId: "elementHighlightFocusId",
    }),
    nbMaps() {
      return this.landmarksIds.length * 3;
    },
  },
  mounted() {
    this.overlayImages = new Array(this.nbMaps).fill().map(() => null);
    this.fetchElementHighlights();

    this.maps = new Array(this.nbMaps).fill().map((_val, index) => {
      return L.map(`map${index}`, {
        layers: [
          L.tileLayer(TILES.default.url, {
            attribution: TILES.default.attribution,
          }),
        ],
        center: LANDMARKS[this.mapId2landmarkId(index)].center,
        zoom: LANDMARKS[this.mapId2landmarkId(index)].zoom,
        zoomControl: index === 0,
        attributionControl: index === 2,
      });
    });

    this.addOverlayImages();

    if (this.withPankeGeojsons) {
      // Display river & watershed on map2
      this.displayVectorData(URLS.pankePankowWatershedGeojson);
      this.displayVectorData(URLS.pankeRiverGeojson);
    }

    this.syncMapsBy3();

    this.maps[0].on("zoomend", this.mapsZoomedEnd);
  },
  beforeDestroy() {
    this.maps[0].off("zoomend");
  },
  watch: {
    landmarksIds: {
      handler() {
        this.newLandmarkFocus();
        this.addOverlayImages();
      },
      deep: true,
    },
    designStrategiesFocusId: {
      handler() {
        this.addOverlayImages();
      },
      deep: true,
    },
    mapVariableFocusId: {
      handler() {
        this.addOverlayImages();
      },
    },
    dayFocus: {
      handler() {
        this.addOverlayImages();
      },
    },
    overlayOpacity: {
      handler() {
        this.changeOverlayOpacity();
      },
    },
    elementHighlightFocusId: {
      handler() {
        this.displayElementHighlight();
      },
    },
  },
  methods: {
    mapId2landmarkId(mapId) {
      return this.landmarksIds[Math.floor(mapId / 3)];
    },
    fetchElementHighlights() {
      Object.entries(this.elementHighlightJSONData).forEach(([landmark]) => {
        const url = URLS.elementsGeojson(landmark);
        axios
          .get(url)
          .then((response) => {
            if (response.data instanceof Object) {
              return response.data;
            } else {
              throw new Error("Error parsing data received from " + url);
            }
          })
          .then((data) => {
            this.elementHighlightJSONData[landmark] = data;
          })
          .catch((error) => {
            console.log("Error", { error });
          });
      });
    },
    displayElementHighlight() {
      this.removeElementHighlight();

      if (this.elementHighlightFocusId !== 0) {
        this.currentElementHighlightLayers = this.maps.map((map, index) => {
          const newLayer = L.geoJSON(
            this.elementHighlightJSONData[
              LANDMARKS[this.mapId2landmarkId(index)].dbName
            ],
            {
              filter: (feature) => {
                return (
                  feature.properties.Layer ==
                  ELEMENTS_HIGHLIGHT_LIST[this.elementHighlightFocusId].dbName
                );
              },
              style: {
                color: this.highlightColor,
                fillOpacity: 0,
              },
            }
          );
          newLayer.addTo(map);
          return newLayer;
        });
      }
    },
    removeElementHighlight() {
      if (this.currentElementHighlightLayers.length !== 0) {
        this.currentElementHighlightLayers.map((layer, index) => {
          this.maps[index].removeLayer(layer);
        });
      }
      this.currentElementHighlightLayers = [];
    },
    displayVectorData(geojsonFilepath) {
      // display vector data on map[0]
      const url = geojsonFilepath;
      axios
        .get(url)
        .then((response) => {
          if (response.data instanceof Object) {
            return response.data;
          } else {
            throw new Error("Error parsing data received from " + url);
          }
        })
        .then((data) => {
          this.geojsonData[geojsonFilepath] = data;
          // Display on map2
          L.geoJSON(this.geojsonData[geojsonFilepath], {
            style: {
              color: this.waterBlue,
              fillColor: this.waterBlue,
              fillOpacity: 0.6,
            },
          }).addTo(this.maps[0]);
        })
        .catch((error) => {
          console.log("Error", { error });
        });
    },
    addOverlayImage(mapId) {
      const designStrategy = this.designStrategiesFocusId[mapId % 3];
      const overlayImageURL = URLS.overlayImage(
        this.mapId2landmarkId(mapId),
        designStrategy,
        this.mapVariableFocusId,
        this.dayFocus
      );
      const imageLayer = L.imageOverlay(
        overlayImageURL,
        LANDMARKS[this.mapId2landmarkId(mapId)].latLngBounds
      );
      imageLayer.once("load", () => {
        imageLayer.setStyle({
          opacity: this.overlayOpacity / 100,
        });
        imageLayer.addTo(this.maps[mapId]);
        this.removeOverlayImage(mapId);
        this.overlayImages[mapId] = imageLayer;
      });
      imageLayer.on("error", () => {
        this.removeOverlayImage(mapId);
      });
      imageLayer._initImage();
    },
    addOverlayImages() {
      if (this.dayFocus)
        for (let mapId = 0; mapId < this.nbMaps; mapId++) {
          this.addOverlayImage(mapId);
        }
    },
    removeOverlayImage(mapId) {
      if (this.overlayImages[mapId] !== null) {
        this.overlayImages[mapId].remove(this.maps[mapId]);
      }
    },
    removeOverlayImages() {
      for (let i = 0; i < this.nbMaps; i++) {
        this.removeOverlayImage(i);
      }
    },
    changeOverlayOpacity() {
      for (let i = 0; i < this.nbMaps; i++) {
        if (this.overlayImages[i] !== null) {
          this.overlayImages[i].setStyle({
            opacity: this.overlayOpacity / 100,
          });
        }
      }
    },
    syncMapsBy3() {
      for (let idStart = 0; idStart < this.landmarksIds.length; idStart++) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (i !== j) {
              this.maps[idStart * 3 + i].sync(this.maps[idStart * 3 + j]);
            }
          }
        }
      }
    },
    unsyncAllMaps() {
      this.needToSyncMapsAgain = true;
      for (let idStart = 0; idStart < this.landmarksIds.length; idStart++) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (i !== j) {
              this.maps[idStart * 3 + i].unsync(this.maps[idStart * 3 + j]);
            }
          }
        }
      }
    },
    mapsZoomedEnd() {
      if (this.needToSyncMapsAgain) {
        this.syncMapsBy3();
        this.needToSyncMapsAgain = false;
      }
      this.addOverlayImages();
      this.displayElementHighlight();
    },
    newLandmarkFocus() {
      this.removeOverlayImages();
      this.removeElementHighlight();
      this.unsyncAllMaps();
      for (let i = 0; i < this.nbMaps; i++) {
        this.maps[i].flyTo(
          LANDMARKS[this.landmarksIds[0]].center,
          LANDMARKS[this.landmarksIds[0]].zoom
        );
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.oneLeafletMap {
  z-index: 0;
  height: 100%;
}
</style>
