<template>
  <v-container>
    <v-chart class="chart" :option="colormaps[mapVariable]" autoresize />
  </v-container>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { VisualMapComponent } from "echarts/components";
import VChart from "vue-echarts";
import { mapState } from "vuex";

use([CanvasRenderer, VisualMapComponent]);

export default {
  name: "Colormap",
  components: {
    VChart,
  },
  data() {
    return {};
  },
  props: ["mapVariable"],
  watch: {
    mapVariable: {
      handler() {
        this.$store.dispatch("fetchColormap", {
          mapVariable: this.mapVariable,
        });
      },
    },
  },
  mounted() {
    this.$store.dispatch("fetchColormap", {
      mapVariable: this.mapVariable,
    });
  },
  computed: {
    ...mapState({
      colormaps: "colormaps",
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart {
  height: 15vh;
}
</style>
