<template>
  <InfoTooltip category="info">
    <v-card>
      <v-card-text>
        <p>
          The Radical Scenario comprises a series of design strategies entailing
          radical modifications in space. They are related to public and private
          land and may impact on the current use of space (e.g.
          de-paving/revegetating/tree planting public and private surfaces).
        </p>

        <div class="text-h6">Design strategies</div>
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
            Transform sidewalks - Sidewalks are transformed both in their width
            and their depth. Sealed surfaces are replaced with more permeable
            material, and rows of trees are systematically planted along
            sidewalks.
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
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Depave secondary streets - Secondary streets receiving only local
            car traffic are de-paved. Asphalt and pavement are replaced with
            more permeable gravel surfaces, still allowing for slow motorized
            mobility.
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Vegetate flat roofs - Flat roofs are systematically transformed into
            «green» roofs capable of temporarily storing water. Runoff from the
            vegetated roofs will directly infiltrate in the ground around the
            building.
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Transform residual sealed surfaces - Sealed surfaces are defined as
            «residual» if they are neither used for parking, walking, driving,
            recreation or storing purposes. These surfaces are to be de-paved
            and planted with vegetation, while allowing for multiple uses.
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </InfoTooltip>
</template>

<script>
import InfoTooltip from "@/components/InfoTooltip";

export default {
  name: "InfoTooltipRadicalScenario",
  components: {
    InfoTooltip,
  },
};
</script>

<style scoped lang="scss"></style>
