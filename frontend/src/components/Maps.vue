<template>
  <v-container>
    <v-card>
      <v-card-title> Linked maps </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <div id="map0" />
          </v-col>

          <v-col cols="4">
            <div id="map1" />
          </v-col>

          <v-col cols="4">
            <div id="map2" />
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
      needToSyncMapsAgain: false,
    };
  },
  computed: {
    ...mapState({
      landmarks: "landmarks",
      landmarkFocusId: "landmarkFocusId",
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
    eventBus.$on("centerToNewLandmarkFocus", () => {
      this.centerToNewLandmarkFocus();
    });
    this.maps[0].on("zoomend", this.mapsZoomedEnd);

    L.imageOverlay(
      this.landmarks[this.landmarkFocusId].overlayImage,
      this.landmarks[this.landmarkFocusId].latLngBounds
    ).addTo(this.maps[0]);
  },
  beforeDestroy() {
    eventBus.$off("centerToNewLandmarkFocus");
    this.maps[0].off("zoomend");
  },
  methods: {
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
    },
    centerToNewLandmarkFocus() {
      this.unsyncAllMaps();
      for (let i = 0; i < nb_maps; i++) {
        this.maps[i].flyTo(
          this.landmarks[this.landmarkFocusId].center,
          this.landmarks[this.landmarkFocusId].zoom
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
