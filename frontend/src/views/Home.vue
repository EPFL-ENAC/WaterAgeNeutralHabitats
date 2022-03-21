<template>
  <v-container fluid>
    <v-navigation-drawer v-model="aboutDrawer" app class="pa-5">
      <div class="text-h5">
        About WANH
        <v-icon class="ma-2" @click="aboutDrawer = false">
          {{ MDI_ICONS.close }}
        </v-icon>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </div>
    </v-navigation-drawer>
    <v-row>
      <v-col cols="4">
        <v-card flat>
          <v-card-title class="text-h4" :style="{ wordBreak: 'break-word' }">
            Berlin Water Age Neutral Habitats
            <v-icon x-large class="ma-2" @click="aboutDrawer = !aboutDrawer">
              {{ MDI_ICONS.about }}
            </v-icon>
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
import { MDI_ICONS } from "@/utils/app";

export default {
  name: "Home",
  components: {
    Maps,
    Timeseries,
    Scatterplot,
    Controls,
  },
  data() {
    return {
      MDI_ICONS,
      aboutDrawer: false,
    };
  },
  computed: {
    ...mapState({
      landmarkFocusId: "landmarkFocusId",
    }),
  },
};
</script>
