import Vue from "vue";
import Vuex from "vuex";
const axios = require("axios");
import { eventBus } from "@/main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    landmarks: [
      {
        name: "Slab",
        center: [52.579816675, 13.427338875],
        zoom: 16,
        latLngBounds: [
          [52.58092793, 13.42544291],
          [52.57870542, 13.42923484],
        ],
        overlayImage: "/data/Slabs.jpg",
      },
      {
        name: "Single Family Housing",
        center: [52.58473108, 13.41398555],
        zoom: 16,
        latLngBounds: [
          [52.58584282, 13.41209156],
          [52.58361934, 13.41587954],
        ],
        overlayImage: "/data/SingleFamilyHousing.jpg", // TODO
      },
      {
        name: "Industry",
        center: [52.587923065, 13.41707339],
        zoom: 16,
        latLngBounds: [
          [52.58903163, 13.41516811],
          [52.5868145, 13.41897867],
        ],
        overlayImage: "/data/Industry.jpg", // TODO
      },
      {
        name: "Open Blocks",
        center: [52.568774675, 13.424919295],
        zoom: 16,
        latLngBounds: [
          [52.56988753, 13.42301827],
          [52.56766182, 13.42682032],
        ],
        overlayImage: "/data/OpenBlocks.jpg", // TODO
      },
    ],
    landmarkFocusId: 0,
    timeSeriesPlotData: {},
  },
  mutations: {
    storeNewLandmarkFocusId(state, data) {
      state.landmarkFocusId = data.newLandmarkFocusId;
      eventBus.$emit("centerToNewLandmarkFocus");
    },
    storeTimeSeriesPlotData(state, data) {
      state.timeSeriesPlotData = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "10%",
          bottom: "5%",
        },
        xAxis: {
          data: data.map(function (item) {
            return item.timestamp;
          }),
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
            data: data.map(function (item) {
              return item.P;
            }),
          },
          {
            name: "Q",
            type: "line",
            data: data.map(function (item) {
              return item.Q;
            }),
          },
          {
            name: "ET",
            type: "line",
            data: data.map(function (item) {
              return item.ET;
            }),
          },
          {
            name: "L",
            type: "line",
            data: data.map(function (item) {
              return item.L;
            }),
          },
        ],
      };
    },
  },
  actions: {
    switchLandmarkFocus({ commit }, payload) {
      commit("storeNewLandmarkFocusId", {
        newLandmarkFocusId: payload.newLandmarkFocusId,
      });
    },
    fetchTimeSeriesPlotData({ commit }) {
      axios
        .get("/data/timeseries.json")
        .then(function (response) {
          // handle success
          commit("storeTimeSeriesPlotData", response.data);
        })
        .catch(function (error) {
          // handle error
          console.error(error);
        });
    },
  },
  modules: {},
});
