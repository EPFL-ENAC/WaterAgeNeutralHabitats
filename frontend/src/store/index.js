import Vue from "vue";
import Vuex from "vuex";
const axios = require("axios");
import { eventBus } from "@/main";
import { LANDMARKS, DESIGN_STRATEGIES, MAP_VARIABLES, URLS } from "@/utils/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    overlayImagesFilepaths: ["", "", ""],
    landmarkFocusId: 0,
    designStrategiesFocusId: [0, 0],
    mapVariableFocusId: 0,
    modelSetup: "R1",
    dayFocus: -1, // day number that is selected by Timeserie
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
