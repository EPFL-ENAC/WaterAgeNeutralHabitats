<template>
  <v-container>
    <v-card flat>
      <v-card-title>WANHabitats, plot level tab</v-card-title>
      <v-card-text>
        <Maps />
        <TimeSeries />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Maps from "@/components/Maps.vue";
import TimeSeries from "@/components/TimeSeries.vue";
export default {
  name: "Home",
  components: {
    Maps,
    TimeSeries,
  },
};
</script>
