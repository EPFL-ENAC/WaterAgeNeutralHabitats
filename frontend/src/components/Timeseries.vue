<template>
  <v-card>
    <v-card-title>
      Fluxes over time
      <v-spacer />
      <InfoTooltipTimeseries />
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
import InfoTooltipTimeseries from "@/infos/InfoTooltipTimeseries";
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
  name: "Timeseries",
  components: {
    VChart,
    InfoTooltipTimeseries,
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
      deep: true,
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
          this.timeSeriesPlotData = { ...timeseriesPlotDataSkel };

          timeseriesRowsSettings.map((timeseriesRowSettings, index) => {
            this.timeSeriesPlotData.xAxis[index].data = data.map((item) => ({
              value: item.timestamp,
              textStyle: index === 3 ? {} : { fontSize: 0 },
            }));
            this.timeSeriesPlotData.series[index * 2 + 1].data = data.map(
              (item) => item[timeseriesRowSettings.dataName]
            );
          });
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
        const baselineIndex = this.timeSeriesPlotData.xAxis[0].data
          .map((xAxisData) => xAxisData.value)
          .indexOf(this.baselineDate);
        if (baselineIndex === -1) {
          // no baselineDate requested : eCharts selects the last item by default
          this.storeNewDateFocusIndex(
            this.timeSeriesPlotData.series[1].data.length
          );
        } else {
          this.timeSeriesPlotData.xAxis.map((xAxis) => {
            xAxis.axisPointer.value = this.baselineDate;
          });
          this.storeNewDateFocusIndex(baselineIndex);
        }
      }

      const keyMomentsSeriesIndex = [0, 2, 4, 6];
      const symbols = [
        ["none", "arrow"],
        [],
        ["none", "none"],
        [],
        ["none", "none"],
        [],
        ["none", "none"],
      ];
      const show = [true, false, false, false, false, false, false];
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

const timeseriesRowHeight = 70;
const timeseriesOffset = 50;
const timeseriesRowOffset = 12;
const timeseriesRowsSettings = [
  {
    dataName: "Q",
    color: "#4d7bb3",
    yInverse: false,
  },
  {
    dataName: "ET",
    color: "green",
    yInverse: false,
  },
  {
    dataName: "L",
    color: "#d9785f",
    yInverse: false,
  },
  {
    dataName: "P",
    color: "#635441",
    yInverse: true,
  },
];

const timeseriesPlotDataSkel = {
  tooltip: {
    triggerOn: "click",
  },
  grid: timeseriesRowsSettings.map((_timeseriesRowSettings, index) => ({
    left: 35,
    right: 20,
    height: timeseriesRowHeight,
    top: index * (timeseriesRowHeight + timeseriesRowOffset) + timeseriesOffset,
  })),
  axisPointer: {
    link: [
      {
        xAxisIndex: "all",
      },
    ],
  },
  dataZoom: [
    {
      show: false,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1, 2, 3],
    },
  ],
  xAxis: Array(4)
    .fill()
    .map((_val, index) => ({
      data: [], // timestamps to be injected here
      axisPointer: {
        snap: true,
        type: "line",
        triggerOn: "click",
        lineStyle: {
          color: "#7581BD",
          width: 2,
        },
        show: true,
        label: {
          show: false,
        },
        handle: {
          show: true,
          color: "#7581BD",
          size: index === 3 ? 20 : 0,
          margin: 30,
        },
      },
      gridIndex: index,
      show: true,
      nameLocation: "middle",
    })),
  yAxis: Array(4)
    .fill()
    .map((_val, index) => ({
      min: 0,
      inverse: timeseriesRowsSettings[index].yInverse,
      gridIndex: index,
    })),
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
    data: timeseriesRowsSettings.map(
      (timeseriesRowSettings) => timeseriesRowSettings.dataName
    ),
  },
  series: timeseriesRowsSettings
    .map((timeseriesRowSettings, index) => [
      {
        name: "key moments",
        type: "line",
        symbol: "none",
        data: [],
        xAxisIndex: index,
        yAxisIndex: index,
      },
      {
        name: timeseriesRowSettings.dataName,
        type: "line",
        color: timeseriesRowSettings.color,
        symbol: "none",
        data: [], // item.XYZ to be injected here
        xAxisIndex: index,
        yAxisIndex: index,
      },
    ])
    .flat(),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart {
  height: 410px;
}
</style>
