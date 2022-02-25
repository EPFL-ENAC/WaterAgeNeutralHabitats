<template>
  <v-card>
    <v-card-title>
      Scatterplot (demo)
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
import InfoTooltip from "@/components/InfoTooltip";

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
      scatterPlotData: {},
    };
  },
  mounted() {
    this.fetchScatterplotData();
  },
  methods: {
    fetchScatterplotData() {
      axios
        .get(`/demoScatterplot.json`)
        .then((response) => {
          this.scatterPlotData = {
            color: ["#dd4444", "#fec42c", "#80F1BE"],
            legend: {
              top: 10,
              data: ["北京", "上海", "广州"],
              textStyle: {
                fontSize: 16,
              },
            },
            grid: {
              left: "10%",
              right: 150,
              top: "18%",
              bottom: "10%",
            },
            tooltip: {
              backgroundColor: "rgba(255,255,255,0.7)",
              formatter: function (param) {
                var value = param.value;
                return (
                  '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                  param.seriesName +
                  " " +
                  value[0] +
                  "日：" +
                  value[7] +
                  "</div>" +
                  "text1：" +
                  value[1] +
                  "<br>" +
                  "text2：" +
                  value[2] +
                  "<br>" +
                  "text3：" +
                  value[3] +
                  "<br>" +
                  "text4：" +
                  value[4] +
                  "<br>" +
                  "text5：" +
                  value[5] +
                  "<br>" +
                  "text6：" +
                  value[6] +
                  "<br>"
                );
              },
            },
            xAxis: {
              type: "value",
              name: "日期",
              nameGap: 16,
              nameTextStyle: {
                fontSize: 16,
              },
              max: 31,
              splitLine: {
                show: false,
              },
            },
            yAxis: {
              type: "value",
              name: "AQI指数",
              nameLocation: "end",
              nameGap: 20,
              nameTextStyle: {
                fontSize: 16,
              },
              splitLine: {
                show: false,
              },
            },
            visualMap: [
              {
                left: "right",
                top: "10%",
                dimension: 2,
                min: 0,
                max: 250,
                itemWidth: 30,
                itemHeight: 120,
                calculable: true,
                precision: 0.1,
                text: ["圆形大小：PM2.5"],
                textGap: 30,
                inRange: {
                  symbolSize: [10, 70],
                },
                outOfRange: {
                  symbolSize: [10, 70],
                  color: ["rgba(255, 255, 255, 0.4)"],
                },
                controller: {
                  inRange: {
                    color: ["#c23531"],
                  },
                  outOfRange: {
                    color: ["#999"],
                  },
                },
              },
              {
                left: "right",
                bottom: "5%",
                dimension: 6,
                min: 0,
                max: 50,
                itemHeight: 120,
                text: ["明暗：二氧化硫"],
                textGap: 30,
                inRange: {
                  colorLightness: [0.9, 0.5],
                },
                outOfRange: {
                  color: ["rgba(255, 255, 255, 0.4)"],
                },
                controller: {
                  inRange: {
                    color: ["#c23531"],
                  },
                  outOfRange: {
                    color: ["#999"],
                  },
                },
              },
            ],
            series: response.data.series,
          };

          response.data;
        })
        .catch((error) => {
          console.error(error);
        });
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
