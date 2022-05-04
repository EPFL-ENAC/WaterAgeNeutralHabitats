<template>
  <div class="d-flex flex-column">
    <v-card
      class="flex-even"
      v-for="(landmark, index) in LANDMARKS"
      :key="index"
      @click="switchToNewLandmark(index)"
      flat
    >
      <v-img
        :src="landmark.svg"
        :alt="landmark.name"
        :gradient="gradient(index)"
        contain
      />
      <div class="d-flex flex-row justify-center">
        <img :src="landmark.tinySvg" height="15px" class="ma-1" />
        {{ landmark.name }}
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

<style scoped lang="scss"></style>
