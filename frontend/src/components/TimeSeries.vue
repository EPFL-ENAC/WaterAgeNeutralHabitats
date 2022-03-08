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
        @highlight="eChartsHighlight"
        @datazoom="eChartsDatazoom"
        autoresize
      />
    </v-card-text>
  </v-card>
</template>

<script>
const axios = require("axios");
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
import { LANDMARKS, DESIGN_STRATEGIES, URLS } from "@/utils/app";
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
    return {
      timeSeriesPlotData: {},
      keyDatesFetched: false,
      baselineDate: "",
      keyDates: [],
      keyPeriods: [],
    };
  },
  computed: {
    ...mapState({
      dayFocus: "dayFocus",
      landmarkFocusId: "landmarkFocusId",
      designStrategiesFocusId: "designStrategiesFocusId",
      modelSetup: "modelSetup",
    }),
  },
  watch: {
    landmarkFocusId: {
      handler() {
        this.fetchTimeSeries();
      },
    },
    designStrategiesFocusId: {
      handler() {
        this.fetchTimeSeries();
      },
    },
  },
  mounted() {
    this.fetchTimeSeries();
    this.fetchKeyDates();
  },
  methods: {
    fetchTimeSeries() {
      axios
        .get(
          URLS.timeseries(
            LANDMARKS[this.landmarkFocusId].dbName,
            DESIGN_STRATEGIES[this.designStrategiesFocusId[0]].dbName,
            this.modelSetup
          )
        )
        .then((response) => {
          const data = response.data;
          this.daysOffset = data[0].day;
          this.timeSeriesPlotData = {
            tooltip: {
              triggerOn: "click",
            },
            grid: [
              {
                // P
                left: 35,
                right: 20,
                height: "95",
              },
              {
                // Q
                left: 35,
                right: 20,
                height: "95",
                top: "155",
              },
              {
                // ET
                left: 35,
                right: 20,
                height: "95",
                top: "255",
              },
              {
                // L
                left: 35,
                right: 20,
                height: "95",
                top: "355",
              },
              {
                // S
                left: 35,
                right: 20,
                height: "95",
                top: "455",
              },
            ],
            axisPointer: {
              link: [
                {
                  xAxisIndex: "all",
                },
              ],
            },
            dataZoom: [
              {
                show: true,
                realtime: true,
                start: 0,
                end: 100,
                xAxisIndex: [0, 1, 2, 3, 4],
              },
            ],
            xAxis: [
              {
                data: data.map(function (item) {
                  return item.timestamp;
                }),
                axisPointer: {
                  snap: true,
                  type: "line",
                  triggerOn: "click",
                  lineStyle: {
                    color: "#7581BD",
                    width: 2,
                  },
                  label: {
                    show: false,
                  },
                  handle: {
                    show: true,
                    color: "#7581BD",
                    size: 20,
                    margin: 12,
                  },
                },
                show: false,
                nameLocation: "middle",
              },
              {
                data: data.map(function (item) {
                  return item.timestamp;
                }),
                axisPointer: {
                  snap: true,
                  type: "line",
                  triggerOn: "click",
                  lineStyle: {
                    color: "#7581BD",
                    width: 2,
                  },
                  label: {
                    show: false,
                  },
                  handle: {
                    show: true,
                    color: "#7581BD",
                    size: 20,
                    margin: 30,
                  },
                },
                gridIndex: 1,
                show: false,
              },
              {
                data: data.map(function (item) {
                  return item.timestamp;
                }),
                axisPointer: {
                  snap: true,
                  type: "line",
                  triggerOn: "click",
                  lineStyle: {
                    color: "#7581BD",
                    width: 2,
                  },
                  label: {
                    show: false,
                  },
                  handle: {
                    show: true,
                    color: "#7581BD",
                    size: 20,
                    margin: 30,
                  },
                },
                gridIndex: 2,
                show: false,
              },
              {
                data: data.map(function (item) {
                  return item.timestamp;
                }),
                axisPointer: {
                  snap: true,
                  type: "line",
                  triggerOn: "click",
                  lineStyle: {
                    color: "#7581BD",
                    width: 2,
                  },
                  label: {
                    show: false,
                  },
                  handle: {
                    show: true,
                    color: "#7581BD",
                    size: 20,
                    margin: 30,
                  },
                },
                gridIndex: 3,
                show: false,
              },
              {
                data: data.map(function (item) {
                  return item.timestamp;
                }),
                axisPointer: {
                  snap: true,
                  type: "line",
                  triggerOn: "click",
                  lineStyle: {
                    color: "#7581BD",
                    width: 2,
                  },
                  label: {
                    show: true,
                  },
                  handle: {
                    show: true,
                    color: "#7581BD",
                    size: 20,
                    margin: 30,
                  },
                },
                gridIndex: 4,
                show: true,
              },
            ],
            yAxis: [
              {
                min: 0,
              },
              {
                gridIndex: 1,
                inverse: true,
                min: 0,
              },
              {
                gridIndex: 2,
                inverse: true,
                min: 0,
              },
              {
                gridIndex: 3,
                inverse: true,
                min: 0,
              },
              {
                gridIndex: 4,
                inverse: true,
                min: 0,
              },
            ],
            toolbox: {
              right: 10,
              feature: {
                dataZoom: {
                  yAxisIndex: "none",
                },
                saveAsImage: {},
              },
            },
            legend: {
              show: true,
              data: ["P", "Q", "ET", "L", "S"],
            },
            series: [
              {
                name: "key moments",
                type: "line",
                color: "#635441",
                symbol: "none",
                data: [],
              },
              {
                name: "P",
                type: "line",
                color: "#635441",
                symbol: "none",
                data: data.map(function (item) {
                  return item.P;
                }),
              },
              {
                name: "key moments",
                type: "line",
                color: "#635441",
                symbol: "none",
                data: [],
                xAxisIndex: 1,
                yAxisIndex: 1,
              },
              {
                name: "Q",
                type: "line",
                color: "#4d7bb3",
                symbol: "none",
                data: data.map(function (item) {
                  return item.Q;
                }),
                xAxisIndex: 1,
                yAxisIndex: 1,
              },
              {
                name: "key moments",
                type: "line",
                color: "#635441",
                symbol: "none",
                data: [],
                xAxisIndex: 2,
                yAxisIndex: 2,
              },
              {
                name: "ET",
                type: "line",
                color: "green",
                symbol: "none",
                data: data.map(function (item) {
                  return item.ET;
                }),
                xAxisIndex: 2,
                yAxisIndex: 2,
              },
              {
                name: "key moments",
                type: "line",
                color: "#635441",
                symbol: "none",
                data: [],
                xAxisIndex: 3,
                yAxisIndex: 3,
              },
              {
                name: "L",
                type: "line",
                color: "#d9785f",
                symbol: "none",
                data: data.map(function (item) {
                  return item.L;
                }),
                xAxisIndex: 3,
                yAxisIndex: 3,
              },
              {
                name: "key moments",
                type: "line",
                color: "#635441",
                symbol: "none",
                data: [],
                xAxisIndex: 4,
                yAxisIndex: 4,
              },
              {
                name: "S",
                type: "line",
                color: "#4287f5",
                symbol: "none",
                data: data.map(function (item) {
                  return item.S;
                }),
                xAxisIndex: 4,
                yAxisIndex: 4,
              },
            ],
          };
          this.applyKeyDates();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchKeyDates() {
      if (!this.keyDatesFetched) {
        axios
          .get(URLS.keyDates)
          .then((response) => {
            const data = response.data;
            this.baselineDate = data.baselineDate;
            this.keyDates = data.keyDates;
            this.keyPeriods = data.keyPeriods;
            this.keyDatesFetched = true;
            this.applyKeyDates();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    applyKeyDates() {
      // set the baselineDate and
      // add keyDates & keyPeriods to eCharts graph
      if (
        !this.keyDatesFetched ||
        Object.keys(this.timeSeriesPlotData).length === 0
      )
        return;

      if (this.dayFocus === -1) {
        const baselineIndex = this.timeSeriesPlotData.xAxis[0].data.indexOf(
          this.baselineDate
        );
        if (baselineIndex === -1) {
          // no baselineDate requested : eCharts selects the last item by default
          this.storeNewDateFocusIndex(
            this.timeSeriesPlotData.series[1].data.length
          );
        } else {
          this.timeSeriesPlotData.xAxis[0].axisPointer.value =
            this.baselineDate;
          this.timeSeriesPlotData.xAxis[1].axisPointer.value =
            this.baselineDate;
          this.timeSeriesPlotData.xAxis[2].axisPointer.value =
            this.baselineDate;
          this.timeSeriesPlotData.xAxis[3].axisPointer.value =
            this.baselineDate;
          this.timeSeriesPlotData.xAxis[4].axisPointer.value =
            this.baselineDate;
          this.storeNewDateFocusIndex(baselineIndex);
        }
      }

      const keyMomentsSeriesIndex = [0, 2, 4, 6, 8];
      const symbols = [
        ["none", "arrow"],
        [],
        ["none", "none"],
        [],
        ["none", "none"],
        [],
        ["none", "none"],
        [],
        ["none", "none"],
      ];
      const show = [
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ];
      keyMomentsSeriesIndex.map((id) => {
        this.timeSeriesPlotData.series[id].markLine = {
          animation: false,
          symbol: symbols[id],
          label: {
            show: show[id],
            position: "end",
            rotate: 45,
            formatter: function (d) {
              return d.name;
            },
          },
          data: this.keyDates.map((keyDate) => {
            return {
              xAxis: keyDate.date,
              name: keyDate.label,
              itemStyle: { color: keyDate.color },
            };
          }),
        };
        this.timeSeriesPlotData.series[id].markArea = {
          label: {
            show: show[id],
            rotate: 45,
          },
          data: this.keyPeriods.map((keyPeriod) => {
            return [
              {
                name: keyPeriod.label,
                xAxis: keyPeriod.startDate,
                itemStyle: {
                  color: keyPeriod.color,
                },
              },
              { xAxis: keyPeriod.endDate },
            ];
          }),
        };
      });
      this.forceReloadChart();
    },
    forceReloadChart() {
      this.timeSeriesPlotData = { ...this.timeSeriesPlotData };
    },
    trimDateFocus(minIndex, maxIndex) {
      // happens when zooming in Timeseries.
      // if current dayFocus is before minIndex or after maxIndex
      // then change it to the nearest limit
      if (this.dayFocus < minIndex + this.daysOffset) {
        this.storeNewDateFocusIndex(minIndex);
      } else if (this.dayFocus > maxIndex + this.daysOffset) {
        this.storeNewDateFocusIndex(maxIndex);
      }
    },
    storeNewDateFocusIndex(dateIndex) {
      this.$store.dispatch("setNewDayFocus", {
        dayFocus: dateIndex + this.daysOffset,
      });
    },
    eChartsHighlight(info) {
      try {
        const dataIndex = info.batch[0].dataIndex;
        this.storeNewDateFocusIndex(dataIndex);
      } catch (e) {
        // This happens when highlight is triggered by something
        // else than a date selection (like hover a legend item)
      }
    },
    eChartsDatazoom(info) {
      if ("batch" in info) {
        // Zoom with zoom tool
        this.trimDateFocus(info.batch[0].startValue, info.batch[0].endValue);
      } else {
        // Zoom with dataZoom on the bottom
        const minIndex = Math.floor(
          (info.start * this.timeSeriesPlotData.series[1].data.length) / 100
        );
        const maxIndex = Math.floor(
          (info.end * this.timeSeriesPlotData.series[1].data.length) / 100
        );
        this.trimDateFocus(minIndex, maxIndex);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart {
  height: 600px;
}
</style>
