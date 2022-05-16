<template>
  <InfoTooltip category="info">
    <v-card>
      <v-card-text>
        <p>
          The Conservative Scenario comprises a series of design strategies
          which can be easily implemented. They are related to publicly owned
          land only and don’t impact on the current use of space (e.g. de-paving
          public, sealed surfaces).
        </p>
        <p>
          Each design strategy and scenario can be compared between each other,
          between built types, and through time.
        </p>

        <div class="text-h6">Design strategies</div>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Transform parking lots - Selected surfaces devoted to car and truck
            parking are de-paved. Asphalt and pavement are replaced with
            stabilized grass surfaces.
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Transform sidewalks - Selected sidewalks are transformed both in
            their width and their depth. Sealed surfaces are replaced with more
            permeable material, and rows of trees are systematically planted
            along sidewalks.
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Transform public buildings’ open spaces - Open spaces located on the
            grounds of public buildings (schools, police stations, etc.) are
            heavily transformed through the depaving of most sealed surfaces and
            the planting of new vegetation.
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Regenerate lawns - Lawn surfaces, mainly located in front of or in
            between collective housing buildings, as well as inside private
            gardens are to be more densely vegetated. Grass is let to grow
            longer, and more shrubs are planted on underused areas.
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </InfoTooltip>
</template>

<script>
import InfoTooltip from "@/components/InfoTooltip";

export default {
  name: "InfoTooltipConservativeScenario",
  components: {
    InfoTooltip,
  },
};
</script>

<style scoped lang="scss"></style>
