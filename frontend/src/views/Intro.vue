<template>
  <v-container fluid>
    <IntroStepper />
  </v-container>
</template>

<script>
import IntroStepper from "@/components/IntroStepper.vue";
export default {
  name: "Intro",
  components: {
    IntroStepper,
  },
};
</script>
