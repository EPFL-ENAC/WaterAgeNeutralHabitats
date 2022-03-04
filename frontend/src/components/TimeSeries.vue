<template>
  <v-card>
    <v-card-title>
      Timeseries
      <v-spacer />
      <info-tooltip>
        Here are displayed the timeseries of:
        <ul>
          <li>
            <b>P</b> : (cumulative precipitation, units of millimeters [mm])
            Note: this is not simulated, but it is a useful reference to display
          </li>
          <li><b>ET</b> : (cumulative flux value, mm)</li>
          <li><b>Q</b> : (cumulative flux value, mm)</li>
          <li><b>L</b> : (cumulative flux value, mm)</li>
          <li><b>S</b> : (water stored in the rooting zone, mm)</li>
        </ul>

        The dry period are highlighted in light yellow; the peak rains in dark
        blue.

        <h3>Key Functionalities</h3>
        <ul>
          <li>
            Shift the selected date to update the maps to this specific date
          </li>
          <li>Click on the legend to turn timeseries on/off</li>
          <li>
            Zoom in the chart with the zoom buttons in the upper right corner
          </li>
          <li>
            Download the chart as an image with the download button in the upper
            right corner
          </li>
        </ul>
      </info-tooltip>
    </v-card-title>
    <v-card-text>
      <v-chart
        class="chart"
        :option="timeSeriesPlotData"
        @highlight="highlight"
        @datazoom="datazoom"
        autoresize
      />
    </v-card-text>
  </v-card>
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
  MarkLineComponent,
  MarkAreaComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { mapState } from "vuex";
import InfoTooltip from "@/components/InfoTooltip";
use([
  CanvasRenderer,
  LineChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  DataZoomComponent,
  MarkLineComponent,
  MarkAreaComponent,
]);

export default {
  name: "TimeSeries",
  components: {
    VChart,
    InfoTooltip,
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
    datazoom(info) {
      if ("batch" in info) {
        // Zoom with zoom tool
        this.$store.dispatch("trimDateFocus", {
          minIndex: info.batch[0].startValue,
          maxIndex: info.batch[0].endValue,
        });
      } else {
        // Zoom with dataZoom on the bottom
        this.$store.dispatch("trimDateFocus", {
          minIndex:
            (info.start * this.timeSeriesPlotData.series[1].data.length) / 100,
          maxIndex:
            (info.end * this.timeSeriesPlotData.series[1].data.length) / 100,
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart {
  height: 500px;
}
</style>
