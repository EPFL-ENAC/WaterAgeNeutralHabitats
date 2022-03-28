<template>
  <InfoTooltip category="info">
    Here are displayed the timeseries of:
    <ul>
      <li>
        <b>P</b> : (cumulative precipitation, units of millimeters [mm]) Note:
        this is not simulated, but it is a useful reference to display
      </li>
      <li><b>ET</b> : (cumulative flux value, mm)</li>
      <li><b>Q</b> : (cumulative flux value, mm)</li>
      <li><b>L</b> : (cumulative flux value, mm)</li>
      <li><b>S</b> : (water stored in the rooting zone, mm)</li>
    </ul>

    The dry period are highlighted in light yellow; the peak rains in dark blue.

    <h3>Key Functionalities</h3>
    <ul>
      <li>Shift the selected date to update the maps to this specific date</li>
      <li>Click on the legend to turn timeseries on/off</li>
      <li>Zoom in the chart with the zoom buttons in the upper right corner</li>
      <li>
        Download the chart as an image with the download button in the upper
        right corner
      </li>
    </ul>
  </InfoTooltip>
</template>

<script>
import InfoTooltip from "@/components/InfoTooltip";

export default {
  name: "InfoTooltipTimeseries",
  components: {
    InfoTooltip,
  },
};
</script>

<style scoped lang="scss"></style>
