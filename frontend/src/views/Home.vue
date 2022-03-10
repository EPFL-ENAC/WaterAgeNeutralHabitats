<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-card flat>
          <v-card-title> Berlin Water Age Neutral Habitats </v-card-title>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
          <Controls />
        </v-card>
      </v-col>
      <v-col cols="8">
        <Maps />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <Timeseries />
      </v-col>
      <v-col cols="4">
        <Scatterplot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Maps from "@/components/Maps.vue";
import Timeseries from "@/components/Timeseries.vue";
import Scatterplot from "@/components/Scatterplot.vue";
import Controls from "@/components/Controls.vue";
export default {
  name: "Home",
  components: {
    Maps,
    Timeseries,
    Scatterplot,
    Controls,
  },
};
</script>
