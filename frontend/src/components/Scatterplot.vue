<template>
  <v-card>
    <v-card-title>
      Runoff vs permeable area
      <v-spacer />
      <InfoTooltipScatter />
    </v-card-title>
    <div class="d-flex align-center justify-center">
      <v-img
        src="/scatterplot_outline_legend.png"
        max-width="280"
        alt="outline legend"
      />
    </div>
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
import InfoTooltipScatter from "@/infos/InfoTooltipScatter";
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
    InfoTooltipScatter,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  data() {
    return {
      SCENARIOS,
      summaryFluxesData: {},
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
      deep: true,
    },
  },
  mounted() {
    this.fetchScatterplotData();
  },
  methods: {
    fetchScatterplotData() {
      const url = URLS.summaryFluxesData;
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
          this.summaryFluxesData = data;
          this.renderScatterplot();
        })
        .catch((error) => {
          console.log("Error", { error });
        });
    },
    renderScatterplot() {
      const focusColor = "#000000";
      const normalColor = "#aaaaaa";
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
          backgroundColor: "rgba(255,255,255,0.9)",
          formatter: function (param) {
            var value = param.value[2];
            return (
              `<div id="scatterplot_tooltip">${param.seriesName}</div>` +
              `map: ${value.scenario}<br>` +
              `strategy: ${DESIGN_STRATEGIES[value.designID].name}<br>` +
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
              `vegroof: ${value.vegroof}<br>` +
              `tot_perm: ${value.tot_perm}<br>`
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
        series: [2, 1, 0]
          .map((scenarioId) =>
            LANDMARKS.map((landmark) => ({
              name: landmark.name,
              type: "scatter",
              color: normalColor,
              itemStyle: {
                color: (value) => {
                  return this.isFocused(value.data) ? focusColor : normalColor;
                },
              },
              symbol: landmark.symbol[SCENARIOS[scenarioId].dbName],
              data: this.summaryFluxesData.serie
                .filter((row) => row.landmark === landmark.dbName)
                .filter((row) => row.scenario === SCENARIOS[scenarioId].dbName)
                .map((row) => [row.tot_perm, row.f_Q, row]),
            }))
          )
          .flat(),
      };
    },
    isFocused(value) {
      const data = value[2];
      if (data.landmark === LANDMARKS[this.landmarkFocusId].dbName) {
        if (data.scenario === "current") return true;
        if (
          data.scenario === "conservative" &&
          data.designID ===
            DESIGN_STRATEGIES[this.designStrategiesFocusId[1]].dbName
        )
          return true;
        if (
          data.scenario === "radical" &&
          data.designID ===
            DESIGN_STRATEGIES[this.designStrategiesFocusId[2]].dbName
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
  height: 400px;
}
</style>

<style lang="scss">
#scatterplot_tooltip {
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 18px;
  padding-bottom: 7px;
  margin-bottom: 7px;
}
ul li {
  display: inline;
}
ul img {
  height: 15px;
}
</style>
