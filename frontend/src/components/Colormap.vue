<template>
  <v-container>
    <v-chart class="chart" :option="colormaps[mapVariable]" autoresize />
  </v-container>
</template>

<script>
const axios = require("axios");
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { VisualMapComponent } from "echarts/components";
import VChart from "vue-echarts";
import { URLS } from "@/utils/app";

use([CanvasRenderer, VisualMapComponent]);

export default {
  name: "Colormap",
  components: {
    VChart,
  },
  data() {
    return {
      colormaps: {},
    };
  },
  props: ["mapVariable"],
  watch: {
    mapVariable: {
      handler() {
        this.fetchColormap();
      },
    },
  },
  mounted() {
    this.fetchColormap();
  },
  methods: {
    fetchColormap() {
      if (this.colormaps[this.mapVariable] === undefined) {
        const url = URLS.colormap(this.mapVariable);
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
            this.colormaps = {
              ...this.colormaps,
              [this.mapVariable]: data,
            };
          })
          .catch((error) => {
            console.log("Error", { error });
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart {
  height: 28px;
}
</style>
