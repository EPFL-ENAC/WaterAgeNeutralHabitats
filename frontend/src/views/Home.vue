<template>
  <v-container>
    <h1>Hello</h1>
    <Maps />
  </v-container>
</template>

<script>
// @ is an alias to /src
import Maps from "@/components/Maps.vue";
export default {
  name: "Home",
  components: {
    Maps,
  },
};
</script>
