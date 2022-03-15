<template>
  <v-card flat>
    <v-row>
      <v-col cols="4">
        <v-card flat>
          <v-card-title :style="{ color: SCENARIOS[0].color }">
            {{ SCENARIOS[0].name }}
            <InfoTooltipMaps />
          </v-card-title>
          <v-select
            label="Element highlight"
            :items="ELEMENTS_HIGHLIGHT_LIST"
            item-text="name"
            item-value="id"
            v-model="elementHighlightFocusId"
            dense
            :style="{ zIndex: zIndexAboveLeaflet }"
          />
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card flat>
          <v-card-title :style="{ color: SCENARIOS[1].color }">
            {{ SCENARIOS[1].name }}
          </v-card-title>
          <v-select
            label="Design strategy"
            :items="DESIGN_STRATEGIES"
            item-text="name"
            item-value="id"
            v-model="designStrategiesFocusId[0]"
            dense
            :style="{ zIndex: zIndexAboveLeaflet }"
          />
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card flat>
          <v-card-title :style="{ color: SCENARIOS[2].color }">
            {{ SCENARIOS[2].name }}
          </v-card-title>
          <v-select
            label="Design strategy"
            :items="DESIGN_STRATEGIES"
            item-text="name"
            item-value="id"
            v-model="designStrategiesFocusId[1]"
            dense
            :style="{ zIndex: zIndexAboveLeaflet }"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import {
  SCENARIOS,
  DESIGN_STRATEGIES,
  ELEMENTS_HIGHLIGHT_LIST,
} from "@/utils/app";
import InfoTooltipMaps from "@/infos/InfoTooltipMaps";

export default {
  name: "MapsHeader",
  components: {
    InfoTooltipMaps,
  },
  data() {
    return {
      SCENARIOS,
      DESIGN_STRATEGIES,
      ELEMENTS_HIGHLIGHT_LIST,
      zIndexAboveLeaflet: 100001,
    };
  },
  computed: {
    ...mapState({
      designStrategiesFocusId: "designStrategiesFocusId",
    }),
    elementHighlightFocusId: {
      get() {
        return this.$store.state.elementHighlightFocusId;
      },
      set(id) {
        this.$store.commit("setElementHighlightFocusId", id);
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
