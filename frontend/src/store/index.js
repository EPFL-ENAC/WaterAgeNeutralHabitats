import Vue from "vue";
import Vuex from "vuex";
const axios = require("axios");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    demoEchartsPlotData: {},
  },
  mutations: {
    storeDemoEchartsPlotData(state, data) {
      state.demoEchartsPlotData = {
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
    fetchDemoEchartsPlotData({ commit }) {
      axios
        .get("/data/timeseries.json")
        .then(function (response) {
          // handle success
          commit("storeDemoEchartsPlotData", response.data);
        })
        .catch(function (error) {
          // handle error
          console.error(error);
        });
    },
  },
  modules: {},
});
