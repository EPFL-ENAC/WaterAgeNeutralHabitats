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

export default {
  name: "Maps",
  data() {
    return {
      tilesUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 14,
    };
  },
  computed: {
    ...mapState({
      landmarks: "landmarks",
      landmarkFocusId: "landmarkFocusId",
    }),
  },
  mounted() {
    const nb_maps = 3;
    const maps = new Array(nb_maps).fill().map((_val, index) =>
      L.map(`map${index}`, {
        layers: [
          L.tileLayer(this.tilesUrl, {
            attribution: this.attribution,
          }),
        ],
        center: this.landmarks[this.landmarkFocusId].center,
        zoom: this.zoom,
      })
    );
    for (let i = 0; i < nb_maps; i++) {
      for (let j = 0; j < nb_maps; j++) {
        if (i !== j) {
          maps[i].sync(maps[j]);
        }
      }
    }

    L.imageOverlay(
      this.landmarks[this.landmarkFocusId].overlayImage,
      this.landmarks[this.landmarkFocusId].latLngBounds
    ).addTo(maps[0]);
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
