<template>
  <v-card flat>
    <v-row>
      <v-col cols="4">
        <v-card flat>
          <v-card-title>
            {{ SCENARIOS[0].name }}
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
          <v-card-title>
            {{ SCENARIOS[1].name }}
            <InfoTooltipConservativeScenario />
          </v-card-title>
          <v-select
            label="Design strategy"
            :items="designStrategiesPerScenario[1]"
            item-value="id"
            v-model="designStrategiesFocusId[1]"
            :style="{ zIndex: zIndexAboveLeaflet }"
            dense
          >
            <template v-slot:selection="data">
              <div :style="data.item.style">
                {{ data.item.name }}
              </div>
            </template>
            <template v-slot:item="data">
              <div :style="data.item.style">
                {{ data.item.name }}
              </div>
            </template>
          </v-select>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card flat>
          <v-card-title>
            {{ SCENARIOS[2].name }}
            <InfoTooltipRadicalScenario />
          </v-card-title>
          <v-select
            label="Design strategy"
            :items="designStrategiesPerScenario[2]"
            item-value="id"
            v-model="designStrategiesFocusId[2]"
            :style="{ zIndex: zIndexAboveLeaflet }"
            dense
          >
            <template v-slot:selection="data">
              <div :style="data.item.style">
                {{ data.item.name }}
              </div>
            </template>
            <template v-slot:item="data">
              <div :style="data.item.style">
                {{ data.item.name }}
              </div>
            </template>
          </v-select>
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
import InfoTooltipConservativeScenario from "@/infos/InfoTooltipConservativeScenario";
import InfoTooltipRadicalScenario from "@/infos/InfoTooltipRadicalScenario";

export default {
  name: "MapsHeader",
  components: {
    InfoTooltipConservativeScenario,
    InfoTooltipRadicalScenario,
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
    designStrategiesPerScenario() {
      return SCENARIOS.map((scenario) =>
        scenario.designStrategies.map(
          (designStrategy) => DESIGN_STRATEGIES[designStrategy]
        )
      );
    },
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
