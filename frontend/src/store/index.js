import Vue from "vue";
import Vuex from "vuex";
const axios = require("axios");
import { eventBus } from "@/main";
import { LANDMARKS, DESIGN_STRATEGIES, MAP_VARIABLES, URLS } from "@/utils/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    overlayImagesFilepaths: ["", "", ""], // set 1st time in dispatch("init")
    landmarkFocusId: 0,
    designStrategiesFocusId: [0, 0],
    mapVariableFocusId: 0,
    modelSetup: "R1",
    dayFocus: -1, // set 1st time in storeTimeSeriesPlotData
    daysOffset: 0, // set in storeTimeSeriesPlotData
    timeSeriesPlotData: {}, // set in storeTimeSeriesPlotData
    baselineDate: "", // set in storeKeyDates
    keyDates: [], // set in storeKeyDates
    keyPeriods: [], // set in storeKeyDates

    keyDatesFetched: false,
    colormaps: {},
  },
  mutations: {
    storeNewLandmarkFocusId(state, data) {
      state.landmarkFocusId = data.newLandmarkFocusId;
      setNewOverlayImagesFilepaths(state);
      eventBus.$emit("newLandmarkFocus");
    },
    storeNewDesignStrategyFocusId(state, data) {
      state.designStrategiesFocusId[data.scenarioMapId] =
        data.newDesignStrategyFocusId;
      setNewOverlayImagesFilepaths(state);
    },
    storeNewMapVariableFocusId(state, data) {
      state.mapVariableFocusId = data.newMapVariableFocusId;
      setNewOverlayImagesFilepaths(state);
    },
    storeNewDateFocusIndex(state, data) {
      storeNewDateFocusIndex(state, data.index);
    },
    storeTimeSeriesPlotData(state, data) {
      state.daysOffset = data[0].day;
      state.timeSeriesPlotData = {
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
            xAxisIndex: [0, 1, 2, 3],
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
                show: true,
              },
              handle: {
                show: true,
                color: "#7581BD",
                size: 20,
                margin: 30,
              },
            },
            gridIndex: 3,
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
          data: ["P", "Q", "ET", "L"],
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
        ],
      };
      applyKeyDates(state);
    },
    storeKeyDates(state, data) {
      state.baselineDate = data.baselineDate;
      state.keyDates = data.keyDates;
      state.keyPeriods = data.keyPeriods;
      state.keyDatesFetched = true;
      applyKeyDates(state);
    },
    storeColormap(state, data) {
      state.colormaps = {
        ...state.colormaps,
        [data.mapVariable]: data.data,
      };
    },
  },
  actions: {
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
    trimDateFocus({ commit, state }, payload) {
      // happens when zooming in Timeseries.
      // if current dayFocus is before minIndex or after maxIndex
      // then change it to the nearest limit
      if (state.dayFocus < payload.minIndex + state.daysOffset) {
        commit("storeNewDateFocusIndex", {
          index: payload.minIndex,
        });
      } else if (state.dayFocus > payload.maxIndex + state.daysOffset) {
        commit("storeNewDateFocusIndex", {
          index: payload.maxIndex,
        });
      }
    },
    fetchTimeSeriesPlotData({ commit, dispatch, state }) {
      dispatch("fetchKeyDates");
      axios
        .get(
          URLS.timeseries(
            LANDMARKS[state.landmarkFocusId].dbName,
            DESIGN_STRATEGIES[state.designStrategiesFocusId[0]].dbName,
            state.modelSetup
          )
        )
        .then((response) => {
          commit("storeTimeSeriesPlotData", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchKeyDates({ commit, state }) {
      if (!state.keyDatesFetched) {
        axios
          .get(URLS.keyDates)
          .then((response) => {
            commit("storeKeyDates", response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    fetchColormap({ commit, state }, payload) {
      if (state.colormaps[payload.mapVariable] === undefined) {
        axios
          .get(URLS.colormap(payload.mapVariable))
          .then((response) => {
            commit("storeColormap", {
              mapVariable: payload.mapVariable,
              data: response.data,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
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
    const numLength = 11 - MAP_VARIABLES[mapVariableSelected].dbName.length;
    const dayNum = ("0000000" + roundedDay).slice(-numLength);

    const prevOverlayImagesFilepaths = [...state.overlayImagesFilepaths];

    // TODO move state.overlayImagesFilepaths to URLS.overlayImages !
    state.overlayImagesFilepaths[0] = `/data/${
      LANDMARKS[state.landmarkFocusId].dbName
    }_0_R1/${MAP_VARIABLES[mapVariableSelected].dbName}${dayNum}.jpg`;

    state.overlayImagesFilepaths[1] = `/data/${
      LANDMARKS[state.landmarkFocusId].dbName
    }_${DESIGN_STRATEGIES[state.designStrategiesFocusId[0]].dbName}_R1/${
      MAP_VARIABLES[mapVariableSelected].dbName
    }${dayNum}.jpg`;

    state.overlayImagesFilepaths[2] = `/data/${
      LANDMARKS[state.landmarkFocusId].dbName
    }_${DESIGN_STRATEGIES[state.designStrategiesFocusId[1]].dbName}_R2/${
      MAP_VARIABLES[mapVariableSelected].dbName
    }${dayNum}.jpg`;

    // Change overlayImage ONLY if overImagesFilepath changes :
    for (let mapId = 0; mapId < state.overlayImagesFilepaths.length; mapId++) {
      if (
        state.overlayImagesFilepaths[mapId] !==
        prevOverlayImagesFilepaths[mapId]
      ) {
        eventBus.$emit("newOverlayImage", mapId);
      }
    }
  }
};

const applyKeyDates = (state) => {
  // set the baselineDate and
  // add keyDates & keyPeriods to eCharts graph
  if (
    !state.keyDatesFetched ||
    Object.keys(state.timeSeriesPlotData).length === 0
  )
    return;

  if (state.dayFocus === -1) {
    const baselineIndex = state.timeSeriesPlotData.xAxis[0].data.indexOf(
      state.baselineDate
    );
    if (baselineIndex === -1) {
      // no baselineDate requested : eCharts selects the last item by default
      storeNewDateFocusIndex(
        state,
        state.timeSeriesPlotData.series[1].data.length
      );
    } else {
      state.timeSeriesPlotData.xAxis[0].axisPointer.value = state.baselineDate;
      state.timeSeriesPlotData.xAxis[1].axisPointer.value = state.baselineDate;
      storeNewDateFocusIndex(state, baselineIndex);
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
    state.timeSeriesPlotData.series[id].markLine = {
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
      data: state.keyDates.map((keyDate) => {
        return {
          xAxis: keyDate.date,
          name: keyDate.label,
          itemStyle: { color: keyDate.color },
        };
      }),
    };
    state.timeSeriesPlotData.series[id].markArea = {
      label: {
        show: show[id],
        rotate: 45,
      },
      data: state.keyPeriods.map((keyPeriod) => {
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
};

const storeNewDateFocusIndex = (state, dateIndex) => {
  state.dayFocus = dateIndex + state.daysOffset;
  setNewOverlayImagesFilepaths(state);
};
