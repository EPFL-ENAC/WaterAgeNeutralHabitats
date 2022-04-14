<template>
  <InfoTooltip category="info">
    Fraction of surface runoff [or evapotranspiration or soil leakage, if they
    will be included] production against the fraction of permeable surface area.
    Each marker indicates an individual design strategy for an urban fabric
    type.
  </InfoTooltip>
</template>

<script>
import InfoTooltip from "@/components/InfoTooltip";

export default {
  name: "InfoTooltipScatter",
  components: {
    InfoTooltip,
  },
};
</script>

<style scoped lang="scss"></style>
