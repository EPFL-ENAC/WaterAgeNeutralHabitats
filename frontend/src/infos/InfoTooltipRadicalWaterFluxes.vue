<template>
  <InfoTooltip category="info">
    <v-card>
      <v-card-text>
        <p>
          The maps display distribution of the water fluxes on a given day,
          according to the simulated existing condition and scenarios. These
          maps have spatial resolution 1 meter and size 250x250.
        </p>

        <div class="text-h6">Key Functionalities:</div>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Transform parking lots - Surfaces devoted to car and truck parking
            are de-paved. Asphalt and pavement are replaced with stabilized
            grass surfaces, and trees are planted between parking spots.
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
            Select a different symbol in the left menu to switch to a different
            urban fabric type
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Change the displayed variable by selecting the water flux below
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Change maps opacity with the slider below
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Select design strategy [...] PAOLO PLEASE DESCRIBE?
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </InfoTooltip>
</template>

<script>
import InfoTooltip from "@/components/InfoTooltip";

export default {
  name: "InfoTooltipRadicalWaterFluxes",
  components: {
    InfoTooltip,
  },
};
</script>

<style scoped lang="scss"></style>
