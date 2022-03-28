import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    landmarkFocusId: 0,
    designStrategiesFocusId: [9, 10], // default to both "Full scenario"
    mapVariableFocusId: 0,
    modelSetups: ["0", "R1"],
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
    setDayFocus(state, newDayFocus) {
      state.dayFocus = newDayFocus;
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
  },
  modules: {},
});
