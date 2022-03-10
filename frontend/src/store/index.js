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
    elementHighlightFocusId: 0,
  },
  mutations: {
    storeNewLandmarkFocusId(state, data) {
      state.landmarkFocusId = data.newLandmarkFocusId;
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
    setElementHighlightFocusId(state, newValue) {
      state.elementHighlightFocusId = newValue;
    },
  },
  actions: {
    switchLandmarkFocus({ commit }, payload) {
      commit("storeNewLandmarkFocusId", {
        newLandmarkFocusId: payload.newLandmarkFocusId,
      });
    },
    setNewDayFocus({ commit }, payload) {
      commit("storeNewDayFocus", payload);
    },
  },
  modules: {},
});
