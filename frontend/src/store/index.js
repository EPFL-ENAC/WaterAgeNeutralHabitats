import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    landmarkFocusId: 0,
    designStrategiesFocusId: [0, 0],
    mapVariableFocusId: 0,
    modelSetup: "R1",
    dayFocus: -1, // day number that is selected by Timeserie
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
  },
  modules: {},
});
