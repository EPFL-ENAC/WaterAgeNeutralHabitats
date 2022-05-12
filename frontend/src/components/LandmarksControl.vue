<template>
  <div class="d-flex flex-column">
    <v-card
      class="flex-even grey lighten-4 d-flex flex-column"
      v-for="(landmark, index) in LANDMARKS"
      :key="index"
      @click="switchToNewLandmark(index)"
      flat
    >
      <div class="flex-grow-1" />
      <v-img
        :src="landmark.svg"
        :alt="landmark.name"
        contain
        class="flex-grow-0"
      />
      <div class="d-flex flex-row justify-center">
        <div class="landmarkText" :style="landmarkTextStyle(index)">
          <img :src="landmark.tinySvg" height="15px" />
          {{ landmark.name }}
        </div>
      </div>
      <div class="flex-grow-1" />
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { LANDMARKS } from "@/utils/app";

export default {
  name: "LandmarksControl",
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
    landmarkTextStyle(id) {
      if (id === this.landmarkFocusId) {
        return { fontWeight: "bold" };
      } else {
        return {};
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

<style scoped lang="scss">
.landmarkText {
  text-align: center;
}
</style>
