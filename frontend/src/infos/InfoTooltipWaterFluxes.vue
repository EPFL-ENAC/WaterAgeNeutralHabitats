<template>
  <InfoTooltip category="info">
    <v-card>
      <v-card-text>
        <p>
          Spatial distribution of the water fluxes on a given day, according to
          the simulated existing condition and scenarios. Each map has a spatial
          resolution of 1 meter and size 250x250 m.
        </p>

        <div class="text-h6">Key Functionalities:</div>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Change the selected date at the bottom of the timeseries to see the
            spatial distribution in different days
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Change the selected date at the bottom of the timeseries to see the
            spatial distribution in different days
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Change the displayed variable by selecting the water flux from the
            left menu
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Change maps opacity with the slider from the left menu
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Highlight one urban element by using the dropdown menu "Element
            highlight"
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Change the displayed design strategy by using the dropdown menu
            "Design strategy"
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </InfoTooltip>
</template>

<script>
import InfoTooltip from "@/components/InfoTooltip";

export default {
  name: "InfoTooltipWaterFluxes",
  components: {
    InfoTooltip,
  },
};
</script>

<style scoped lang="scss"></style>
