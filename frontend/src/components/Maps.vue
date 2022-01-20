<template>
  <v-container>
    <v-card>
      <v-card-title> Linked maps </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="5">
            <div id="map1" />
          </v-col>

          <v-col cols="5">
            <div id="map2" />
          </v-col>

          <v-col cols="2">
            <v-card>
              <v-card-title> Map controls </v-card-title>
              <v-card-text> to come here... </v-card-text>
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

export default {
  name: "MapsVanilla",
  data() {
    return {
      tilesUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 14,
      centerSlabs: [52.57, 13.43],
      centerSingleFamilyHousing:[52.58, 13.41],
      centerOpenBlocks: [52.57, 13.43],
      centerIndustry:[52.59, 13.42],
      //center: [52.5, 13.3],
    };
  },
  mounted() {
    const maps = new Array(2).fill().map((_val, index) =>
      L.map(`map${index + 1}`, {
        layers: [
          L.tileLayer(this.tilesUrl, {
            attribution: this.attribution,
          }),
        ],
        center: this.centerIndustry,
        zoom: this.zoom,
      })
    );
    maps[0].sync(maps[1]);
    maps[1].sync(maps[0]);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#map1,
#map2 {
  height: 300px;
}
</style>
