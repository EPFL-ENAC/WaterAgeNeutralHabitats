<template>
  <v-card>
    <v-card-title>
      Runoff vs permeable area
      <v-spacer />
      <info-tooltip>
        Here are displayed info about that Scatterplot
      </info-tooltip>
    </v-card-title>
    <v-chart class="chart" :option="scatterPlotData" autoresize />
  </v-card>
</template>

<script>
const axios = require("axios");
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { ScatterChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { mapState } from "vuex";
import InfoTooltip from "@/components/InfoTooltip";
import { SCENARIOS, DESIGN_STRATEGIES, LANDMARKS, URLS } from "@/utils/app";

use([
  CanvasRenderer,
  ScatterChart,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent,
]);

export default {
  name: "Scatterplot",
  components: {
    VChart,
    InfoTooltip,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  data() {
    return {
      SCENARIOS,
      summaryFluxesResponse: {},
      scatterPlotData: {},
    };
  },
  computed: {
    ...mapState({
      landmarkFocusId: "landmarkFocusId",
      designStrategiesFocusId: "designStrategiesFocusId",
    }),
  },
  watch: {
    landmarkFocusId: {
      handler() {
        this.renderScatterplot();
      },
    },
    designStrategiesFocusId: {
      handler() {
        this.renderScatterplot();
      },
    },
  },
  mounted() {
    this.fetchScatterplotData();
  },
  methods: {
    fetchScatterplotData() {
      axios
        .get(URLS.summaryFluxesData)
        .then((response) => {
          this.summaryFluxesResponse = response;
          this.renderScatterplot();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    renderScatterplot() {
      this.scatterPlotData = {
        legend: {
          top: 10,
          data: LANDMARKS.map((landmark) => landmark.name),
        },
        grid: {
          left: "15%",
          right: "15%",
          top: "20%",
          bottom: "15%",
        },
        tooltip: {
          backgroundColor: "rgba(255,255,255,0.7)",
          formatter: function (param) {
            var value = param.value[2];
            return (
              `<div id="scatterplot_tooltip">${param.seriesName}</div>` +
              `scenario: ${value.scenario}<br>` +
              `designID: ${value.designID}<br>` +
              `tot_P: ${value.tot_P}<br>` +
              `tot_Q: ${value.tot_Q}<br>` +
              `tot_ET: ${value.tot_ET}<br>` +
              `tot_L: ${value.tot_L}<br>` +
              `f_Q: ${value.f_Q}<br>` +
              `f_ET: ${value.f_ET}<br>` +
              `f_L: ${value.f_L}<br>` +
              `asphalt: ${value.asphalt}<br>` +
              `building: ${value.building}<br>` +
              `grass: ${value.grass}<br>` +
              `gravel: ${value.gravel}<br>` +
              `pavement: ${value.pavement}<br>` +
              `shrub: ${value.shrub}<br>` +
              `trees: ${value.trees}<br>` +
              `tot_permeable: ${value.tot_permeable}<br>` +
              `tot_Q_by_tot_P: ${value.tot_Q_by_tot_P}<br>`
            );
          },
        },
        xAxis: {
          type: "value",
          name: "tot fraction of 'Permeable' area [-]",
          nameLocation: "end",
          nameTextStyle: {
            align: "right",
            verticalAlign: "top",
            padding: [30, 0, 0, 0],
          },
        },
        yAxis: {
          type: "value",
          name: "tot Q / tot P [-]",
          nameLocation: "end",
        },
        toolbox: {
          top: 30,
          right: 15,
          feature: {
            dataZoom: {},
            saveAsImage: {},
          },
        },
        series: [1, 0]
          .map((scenario) =>
            LANDMARKS.map((landmark) => ({
              name: landmark.name,
              type: "scatter",
              color: SCENARIOS[scenario].color,
              symbol: landmark.symbol,
              symbolSize: (value) => {
                return this.isFocused(value) ? 20 : 10;
              },
              data: this.summaryFluxesResponse.data.serie
                .filter((row) => row.landmark === landmark.dbName)
                .filter((row) => row.scenario === SCENARIOS[scenario].dbName)
                .map((row) => [row.tot_permeable, row.tot_Q_by_tot_P, row]),
            }))
          )
          .flat(),
      };
    },
    isFocused(value) {
      const data = value[2];
      if (data.landmark === LANDMARKS[this.landmarkFocusId].dbName) {
        if (data.scenario === "0") return true;
        if (
          data.scenario === "R1" &&
          data.designID ===
            DESIGN_STRATEGIES[this.designStrategiesFocusId[0]].dbName
        )
          return true;
        if (
          data.scenario === "R2" &&
          data.designID ===
            DESIGN_STRATEGIES[this.designStrategiesFocusId[1]].dbName
        )
          return true;
      }
      return false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart {
  height: 35vh;
}
</style>

<style lang="scss">
#scatterplot_tooltip {
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 18px;
  padding-bottom: 7px;
  margin-bottom: 7px;
}
</style>
