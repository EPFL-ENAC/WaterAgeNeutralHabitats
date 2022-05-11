<template>
  <div class="d-flex flex-column">
    <v-card
      class="flex-even grey lighten-4"
      v-for="(landmark, index) in LANDMARKS"
      :key="index"
      @click="switchToNewLandmark(index)"
      flat
    >
      <v-img :src="landmark.svg" :alt="landmark.name" contain />
      <div class="d-flex flex-row justify-center">
        <img :src="landmark.tinySvg" height="15px" class="ma-1" />
        <div :style="landmarkTextStyle(index)">
          {{ landmark.name }}
        </div>
      </div>
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

<style scoped lang="scss"></style>
