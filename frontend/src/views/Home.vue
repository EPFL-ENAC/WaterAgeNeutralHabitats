<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title>
        Water Age Neutral Habitats (plot-level tab, in dev)
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <Selection />
          </v-col>
          <v-col cols="10">
            <Maps />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <TimeSeries />
          </v-col>
          <v-col cols="6">
            <Scatterplot />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Maps from "@/components/Maps.vue";
import TimeSeries from "@/components/TimeSeries.vue";
import Scatterplot from "@/components/Scatterplot.vue";
import Selection from "@/components/Selection.vue";
export default {
  name: "Home",
  components: {
    Maps,
    TimeSeries,
    Scatterplot,
    Selection,
  },
};
</script>
