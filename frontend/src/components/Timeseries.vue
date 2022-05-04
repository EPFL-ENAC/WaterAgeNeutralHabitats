<template>
  <v-card class="d-flex flex-column" height="100%" flat>
    <v-card-title>
      Water fluxes in time
      <InfoTooltipTimeseries />
    </v-card-title>
    <v-card-text class="flex-grow-1">
      <v-responsive height="100%" min-height="280px">
        <v-chart
          class="chart"
          :option="timeSeriesPlotData"
          @highlight="eChartsHighlight"
          @datazoom="eChartsDatazoom"
          autoresize
        />
      </v-responsive>
    </v-card-text>
  </v-card>
</template>

<script>
const _ = require("lodash");
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
import { URLS, SCENARIOS } from "@/utils/app";
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
      daysOffset: NaN,
      timeSeriesPlotData: {},
      keyDatesFetched: false,
      baselineDate: "",
      keyDates: [],
      keyPeriods: [],
      stateToRestore: false,
    };
  },
  computed: {
    ...mapState({
      dayFocus: "dayFocus",
      landmarkFocusId: "landmarkFocusId",
      designStrategiesFocusId: "designStrategiesFocusId",
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
      let needToUpdateXAxis = true;

      if ("series" in this.timeSeriesPlotData) {
        // We fetch new set of data
        // We flag to restore state (dayFocus) just after
        // Would love to do that for the zoom also ...
        this.stateToRestore = true;
      } else {
        // This is the first fetch
        this.timeSeriesPlotData = _.cloneDeep(timeseriesPlotDataSkel);
      }

      SCENARIOS.map((_scenario, index) => {
        const url = URLS.timeseries(
          this.landmarkFocusId,
          this.designStrategiesFocusId[index]
        );
        axios
          .get(url)
          .then((response) => {
            if (Array.isArray(response.data)) {
              return response.data;
            } else {
              throw new Error("Error parsing data received from " + url);
            }
          })
          .then((data) => {
            if (needToUpdateXAxis) {
              this.daysOffset = data[0].day;
              timeseriesRowsSettings.map((rowSettings, rowIndex) => {
                this.timeSeriesPlotData.xAxis[rowIndex].data = data.map(
                  (item) => ({
                    value: item.timestamp,
                    textStyle: rowSettings.xAxisTextStyle,
                  })
                );
              });
              needToUpdateXAxis = false;
            }
            timeseriesRowsSettings.map((rowSettings) => {
              rowSettings.lines
                .filter((line) => line.scenarioId === index)
                .map((line) => {
                  this.timeSeriesPlotData.series[line.serieId].data = data.map(
                    (item) => item[line.dataName]
                  );
                });
            });
            this.finalizeChart();
          })
          .catch((error) => {
            console.log("Error", { error });
          });
      });
    },
    fetchKeyDates() {
      if (!this.keyDatesFetched) {
        const url = URLS.keyDates;
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
            this.baselineDate = data.baselineDate;
            this.keyDates = data.keyDates;
            this.keyPeriods = data.keyPeriods;
            this.keyDatesFetched = true;
            this.finalizeChart();
          })
          .catch((error) => {
            console.log("Error", { error });
          });
      }
    },
    finalizeChart() {
      // set the baselineDate and
      // restore axisPointer to dayFocus when loading new timeseries
      // add keyDates & keyPeriods to eCharts graph

      if (
        !this.keyDatesFetched ||
        Object.keys(this.timeSeriesPlotData).length === 0 ||
        isNaN(this.daysOffset)
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
      } else if (this.stateToRestore) {
        this.timeSeriesPlotData.xAxis.map((xAxis) => {
          xAxis.axisPointer.value = this.dayFocus - this.daysOffset;
        });
        this.stateToRestore = false;
      }

      const keyMomentsSeriesIndex = [0, 2, 6, 10];
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
      this.$store.commit("setDayFocus", dateIndex + this.daysOffset);
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

const timeseriesRowsSettings = [
  {
    axisIndex: 0,
    yInverse: true,
    xAxisTextStyle: { fontSize: 0 },
    lines: [
      {
        serieId: 1,
        legend: "P",
        scenarioId: 0,
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
        legend: "Existing Q",
        scenarioId: 0,
        dataName: "Q",
        color: "#d9785f",
        lineStyle: { type: "solid" },
      },
      {
        serieId: 4,
        legend: "Conservative Q",
        scenarioId: 1,
        dataName: "Q",
        color: "#ff8d70",
        lineStyle: { type: "solid" },
      },
      {
        serieId: 5,
        legend: "Radical Q",
        scenarioId: 2,
        dataName: "Q",
        color: "#ffc6b8",
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
        serieId: 7,
        legend: "Existing ET",
        scenarioId: 0,
        dataName: "ET",
        color: "#008000",
        lineStyle: { type: "solid" },
      },
      {
        serieId: 8,
        legend: "Conservative ET",
        scenarioId: 1,
        dataName: "ET",
        color: "#02b502",
        lineStyle: { type: "solid" },
      },
      {
        serieId: 9,
        legend: "Radical ET",
        scenarioId: 2,
        dataName: "ET",
        color: "#9fbda5",
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
        serieId: 11,
        legend: "Existing L",
        scenarioId: 0,
        dataName: "L",
        color: "#0257d6",
        lineStyle: { type: "solid" },
      },
      {
        serieId: 12,
        legend: "Conservative L",
        scenarioId: 1,
        dataName: "L",
        color: "#659fe6",
        lineStyle: { type: "solid" },
      },
      {
        serieId: 13,
        legend: "Radical L",
        scenarioId: 2,
        dataName: "L",
        color: "#85c0ff",
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
    height: "17%",
    top: index * 22 + 7 + "%",
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
    type: "scroll",
    right: 100,
    data: timeseriesRowsSettings
      .map((rowSettings) => rowSettings.lines)
      .flat()
      .map((line) => `${line.legend}`),
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
        name: `${line.legend}`,
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

<style scoped lang="scss"></style>
