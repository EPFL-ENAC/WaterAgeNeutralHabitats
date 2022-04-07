<template>
  <InfoTooltip category="info">
    The maps display .. (TO BE DETAILED DEPENDING ON CHANGE MAPS OR SCENARIOS
    MAPS... But must detail here anyway the SCENARIOs definitions, as WELL as
    the Design strategies) . These maps have spatial resolution 1 meter and size
    250x250. The reference system is EPSG:25833 (ETRS89 / UTM zone 33N). A map
    was produced every 5 days, after a spinup period of 364 days. (CHANGE TO
    DAILY???)
    <h3>Map variables</h3>
    <ul>
      <li><b>ET</b> : `Evap`</li>
      <li><b>S</b> : `SWCup`</li>
      <li><b>Q</b> : `LSrfn`</li>
      <li><b>L</b> : `PrcL3`</li>
    </ul>
    <h3>Key Functionalities</h3>
    <ul>
      <li>Change maps opacity [TBD ...]</li>
      <li>Select design strategies [TBD ...]</li>
    </ul>
  </InfoTooltip>
</template>

<script>
import InfoTooltip from "@/components/InfoTooltip";

export default {
  name: "InfoTooltipMaps",
  components: {
    InfoTooltip,
  },
};
</script>

<style scoped lang="scss"></style>
