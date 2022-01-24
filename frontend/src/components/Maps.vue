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

export default {
  name: "Maps",
  data() {
    return {
      tilesUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 14,
      landmarkFocusId: 0,
      landmarks: [
        {
          name: "Slab",
          center: [52.57, 13.43],
          latLngBounds: [
            [52.58092793, 13.42544291],
            [52.57870542, 13.42923484],
          ],
          overlayImage: "/data/Slabs.jpg",
        },
        {
          name: "Single Family Housing",
          center: [52.58, 13.41],
          latLngBounds: [
            [52.58584282, 13.41209156],
            [52.58361934, 13.41587954],
          ],
          overlayImage: "/data/SingleFamilyHousing.jpg", // TODO
        },
        {
          name: "Industry",
          center: [52.59, 13.42],
          latLngBounds: [
            [52.58903163, 13.41516811],
            [52.5868145, 13.41897867],
          ],
          overlayImage: "/data/Industry.jpg", // TODO
        },
        {
          name: "Open Blocks",
          center: [52.57, 13.43],
          latLngBounds: [
            [52.56988753, 13.42301827],
            [52.56766182, 13.42682032],
          ],
          overlayImage: "/data/OpenBlocks.jpg", // TODO
        },
      ],
    };
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
