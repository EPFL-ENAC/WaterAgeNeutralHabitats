<template>
  <v-menu open-on-hover offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" class="ml-1"> {{ icon }} </v-icon>
    </template>

    <v-card class="pa-4" dark max-width="600">
      <slot />
    </v-card>
  </v-menu>
</template>

<script>
import { MDI_ICONS } from "@/utils/app";

export default {
  name: "InfoTooltip",
  props: {
    category: {
      type: String,
      required: false,
      default: "info",
      validator: (value) => {
        return value in MDI_ICONS;
      },
    },
  },
  computed: {
    icon() {
      return MDI_ICONS[this.category];
    },
  },
};
</script>

<style scoped lang="scss"></style>
