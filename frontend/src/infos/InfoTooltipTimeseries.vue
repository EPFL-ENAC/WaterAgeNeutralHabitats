<template>
  <InfoTooltip category="info">
    <v-card>
      <v-card-text>
        <p>
          Daily evolution of the water fluxes over a 2-year period, according to
          the simulated existing condition and scenarios. A dry period is
          highlighted in grey; two major storm events are highlighted through a
          dashed line.
        </p>

        <div class="text-h6">Key Functionalities:</div>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Shift the selected date to update the maps to this specific date
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Zoom in the chart with the zoom buttons in the upper right corner
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Download the chart as an image with the download button in the upper
            right corner
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
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
