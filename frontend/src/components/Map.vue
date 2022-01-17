<template>
  <v-container>
    This is the map
    <l-map style="height: 300px" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-tile-layer :url="sampleTilesSetURL" :attribution="attribution" />
      <l-geo-json :geojson="geojsonFeatureCollection" />
      <!-- <l-marker :lat-lng="markerLatLng"></l-marker> -->
    </l-map>
  </v-container>
</template>

<script>
// import L from "leaflet";
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet"; // LMarker
import { Icon } from "leaflet";

// Workaround to make Marker Icons work, as documented here
// https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    // LMarker,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      sampleTilesSetURL:
        "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_MAP/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 8,
      center: [52.5, 13.3],
      geojsonFeatureCollection: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              DN: 0,
            },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [393313.31142099999124, 5826818.1138599999249],
                  [393313.31142099999124, 5826566.1138599999249],
                  [393565.31142099999124, 5826566.1138599999249],
                  [393565.31142099999124, 5826818.1138599999249],
                  [393313.31142099999124, 5826818.1138599999249],
                ],
              ],
            },
          },
        ],
      },
      // markerLatLng: [51.504, -0.159],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
