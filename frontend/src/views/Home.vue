<template>
  <v-container>
    <v-card-title>
      Water Age Neutral Habitats (plot-level tab, in dev)
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <Selection />
        </v-col>
        <v-col cols="9">
          <Maps />
          <TimeSeries />
        </v-col>
      </v-row>
    </v-card-text>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Maps from "@/components/Maps.vue";
import TimeSeries from "@/components/TimeSeries.vue";
import Selection from "@/components/Selection.vue";
export default {
  name: "Home",
  components: {
    Maps,
    TimeSeries,
    Selection,
  },
};
</script>
