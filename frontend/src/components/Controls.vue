<template>
  <v-card flat>
    <v-card flat>
      <v-card-text>
        <v-row>
          <v-col v-for="(landmark, index) in LANDMARKS" :key="index" cols="6">
            <v-card @click="switchToNewLandmark(index)" flat>
              <v-img
                :src="landmark.jpg"
                :alt="landmark.name"
                :gradient="gradient(index)"
                max-height="75px"
                max-width="100%"
              />
              <v-card-title class="text-caption">
                {{ landmark.name }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-btn @click="compareLandmarks">Compare landmarks</v-btn>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { LANDMARKS } from "@/utils/app";

export default {
  name: "Controls",
  components: {},
  data() {
    return {
      LANDMARKS,
    };
  },
  computed: {
    ...mapState({
      landmarkFocusId: "landmarkFocusId",
    }),
  },
  methods: {
    gradient(id) {
      if (id === this.landmarkFocusId) {
        return "";
      } else {
        return "to top left, rgba(255,255,255,.7), rgba(255,255,255,.9)";
      }
    },
    switchToNewLandmark(id) {
      this.$store.dispatch("switchLandmarkFocus", {
        newLandmarkFocusId: id,
      });
    },
    compareLandmarks() {
      console.log("compareLandmarks : TODO");
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
