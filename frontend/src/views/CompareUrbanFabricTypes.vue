<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-card flat>
          <v-card-title class="text-h4" :style="{ wordBreak: 'break-word' }">
            <v-icon x-large class="ma-2" @click="navigateBack">
              {{ MDI_ICONS.back }}
            </v-icon>

            Berlin Water Age Neutral Habitats
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col> Here will come some controls </v-col>
              <v-col> Here will come Landmarks SVGs </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8">
        <Maps :landmarksIds="[0, 1, 2, 3]" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Maps from "@/components/Maps.vue";
import { MDI_ICONS } from "@/utils/app";

export default {
  name: "Home",
  components: {
    Maps,
  },
  data() {
    return {
      MDI_ICONS,
    };
  },
  methods: {
    navigateBack() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
