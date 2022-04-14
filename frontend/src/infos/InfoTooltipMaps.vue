<template>
  <InfoTooltip category="info">
    <v-card>
      <v-card-text>
        <p>
          Fraction of surface runoff [or evapotranspiration or soil leakage, if
          they will be included] production against the fraction of permeable
          surface area. Each marker indicates an individual design strategy for
          an urban fabric type.
        </p>

        <div class="text-h6">Key Functionalities:</div>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Click on any urban fabric type to select/de-select the corresponding
            points
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
  name: "InfoTooltipMaps",
  components: {
    InfoTooltip,
  },
};
</script>

<style scoped lang="scss"></style>
