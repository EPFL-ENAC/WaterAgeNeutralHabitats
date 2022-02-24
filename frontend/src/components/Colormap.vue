<template>
  <v-container>
    <v-chart class="chart" :option="colormaps[mapVariable]" autoresize />
  </v-container>
</template>

<script>
import VChart from "vue-echarts";
import { mapState } from "vuex";

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
