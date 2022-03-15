<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-card flat>
          <v-card-title class="text-h4" :style="{ wordBreak: 'break-word' }">
            Berlin Water Age Neutral Habitats
          </v-card-title>
          <Controls />
        </v-card>
      </v-col>
      <v-col cols="8">
        <Maps :landmarksIds="[landmarkFocusId]" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <Scatterplot />
      </v-col>
      <v-col cols="8">
        <Timeseries />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
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
  computed: {
    ...mapState({
      landmarkFocusId: "landmarkFocusId",
    }),
  },
};
</script>
