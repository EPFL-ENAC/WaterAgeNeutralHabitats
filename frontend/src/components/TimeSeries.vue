<template>
  <v-container>
    <v-card>
      <v-card-title> Time Series </v-card-title>
      <v-card-text>
        <v-chart
          class="chart"
          :option="timeSeriesPlotData"
          @highlight="highlight"
        />
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
  methods: {
    highlight(info) {
      try {
        const dataIndex = info.batch[0].dataIndex;
        this.$store.dispatch("switchDateFocus", { index: dataIndex });
      } catch (e) {
        // This happens when highlight is triggered by something
        // else than a date selection (like hover a legend item)
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart {
  height: 400px;
}
</style>
