<template>
  <v-container>
    <v-card>
      <v-card-title> Time Series </v-card-title>
      <v-card-text>
        <v-chart class="chart" :option="timeSeriesPlotData" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { mapState } from "vuex";

use([
  CanvasRenderer,
  LineChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
]);

export default {
  name: "TimeSeries",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      timeSeriesPlotData: "timeSeriesPlotData",
    }),
  },
  mounted() {
    this.$store.dispatch("fetchTimeSeriesPlotData");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart {
  height: 400px;
}
</style>
