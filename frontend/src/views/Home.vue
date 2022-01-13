<template>
  <v-container>
    <h1>Hello</h1>
    <Map />
  </v-container>
</template>

<script>
// @ is an alias to /src
import Map from "@/components/Map.vue";
export default {
  name: "Home",
  components: {
    Map,
  },
};
</script>
