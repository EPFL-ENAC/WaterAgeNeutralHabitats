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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
