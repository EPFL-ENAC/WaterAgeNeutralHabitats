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
    overlayImagesFilepaths: ["", "", ""], // set 1st time in dispatch("init")
    timeseriesFilepath: "", // set 1st time in dispatch("init")
    landmarkFocusId: 0,
    designStrategies: [
      { id: 0, name: "1", dbName: 1 },
      { id: 1, name: "2", dbName: 2 },
      { id: 2, name: "3", dbName: 3 },
      { id: 3, name: "4", dbName: 4 },
      { id: 4, name: "5", dbName: 5 },
      { id: 5, name: "All", dbName: 6 },
    ],
    designStrategiesFocusId: [0, 0],
    mapVariables: [
      { name: "ET", dbName: "Evap" },
      { name: "L", dbName: "PrcL" },
      { name: "Q", dbName: "LSrfo" },
      { name: "S", dbName: "SWCup" },
    ],
    mapVariableFocusId: 0,
    modelSetup: "R1",
    dayFocus: -1, // set 1st time in storeTimeSeriesPlotData
    daysOffset: 0, // set in storeTimeSeriesPlotData
    timeSeriesPlotData: {},
  },
  mutations: {
    storeNewLandmarkFocusId(state, data) {
      state.landmarkFocusId = data.newLandmarkFocusId;
      setNewOverlayImagesFilepaths(state);
      setNewTimeseries(state);
      eventBus.$emit("newLandmarkFocus");
    },
    storeNewDesignStrategyFocusId(state, data) {
      state.designStrategiesFocusId[data.scenarioMapId] =
        data.newDesignStrategyFocusId;
      setNewOverlayImagesFilepaths(state);
      setNewTimeseries(state);
    },
    storeNewMapVariableFocusId(state, data) {
      state.mapVariableFocusId = data.newMapVariableFocusId;
      setNewOverlayImagesFilepaths(state);
    },
    storeNewDateFocusIndex(state, data) {
      state.dayFocus = data.index + state.daysOffset;
      setNewOverlayImagesFilepaths(state);
    },
    storeTimeSeriesPlotData(state, data) {
      state.daysOffset = data[0].day;
      if (state.dayFocus === -1) {
        // first time : eCharts selects the last item by default
        state.dayFocus = data.length + state.daysOffset;
        setNewOverlayImagesFilepaths(state);
      }
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
      setNewTimeseries(state);
    },
    switchLandmarkFocus({ commit, dispatch }, payload) {
      commit("storeNewLandmarkFocusId", {
        newLandmarkFocusId: payload.newLandmarkFocusId,
      });
      dispatch("fetchTimeSeriesPlotData");
    },
    switchDesignStrategyFocus({ commit, dispatch }, payload) {
      commit("storeNewDesignStrategyFocusId", {
        scenarioMapId: payload.scenarioMapId,
        newDesignStrategyFocusId: payload.newDesignStrategyFocusId,
      });
      dispatch("fetchTimeSeriesPlotData");
    },
    switchMapVariableFocus({ commit }, payload) {
      commit("storeNewMapVariableFocusId", {
        newMapVariableFocusId: payload.newMapVariableFocusId,
      });
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

const setNewOverlayImagesFilepaths = (state) => {
  if (state.dayFocus === -1) {
    state.overlayImagesFilepaths = ["", "", ""];
  } else {
    const roundedDay = state.dayFocus - (state.dayFocus % 5);
    const mapVariableSelected = state.mapVariableFocusId;
    const numLength =
      11 - state.mapVariables[mapVariableSelected].dbName.length;
    const dayNum = ("0000000" + roundedDay).slice(-numLength);

    state.overlayImagesFilepaths[0] = `/data/${
      state.landmarks[state.landmarkFocusId].dbName
    }_0_R1/${state.mapVariables[mapVariableSelected].dbName}${dayNum}.jpg`;

    state.overlayImagesFilepaths[1] = `/data/${
      state.landmarks[state.landmarkFocusId].dbName
    }_${state.designStrategies[state.designStrategiesFocusId[0]].dbName}_R1/${
      state.mapVariables[mapVariableSelected].dbName
    }${dayNum}.jpg`;

    state.overlayImagesFilepaths[2] = `/data/${
      state.landmarks[state.landmarkFocusId].dbName
    }_${state.designStrategies[state.designStrategiesFocusId[1]].dbName}_R2/${
      state.mapVariables[mapVariableSelected].dbName
    }${dayNum}.jpg`;

    eventBus.$emit("newOverlayImages");
  }

  // Console log the images displayed (temp)
  console.log(
    "state.overlayImagesFilepaths [0]",
    state.overlayImagesFilepaths[0]
  );
  console.log(
    "state.overlayImagesFilepaths [1]",
    state.overlayImagesFilepaths[1]
  );
  console.log(
    "state.overlayImagesFilepaths [2]",
    state.overlayImagesFilepaths[2]
  );
};

const setNewTimeseries = (state) => {
  state.timeseriesFilepath = `/data/${
    state.landmarks[state.landmarkFocusId].dbName
  }_${state.designStrategies[state.designStrategiesFocusId[0]].dbName}_${
    // TODO : designStrategiesFocusId[0] or designStrategiesFocusId[1] or ???
    state.modelSetup
  }/timeseries.json`;
};
