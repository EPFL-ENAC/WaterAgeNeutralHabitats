<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-card-title> Baseline </v-card-title>
            <div id="map0" />
            <v-spacer />
            <v-slider
              dense
              v-model="opacity"
              label="opacity"
              min="0"
              max="100"
              @change="changeOpacity"
            />
          </v-col>

          <v-col cols="3">
            <v-card-title> Scenario R1 </v-card-title>
            <div id="map1" />
            <v-card-subtitle>
              Design strategy R1 selection to put here
            </v-card-subtitle>
          </v-col>

          <v-col cols="3">
            <v-card-title> Scenario R2 </v-card-title>
            <div id="map2" />
            <v-card-subtitle>
              Design strategy R2 selection to put here
            </v-card-subtitle>
          </v-col>

          <v-col cols="3">
            <v-card-title> Select maps </v-card-title>
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
              </v-card-text>
            </v-card>
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

const nb_maps = 3;

export default {
  name: "Maps",
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
    };
  },
  computed: {
    ...mapState({
      landmarks: "landmarks",
      landmarkFocusId: "landmarkFocusId",
      overlayImagesFilepaths: "overlayImagesFilepaths",
      mapVariables: "mapVariables",
    }),
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
    this.syncAllMaps();
    eventBus.$on("newLandmarkFocus", () => {
      this.newLandmarkFocus();
    });

    for (let i = 0; i < nb_maps; i++) {
      this.maps[i].on("zoomend", this.mapsZoomedEnd);
    }

    eventBus.$on("newOverlayImages", () => {
      if (this.overlayImages[0] !== null) {
        // at init, no need to removeOverlayImages
        this.removeOverlayImages();
      }
      this.addOverlayImages();
    });

    this.$store.dispatch("init");
    this.myMapVariableFocusId = this.mapVariableFocusId;
  },
  beforeDestroy() {
    eventBus.$off("newLandmarkFocus");
    eventBus.$off("newOverlayImages");
    this.maps[0].off("zoomend");
  },
  methods: {
    addOverlayImages() {
      for (let i = 0; i < nb_maps; i++) {
        this.overlayImages[i] = L.imageOverlay(
          this.overlayImagesFilepaths[i],
          this.landmarks[this.landmarkFocusId].latLngBounds
        );
        this.overlayImages[i].addTo(this.maps[i]);
      }
    },
    removeOverlayImages() {
      for (let i = 0; i < nb_maps; i++) {
        this.overlayImages[i].remove(this.maps[i]);
      }
    },
    changeOpacity() {
      for (let i = 0; i < nb_maps; i++) {
        this.overlayImages[i].setStyle({
          opacity: this.opacity / 100,
        });
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
