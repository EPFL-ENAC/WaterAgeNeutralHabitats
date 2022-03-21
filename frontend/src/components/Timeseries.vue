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
import { URLS } from "@/utils/app";
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
      modelSetups: "modelSetups",
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
      this.timeSeriesPlotData = {}; // Clear Timeseries

      this.modelSetups.map((modelSetup, modelSetupId) => {
        axios
          .get(
            URLS.timeseries(
              this.landmarkFocusId,
              this.designStrategiesFocusId[0],
              modelSetupId
            )
          )
          .then((response) => {
            const data = response.data;
            this.daysOffset = data[0].day;
            if (!("series" in this.timeSeriesPlotData)) {
              this.timeSeriesPlotData = { ...timeseriesPlotDataSkel };
            }

            timeseriesRowsSettings.map((rowSettings, rowIndex) => {
              if (this.timeSeriesPlotData.xAxis[rowIndex].data.length === 0) {
                this.timeSeriesPlotData.xAxis[rowIndex].data = data.map(
                  (item) => ({
                    value: item.timestamp,
                    textStyle: rowSettings.xAxisTextStyle,
                  })
                );
              }
              rowSettings.lines
                .filter((line) => line.modelSetup === modelSetup)
                .map((line) => {
                  this.timeSeriesPlotData.series[line.serieId].data = data.map(
                    (item) => item[line.dataName]
                  );
                });
            });
            this.applyKeyDates();
          })
          .catch((error) => {
            console.error(error);
          });
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

      const keyMomentsSeriesIndex = [0, 2, 5, 8];
      keyMomentsSeriesIndex.map((serieIndex) => {
        this.timeSeriesPlotData.series[serieIndex].markLine = {
          animation: false,
          symbol: serieIndex === 0 ? ["none", "arrow"] : ["none", "none"],
          label: {
            show: serieIndex === 0,
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
        this.timeSeriesPlotData.series[serieIndex].markArea = {
          label: {
            show: serieIndex === 0,
            position: "bottom",
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
    axisIndex: 0,
    yInverse: true,
    xAxisTextStyle: { fontSize: 0 },
    lines: [
      {
        serieId: 1,
        modelSetup: "0",
        dataName: "P",
        color: "#635441",
        lineStyle: { type: "solid" },
      },
    ],
  },
  {
    axisIndex: 1,
    yInverse: false,
    xAxisTextStyle: { fontSize: 0 },
    lines: [
      {
        serieId: 3,
        modelSetup: "0",
        dataName: "Q",
        color: "#4d7bb3",
        lineStyle: { type: "solid" },
      },
      {
        serieId: 4,
        modelSetup: "R1",
        dataName: "Q",
        color: "#659fe6",
        lineStyle: { type: "solid" },
      },
    ],
  },
  {
    axisIndex: 2,
    yInverse: false,
    xAxisTextStyle: { fontSize: 0 },
    lines: [
      {
        serieId: 6,
        modelSetup: "0",
        dataName: "ET",
        color: "#008000",
        lineStyle: { type: "solid" },
      },
      {
        serieId: 7,
        modelSetup: "R1",
        dataName: "ET",
        color: "#02b502",
        lineStyle: { type: "solid" },
      },
    ],
  },
  {
    axisIndex: 3,
    yInverse: false,
    xAxisTextStyle: {},
    lines: [
      {
        serieId: 9,
        modelSetup: "0",
        dataName: "L",
        color: "#d9785f",
        lineStyle: { type: "solid" },
      },
      {
        serieId: 10,
        modelSetup: "R1",
        dataName: "L",
        color: "#ff8d70",
        lineStyle: { type: "solid" },
      },
    ],
  },
];

const timeseriesPlotDataSkel = {
  tooltip: {
    triggerOn: "click",
  },
  grid: timeseriesRowsSettings.map((_rowSettings, index) => ({
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
      xAxisIndex: timeseriesRowsSettings.map(
        (rowSettings) => rowSettings.axisIndex
      ),
    },
  ],
  xAxis: timeseriesRowsSettings.map((rowSettings) => ({
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
        size: rowSettings.axisIndex === 3 ? 20 : 0,
        margin: 30,
      },
    },
    gridIndex: rowSettings.axisIndex,
    show: true,
    nameLocation: "middle",
  })),
  yAxis: timeseriesRowsSettings.map((rowSettings, rowIndex) => ({
    name: rowIndex === 0 ? `[mm/d]` : "",
    nameLocation: "start",
    min: 0,
    gridIndex: rowSettings.axisIndex,
    inverse: rowSettings.yInverse,
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
    data: timeseriesRowsSettings
      .map((rowSettings) => rowSettings.lines)
      .flat()
      .map((line) => `${line.modelSetup}-${line.dataName}`),
  },
  series: timeseriesRowsSettings
    .map((rowSettings) => [
      {
        name: "key moments",
        type: "line",
        symbol: "none",
        data: [],
        xAxisIndex: rowSettings.axisIndex,
        yAxisIndex: rowSettings.axisIndex,
      },
      rowSettings.lines.map((line) => ({
        name: `${line.modelSetup}-${line.dataName}`,
        type: "line",
        lineStyle: line.lineStyle,
        color: line.color,
        symbol: "none",
        data: [], // item.XYZ to be injected here
        xAxisIndex: rowSettings.axisIndex,
        yAxisIndex: rowSettings.axisIndex,
      })),
    ])
    .flat(2),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart {
  height: 410px;
}
</style>
