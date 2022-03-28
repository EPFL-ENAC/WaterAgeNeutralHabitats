<template>
  <v-menu
    open-on-hover
    offset-y
    :close-on-content-click="false"
    :z-index="zIndexAboveAll"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" class="ml-1"> {{ icon }} </v-icon>
    </template>

    <v-card class="pa-4" dark>
      <slot />
      <v-card-actions>
        <v-spacer />
        <v-icon> {{ icon }} </v-icon>
      </v-card-actions>
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
  data() {
    return {
      zIndexAboveAll: 100005,
    };
  },
  computed: {
    icon() {
      return MDI_ICONS[this.category];
    },
  },
};
</script>

<style scoped lang="scss"></style>
