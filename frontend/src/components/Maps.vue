<template>
  <v-card flat>
    <MapsHeader />
    <v-row>
      <v-col cols="4">
        <v-card flat>
          <div id="map0" />
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card flat>
          <div id="map1" />
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card flat>
          <div id="map2" />
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import L from "leaflet";
require("leaflet.sync");
const axios = require("axios");
import { mapState } from "vuex";
import { LANDMARKS, URLS, ELEMENTS_HIGHLIGHT_LIST } from "@/utils/app";
import MapsHeader from "@/components/MapsHeader";

const nb_maps = 3;

export default {
  name: "Maps",
  components: {
    MapsHeader,
  },
  data() {
    return {
      attribution: "Tiles &copy; Esri",
      maps: [],
      overlayImages: [null, null, null],
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
      currentElementHighlightLayer: null,
    };
  },
  computed: {
    ...mapState({
      landmarkFocusId: "landmarkFocusId",
      mapVariableFocusId: "mapVariableFocusId",
      designStrategiesFocusId: "designStrategiesFocusId",
      dayFocus: "dayFocus",
      overlayOpacity: "overlayOpacity",
      elementHighlightFocusId: "elementHighlightFocusId",
    }),
  },
  mounted() {
    this.maps = new Array(nb_maps).fill().map((_val, index) =>
      L.map(`map${index}`, {
        layers: [
          L.tileLayer(URLS.tiles, {
            attribution: this.attribution,
          }),
        ],
        center: LANDMARKS[this.landmarkFocusId].center,
        zoom: LANDMARKS[this.landmarkFocusId].zoom,
      })
    );

    // Display river & watershed on map2
    URLS.PankeGeojsons.map((url) => this.displayVectorData(url));

    this.syncAllMaps();

    this.maps[0].on("zoomend", this.mapsZoomedEnd);

    this.fetchElementHighlights();
  },
  beforeDestroy() {
    this.maps[0].off("zoomend");
  },
  watch: {
    landmarkFocusId: {
      handler() {
        this.newLandmarkFocus();
        this.addOverlayImages();
      },
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
    fetchElementHighlights() {
      Object.entries(this.elementHighlightJSONData).forEach(([landmark]) => {
        axios
          .get(URLS.elementsGeojson(landmark))
          .then((response) => {
            this.elementHighlightJSONData[landmark] = response.data;
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
          this.elementHighlightJSONData[LANDMARKS[this.landmarkFocusId].dbName],
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
      const designStrategy =
        mapId === 0 ? 0 : this.designStrategiesFocusId[mapId - 1];
      const overlayImageURL = URLS.overlayImage(
        this.landmarkFocusId,
        designStrategy,
        mapId,
        this.mapVariableFocusId,
        this.dayFocus
      );
      const imageLayer = L.imageOverlay(
        overlayImageURL,
        LANDMARKS[this.landmarkFocusId].latLngBounds
      );
      imageLayer.once("load", () => {
        imageLayer.setStyle({
          opacity: this.overlayOpacity / 100,
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
    changeOverlayOpacity() {
      for (let i = 0; i < nb_maps; i++) {
        if (this.overlayImages[i] !== null) {
          this.overlayImages[i].setStyle({
            opacity: this.overlayOpacity / 100,
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
          LANDMARKS[this.landmarkFocusId].center,
          LANDMARKS[this.landmarkFocusId].zoom
        );
      }
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
