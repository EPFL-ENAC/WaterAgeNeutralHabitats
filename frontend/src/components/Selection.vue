<template>
  <v-card>
    <v-card-title>
      Selection
      <v-spacer />
      <info-tooltip>
        The landmarks used in this study:
        <ul>
          <li>Slabs, indicating large residential slabs</li>
          <li>SingleFamilyHousing, indicating small family housing</li>
          <li>Industry, indicating a small urban industrial area</li>
          <li>OpenBlocks, indicating open block housing</li>
        </ul>

        <h3>Key Functionalities</h3>
        <ul>
          <li>
            Select a specific landmark to shift map focus to this location
          </li>
        </ul>
      </info-tooltip>
    </v-card-title>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title> Landmark </v-card-title>
          <v-card-text>
            <v-radio-group v-model="myLandmarkFocusId">
              <v-radio
                v-for="(landmark, index) in LANDMARKS"
                :key="index"
                :label="landmark.name"
                :value="index"
                @click="clickLandmarkFocus"
              />
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { LANDMARKS } from "@/utils/app";
import InfoTooltip from "@/components/InfoTooltip";

export default {
  name: "Selection",
  components: {
    InfoTooltip,
  },
  data() {
    return {
      LANDMARKS,
      myLandmarkFocusId: 0, // set in mounted
    };
  },
  computed: {
    ...mapState({
      landmarkFocusId: "landmarkFocusId",
    }),
  },
  methods: {
    clickLandmarkFocus() {
      this.$store.dispatch("switchLandmarkFocus", {
        newLandmarkFocusId: this.myLandmarkFocusId,
      });
    },
  },
  mounted() {
    this.myLandmarkFocusId = this.landmarkFocusId;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
