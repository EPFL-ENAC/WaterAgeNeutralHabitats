<template>
  <v-container>
    <v-card flat>
      <v-card-title>WANHabitats, plot level tab</v-card-title>
      <v-card-text>
        <Maps />
      </v-card-text>
    </v-card>
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
