<template>
  <v-container fluid>
    <v-navigation-drawer v-model="aboutDrawer" app class="pa-5" width="30%">
      <div class="text-h5">
        About WANH
        <v-icon class="ma-2" @click="aboutDrawer = false">
          {{ MDI_ICONS.close }}
        </v-icon>
      </div>
      <v-card flat>
        <v-card-title>Context</v-card-title>
        <v-card-text>
          This work is part of the Water-Age-Neutral Habitats: Re-designing the
          urban water cycle for a renewable city-territory research project,
          conducted at EPFL. This interdisciplinary project is funded by the
          ENAC Cluster Grants 2020 - Sustainable Territories, with modeling done
          in collaboration with Chris Soulsby and his team at IGB Berlin. This
          website is created through the ENAC Cluster Grant Data Valorisation
          program.
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-card-title> Methods </v-card-title>
        <v-card-text>
          We computed the main water fluxes in space and time through the
          ecohydrological model EcH2O-iso, using the data and parameterization
          from
          <a href="https://doi.org/10.5194/hess-25-3635-2021">
            Gillefalk et al., (2021)
          </a>
          . The implementation of the different design strategies resulted in
          changes to the land covers and associated model parameters. The data
          show results from 11 design strategies per urban fabric type.
          Simulations were run at daily time steps, from 30 November 2017 to 30
          November 2019 (2 years), after a spinup period of 1 year.
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-card-title>Contributors</v-card-title>
        <v-card-text>
          <v-list dense>
            <template v-for="group in groupsOfContributors">
              <v-subheader :key="group.name">
                {{ group.name }}
              </v-subheader>
              <v-list-item v-for="contrib in group.members" :key="contrib.name">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ contrib.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <a :href="contrib.labURL">{{ contrib.lab }}</a>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-btn @click="goToIntro">See intro</v-btn>
      </v-card>
      <v-card flat class="ma-2">
        <v-img src="/EPFL.png"></v-img>
        <v-img src="/ENACIT4R.jpg"></v-img>
      </v-card>
    </v-navigation-drawer>
    <v-row>
      <v-col cols="4">
        <v-card flat>
          <v-card-title
            class="text-h4 font-weight-bold"
            :style="{ wordBreak: 'break-word' }"
          >
            URBAN WATER CYCLE RE-DESIGN
            <v-icon x-large class="ma-2" @click="aboutDrawer = !aboutDrawer">
              {{ MDI_ICONS.about }}
            </v-icon>
          </v-card-title>
          <v-card-subtitle class="text-h5 font-italic">
            Berlin
          </v-card-subtitle>
          <Controls />
        </v-card>
      </v-col>
      <v-col cols="8">
        <Maps :landmarksIds="[landmarkFocusId]" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <Scatterplot />
      </v-col>
      <v-col cols="8">
        <Timeseries />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
// @ is an alias to /src
import Maps from "@/components/Maps.vue";
import Timeseries from "@/components/Timeseries.vue";
import Scatterplot from "@/components/Scatterplot.vue";
import Controls from "@/components/Controls.vue";
import { MDI_ICONS } from "@/utils/app";

export default {
  name: "Home",
  components: {
    Maps,
    Timeseries,
    Scatterplot,
    Controls,
  },
  data() {
    return {
      MDI_ICONS,
      aboutDrawer: false,
      groupsOfContributors: [
        {
          name: "Research team",
          members: [
            {
              name: "Martina Barcelloni Corte",
              lab: "LAB-U",
              labURL: "https://www.epfl.ch/labs/lab-u/",
            },
            {
              name: "Paolo Benettin",
              lab: "ECHO",
              labURL: "https://www.epfl.ch/labs/echo/",
            },
            {
              name: "Cédric Wehrle",
              lab: "LAB-U",
              labURL: "https://www.epfl.ch/labs/lab-u/",
            },
          ],
        },
        {
          name: "Data viz team",
          members: [
            {
              name: "Charlie Weil",
              lab: "ENAC-IT4R",
              labURL: "https://enacit4r.epfl.ch/",
            },
            {
              name: "Samuel Bancal",
              lab: "ENAC-IT4R",
              labURL: "https://enacit4r.epfl.ch/",
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState({
      landmarkFocusId: "landmarkFocusId",
    }),
  },
  methods: {
    goToIntro() {
      this.$router.push({ name: "Intro" });
    },
  },
};
</script>
