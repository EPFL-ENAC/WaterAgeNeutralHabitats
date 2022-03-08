import Vue from "vue";
import Vuex from "vuex";
const axios = require("axios");
import { URLS } from "@/utils/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    landmarkFocusId: 0,
    designStrategiesFocusId: [0, 0],
    mapVariableFocusId: 0,
    modelSetup: "R1",
    dayFocus: -1, // day number that is selected by Timeserie
    colormaps: {}, // TODO -> move to Maps.vue
  },
  mutations: {
    storeNewLandmarkFocusId(state, data) {
      state.landmarkFocusId = data.newLandmarkFocusId;
    },
    storeNewDesignStrategyFocusId(state, data) {
      state.designStrategiesFocusId[data.scenarioMapId] =
        data.newDesignStrategyFocusId;
    },
    storeNewMapVariableFocusId(state, data) {
      state.mapVariableFocusId = data.newMapVariableFocusId;
    },
    storeNewDayFocus(state, data) {
      state.dayFocus = data.dayFocus;
    },
    storeColormap(state, data) {
      state.colormaps = {
        ...state.colormaps,
        [data.mapVariable]: data.data,
      };
    },
  },
  actions: {
    switchLandmarkFocus({ commit }, payload) {
      commit("storeNewLandmarkFocusId", {
        newLandmarkFocusId: payload.newLandmarkFocusId,
      });
    },
    switchDesignStrategyFocus({ commit }, payload) {
      commit("storeNewDesignStrategyFocusId", {
        scenarioMapId: payload.scenarioMapId,
        newDesignStrategyFocusId: payload.newDesignStrategyFocusId,
      });
    },
    switchMapVariableFocus({ commit }, payload) {
      commit("storeNewMapVariableFocusId", {
        newMapVariableFocusId: payload.newMapVariableFocusId,
      });
    },
    setNewDayFocus({ commit }, payload) {
      commit("storeNewDayFocus", payload);
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
