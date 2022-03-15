<template>
  <v-tooltip bottom max-width="500px" z-index="10000" open-on-focus>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>
      <slot> </slot>
    </span>
  </v-tooltip>
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
