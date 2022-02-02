import Vue from "vue";
import Vuex from "vuex";
const axios = require("axios");
import { eventBus } from "@/main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    landmarks: [
      {
        name: "Slabs",
        dbName: "Slabs",
        center: [52.579816675, 13.427338875],
        zoom: 16,
        latLngBounds: [
          [52.58092793, 13.42544291],
          [52.57870542, 13.42923484],
        ],
      },
      {
        name: "Single Family Housing",
        dbName: "SingleFamilyHousing",
        center: [52.58473108, 13.41398555],
        zoom: 16,
        latLngBounds: [
          [52.58584282, 13.41209156],
          [52.58361934, 13.41587954],
        ],
      },
      {
        name: "Industry",
        dbName: "Industry",
        center: [52.587923065, 13.41707339],
        zoom: 16,
        latLngBounds: [
          [52.58903163, 13.41516811],
          [52.5868145, 13.41897867],
        ],
      },
      {
        name: "Open Blocks",
        dbName: "OpenBlocks",
        center: [52.568774675, 13.424919295],
        zoom: 16,
        latLngBounds: [
          [52.56988753, 13.42301827],
          [52.56766182, 13.42682032],
        ],
      },
    ],
    overlayImageFilepath: "", // set 1st time in dispatch("init")
    timeseriesFilepath: "", // set 1st time in dispatch("init")
    landmarkFocusId: 0,
    designStrategies: [
      { name: "1", dbName: 1 },
      { name: "2", dbName: 2 },
      { name: "3", dbName: 3 },
      { name: "4", dbName: 4 },
      { name: "5", dbName: 5 },
      { name: "All", dbName: 6 },
    ],
    modelSetup: "R1",
    mapVariable: "Evap",
    designStrategyFocusId: 0,
    dateFocusIndex: 0,
    timeSeriesPlotData: {},
  },
  mutations: {
    storeNewLandmarkFocusId(state, data) {
      state.landmarkFocusId = data.newLandmarkFocusId;
      setNewOverlayImageFilepath(state);
      setNewTimeseries(state);
      eventBus.$emit("newLandmarkFocus");
    },
    storeNewDesignStrategyFocusId(state, data) {
      state.designStrategyFocusId = data.newDesignStrategyFocusId;
      setNewOverlayImageFilepath(state);
      setNewTimeseries(state);
      eventBus.$emit("newDesignStrategyFocus");
    },
    storeNewDateFocusIndex(state, data) {
      const newDateFocus = state.timeSeriesPlotData.xAxis.data[data.index];
      state.dateFocusIndex = data.index;
      console.log(`New Date Focus : ${newDateFocus}`);
    },
    storeTimeSeriesPlotData(state, data) {
      state.timeSeriesPlotData = {
        tooltip: {
          triggerOn: "click",
        },
        grid: {
          left: "8%",
          right: "5%",
          top: "10%",
          bottom: "12%",
        },
        xAxis: {
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
              margin: 35,
            },
          },
        },
        yAxis: {},
        toolbox: {
          right: 10,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        legend: {
          show: true,
        },
        series: [
          {
            name: "P",
            type: "line",
            color: "#635441",
            data: data.map(function (item) {
              return item.P;
            }),
          },
          {
            name: "Q",
            type: "line",
            color: "#4d7bb3",
            data: data.map(function (item) {
              return item.Q;
            }),
          },
          {
            name: "ET",
            type: "line",
            color: "green",
            data: data.map(function (item) {
              return item.ET;
            }),
          },
          {
            name: "L",
            type: "line",
            color: "#d9785f",
            data: data.map(function (item) {
              return item.L;
            }),
          },
        ],
      };
    },
  },
  actions: {
    init({ state }) {
      setNewOverlayImageFilepath(state);
      setNewTimeseries(state);
      eventBus.$emit("stateIsInitialized");
    },
    switchLandmarkFocus({ commit, dispatch }, payload) {
      commit("storeNewLandmarkFocusId", {
        newLandmarkFocusId: payload.newLandmarkFocusId,
      });
      dispatch("fetchTimeSeriesPlotData");
    },
    switchDesignStrategyFocus({ commit, dispatch }, payload) {
      commit("storeNewDesignStrategyFocusId", {
        newDesignStrategyFocusId: payload.newDesignStrategyFocusId,
      });
      dispatch("fetchTimeSeriesPlotData");
    },
    switchDateFocus({ commit }, payload) {
      commit("storeNewDateFocusIndex", {
        index: payload.index,
      });
    },
    fetchTimeSeriesPlotData({ commit, state }) {
      axios
        .get(state.timeseriesFilepath)
        .then(function (response) {
          commit("storeTimeSeriesPlotData", response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  modules: {},
});

const setNewOverlayImageFilepath = (state) => {
  state.overlayImageFilepath = `/data/${
    state.landmarks[state.landmarkFocusId].dbName
  }_${state.designStrategies[state.designStrategyFocusId].dbName}_${
    state.modelSetup
  }/${state.mapVariable}0000580.jpg`;
};

const setNewTimeseries = (state) => {
  state.timeseriesFilepath = `/data/${
    state.landmarks[state.landmarkFocusId].dbName
  }_${state.designStrategies[state.designStrategyFocusId].dbName}_${
    state.modelSetup
  }/timeseries.json`;
};
