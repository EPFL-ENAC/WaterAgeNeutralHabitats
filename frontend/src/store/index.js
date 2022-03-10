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
    overlayOpacity: 100,
  },
  mutations: {
    storeNewLandmarkFocusId(state, data) {
      state.landmarkFocusId = data.newLandmarkFocusId;
    },
    storeNewDesignStrategyFocusId(state, data) {
      state.designStrategiesFocusId[data.scenarioMapId] =
        data.newDesignStrategyFocusId;
    },
    storeNewMapVariableFocusId(state, id) {
      state.mapVariableFocusId = id;
    },
    storeNewDayFocus(state, data) {
      state.dayFocus = data.dayFocus;
    },
    setOverlayOpacity(state, newValue) {
      state.overlayOpacity = newValue;
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
    setNewDayFocus({ commit }, payload) {
      commit("storeNewDayFocus", payload);
    },
  },
  modules: {},
});
