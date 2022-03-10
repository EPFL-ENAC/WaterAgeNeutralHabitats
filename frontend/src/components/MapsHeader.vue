<template>
  <v-card flat>
    <v-row>
      <v-col cols="4">
        <v-card flat>
          <v-card-title :style="{ color: SCENARIOS[0].color }">
            {{ SCENARIOS[0].name }}
            <InfoTooltip>
              The maps display .. (TO BE DETAILED DEPENDING ON CHANGE MAPS OR
              SCENARIOS MAPS... But must detail here anyway the SCENARIOs
              definitions, as WELL as the Design strategies) . These maps have
              spatial resolution 1 meter and size 250x250. The reference system
              is EPSG:25833 (ETRS89 / UTM zone 33N). A map was produced every 5
              days, after a spinup period of 364 days. (CHANGE TO DAILY???)
              <h3>Map variables</h3>
              <ul>
                <li><b>ET</b> : `Evap`</li>
                <li>
                  <b>S</b> : [to be decided after looking at `SatDef` or
                  `SWCup`]
                </li>
                <li>
                  <b>Q</b> : [to be decided after looking at `LSrfo` or the
                  difference `LSrfo`-`LSrfi`]
                </li>
                <li>
                  <b>L</b> : [to be decided after looking at `PrcL3`, `Rchg`]
                </li>
              </ul>
              <h3>Key Functionalities</h3>
              <ul>
                <li>Change maps opacity [TBD ...]</li>
                <li>Select design strategies [TBD ...]</li>
              </ul>
            </InfoTooltip>
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
import InfoTooltip from "@/components/InfoTooltip";

export default {
  name: "MapsHeader",
  components: {
    InfoTooltip,
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
