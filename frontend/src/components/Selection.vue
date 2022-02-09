<template>
  <v-container>
    <v-card>
      <v-card-title> Selection </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-card flat>
              <v-card-title> Landmark </v-card-title>
              <v-card-text>
                <v-radio-group v-model="myLandmarkFocusId">
                  <v-radio
                    v-for="(landmark, index) in landmarks"
                    :key="index"
                    :label="landmark.name"
                    :value="index"
                    @click="clickLandmarkFocus"
                  />
                </v-radio-group>
              </v-card-text>
            </v-card>

            <v-card flat>
              <v-card-title> Design strategy </v-card-title>
              <v-card-text>
                <v-radio-group v-model="myDesignStrategyFocusId" row>
                  <v-radio
                    v-for="(designStrategy, index) in designStrategies"
                    :key="index"
                    :label="designStrategy.name"
                    :value="index"
                    @click="clickDesignStrategyFocus"
                  />
                </v-radio-group>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Selection",
  data() {
    return {
      myLandmarkFocusId: 0, // set in mounted
      myDesignStrategyFocusId: 0, // set in mounted
    };
  },
  computed: {
    ...mapState({
      landmarks: "landmarks",
      landmarkFocusId: "landmarkFocusId",
      designStrategies: "designStrategies",
      designStrategyFocusId: "designStrategyFocusId",
      mapVariableFocusId: "mapVariableFocusId",
    }),
  },
  methods: {
    clickLandmarkFocus() {
      this.$store.dispatch("switchLandmarkFocus", {
        newLandmarkFocusId: this.myLandmarkFocusId,
      });
    },
    clickDesignStrategyFocus() {
      this.$store.dispatch("switchDesignStrategyFocus", {
        newDesignStrategyFocusId: this.myDesignStrategyFocusId,
      });
    },
  },
  mounted() {
    this.myLandmarkFocusId = this.landmarkFocusId;
    this.myDesignStrategyFocusId = this.designStrategyFocusId;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
