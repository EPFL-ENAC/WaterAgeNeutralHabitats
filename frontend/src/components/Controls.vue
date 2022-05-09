<template>
  <v-card class="d-flex flex-column" flat>
    <v-card flat>
      <v-card-title class="pt-0 pb-0">
        Water fluxes <InfoTooltipWaterFluxes />
      </v-card-title>
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
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { MAP_VARIABLES } from "@/utils/app";
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img {
  height: 15px;
}
</style>
