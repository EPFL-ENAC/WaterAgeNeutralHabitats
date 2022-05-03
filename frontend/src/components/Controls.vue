<template>
  <v-card flat>
    <v-card flat>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col
                v-for="(landmark, index) in LANDMARKS"
                :key="index"
                cols="6"
              >
                <v-card @click="switchToNewLandmark(index)" flat>
                  <v-img
                    :src="landmark.svg"
                    :alt="landmark.name"
                    :gradient="gradient(index)"
                    max-height="100%"
                    max-width="100%"
                  />
                  <span class="d-flex justify-center subtitle-1">
                    <img
                      :src="landmark.tinySvg"
                      max-height="15px"
                      class="ma-1"
                    />
                    {{ landmark.name }}
                  </span>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-card flat>
              <v-card-title>
                Water fluxes <InfoTooltipWaterFluxes
              /></v-card-title>
              <v-card-text>
                <v-radio-group v-model="mapVariableFocusId">
                  <v-radio
                    v-for="(mapVariable, index) in MAP_VARIABLES"
                    :key="index"
                    :value="index"
                  >
                    <template v-slot:label>
                      {{ mapVariable.name }}
                      <div :is="mapVariable.tooltip"></div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-card-text>
            </v-card>
            <Colormap :map-variable="mapVariableDbName" />
            <v-slider
              dense
              v-model="overlayOpacity"
              label="opacity"
              min="0"
              max="100"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-btn @click="compareUrbanFabricTypes">Compare urban fabric types</v-btn>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { LANDMARKS, MAP_VARIABLES } from "@/utils/app";
import Colormap from "@/components/Colormap";
import InfoTooltipEvapotranspiration from "@/infos/InfoTooltipEvapotranspiration";
import InfoTooltipSurfaceRunoff from "@/infos/InfoTooltipSurfaceRunoff";
import InfoTooltipLeakage from "@/infos/InfoTooltipLeakage";
import InfoTooltipWaterStorage from "@/infos/InfoTooltipWaterStorage";
import InfoTooltipPrecipitation from "@/infos/InfoTooltipPrecipitation";
import InfoTooltipWaterFluxes from "@/infos/InfoTooltipWaterFluxes";

export default {
  name: "Controls",
  components: {
    Colormap,
    InfoTooltipEvapotranspiration,
    InfoTooltipSurfaceRunoff,
    InfoTooltipLeakage,
    InfoTooltipWaterStorage,
    InfoTooltipWaterFluxes,
    InfoTooltipPrecipitation,
  },
  data() {
    return {
      LANDMARKS,
      MAP_VARIABLES,
    };
  },
  computed: {
    ...mapState({
      landmarkFocusId: "landmarkFocusId",
    }),
    mapVariableFocusId: {
      get() {
        return this.$store.state.mapVariableFocusId;
      },
      set(id) {
        this.$store.commit("storeNewMapVariableFocusId", id);
      },
    },
    overlayOpacity: {
      get() {
        return this.$store.state.overlayOpacity;
      },
      set(value) {
        this.$store.commit("setOverlayOpacity", value);
      },
    },
    mapVariableDbName() {
      return MAP_VARIABLES[this.mapVariableFocusId].dbName;
    },
  },
  methods: {
    gradient(id) {
      if (id === this.landmarkFocusId) {
        return "";
      } else {
        return "to top left, rgba(255,255,255,.5), rgba(255,255,255,.8)";
      }
    },
    switchToNewLandmark(id) {
      this.$store.dispatch("switchLandmarkFocus", {
        newLandmarkFocusId: id,
      });
    },
    compareUrbanFabricTypes() {
      this.$router.push({ name: "CompareUrbanFabricTypes" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img {
  height: 15px;
}
</style>
