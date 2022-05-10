<template>
  <v-card class="d-flex flex-column" height="100%" flat>
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
import { URLS, SCENARIOS, TIMESERIES_LINES_ATTRS } from "@/utils/app";
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
        legend: TIMESERIES_LINES_ATTRS.P.entries[0].serieId,
        scenarioId: 0,
        dataName: "P",
        color: TIMESERIES_LINES_ATTRS.P.entries[0].color,
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
        legend: TIMESERIES_LINES_ATTRS.Q.entries[0].serieId,
        scenarioId: 0,
        dataName: "Q",
        color: TIMESERIES_LINES_ATTRS.Q.entries[0].color,
        lineStyle: { type: "solid" },
      },
      {
        serieId: 4,
        legend: TIMESERIES_LINES_ATTRS.Q.entries[1].serieId,
        scenarioId: 1,
        dataName: "Q",
        color: TIMESERIES_LINES_ATTRS.Q.entries[1].color,
        lineStyle: { type: "solid" },
      },
      {
        serieId: 5,
        legend: TIMESERIES_LINES_ATTRS.Q.entries[2].serieId,
        scenarioId: 2,
        dataName: "Q",
        color: TIMESERIES_LINES_ATTRS.Q.entries[2].color,
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
        legend: TIMESERIES_LINES_ATTRS.ET.entries[0].serieId,
        scenarioId: 0,
        dataName: "ET",
        color: TIMESERIES_LINES_ATTRS.ET.entries[0].color,
        lineStyle: { type: "solid" },
      },
      {
        serieId: 8,
        legend: TIMESERIES_LINES_ATTRS.ET.entries[1].serieId,
        scenarioId: 1,
        dataName: "ET",
        color: TIMESERIES_LINES_ATTRS.ET.entries[1].color,
        lineStyle: { type: "solid" },
      },
      {
        serieId: 9,
        legend: TIMESERIES_LINES_ATTRS.ET.entries[2].serieId,
        scenarioId: 2,
        dataName: "ET",
        color: TIMESERIES_LINES_ATTRS.ET.entries[2].color,
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
        legend: TIMESERIES_LINES_ATTRS.L.entries[0].serieId,
        scenarioId: 0,
        dataName: "L",
        color: TIMESERIES_LINES_ATTRS.L.entries[0].color,
        lineStyle: { type: "solid" },
      },
      {
        serieId: 12,
        legend: TIMESERIES_LINES_ATTRS.L.entries[1].serieId,
        scenarioId: 1,
        dataName: "L",
        color: TIMESERIES_LINES_ATTRS.L.entries[1].color,
        lineStyle: { type: "solid" },
      },
      {
        serieId: 13,
        legend: TIMESERIES_LINES_ATTRS.L.entries[2].serieId,
        scenarioId: 2,
        dataName: "L",
        color: TIMESERIES_LINES_ATTRS.L.entries[2].color,
        lineStyle: { type: "solid" },
      },
    ],
  },
];

const tooltipFormatOneFlux = (fluxe, tooltipParams) => {
  return `
    <div class="v-label">${fluxe.name}</div>
    ${fluxe.entries
      .map((entry) => tooltipFormatOneEntry(entry, tooltipParams))
      .join("")}
  `;
};

const tooltipFormatOneEntry = (entry, tooltipParams) => {
  const index = tooltipParams.findIndex((el) => {
    return el.seriesName === entry.serieId;
  });
  return `<div class="d-flex flex-row">
    <div style="width: 10px; height: 10px; background-color: ${entry.color}; border-radius: 100%;" class="ma-1"></div>
    <div class="flex-grow-1">${entry.label}&nbsp;:&nbsp;</div>
    <div><b>${tooltipParams[index].value}</b></div>
  </div>`;
};

const timeseriesPlotDataSkel = {
  tooltip: {
    triggerOn: "click",
    confine: true,
    formatter: (params) => {
      return [
        `<div class="v-label"><b>${params[0].axisValue}</b></div>`,
        tooltipFormatOneFlux(TIMESERIES_LINES_ATTRS.P, params),
        tooltipFormatOneFlux(TIMESERIES_LINES_ATTRS.Q, params),
        tooltipFormatOneFlux(TIMESERIES_LINES_ATTRS.ET, params),
        tooltipFormatOneFlux(TIMESERIES_LINES_ATTRS.L, params),
      ].join("<br />");
    },
  },
  grid: timeseriesRowsSettings.map((_rowSettings, index) => ({
    left: 35,
    right: 20,
    height: "17%",
    top: index * 20 + 9 + "%",
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
    splitNumber: 3,
  })),
  toolbox: {
    top: -5,
    right: 10,
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      saveAsImage: {},
    },
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
