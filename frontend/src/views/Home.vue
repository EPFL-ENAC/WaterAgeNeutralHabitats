<template>
  <div class="d-flex full-height">
    <!-- About section -->
    <v-navigation-drawer v-model="aboutDrawer" app class="pa-5" width="25%">
      <div class="text-h5">
        About
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

      <v-card flat class="pa-2 d-flex justify-center">
        <v-btn @click="goToIntro">See intro</v-btn>
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
                <v-avatar size="60px">
                  <img
                    class="pa-1"
                    v-if="contrib.pic"
                    alt="Pic"
                    :src="'/pictures/' + contrib.pic"
                  />
                </v-avatar>
                <v-list-item-content style="padding: 8px 8px">
                  <v-list-item-title>
                    {{ contrib.name }},
                    <a :href="contrib.labURL">{{ contrib.lab }}</a>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
      </v-card>

      <v-card flat class="ma-2">
        <v-img height="30x" src="/epfl_enacit4r.png"></v-img>
      </v-card>
    </v-navigation-drawer>

    <!-- Main Dashboard -->
    <div class="d-flex flex-column grey lighten-4">
      <v-card class="grey lighten-4" flat>
        <v-card-title
          class="text-h4 font-weight-bold"
          :style="{ wordBreak: 'break-word' }"
        >
          Urban Water Cycle Re-Design
          <v-icon x-large class="ma-2" @click="aboutDrawer = !aboutDrawer">
            {{ MDI_ICONS.about }}
          </v-icon>
        </v-card-title>
        <v-card-subtitle class="text-h5 font-italic"> Berlin </v-card-subtitle>
      </v-card>
      <div class="d-flex flex-row flex-grow-1 ma-2 justify-space-around">
        <div class="d-flex flex-column">
          <LandmarksControl class="flex-grow-1" />
          <!-- Not ready yet
          <v-btn class="ma-1" @click="compareUrbanFabricTypes">
            Compare urban<br />fabric types
          </v-btn>
          -->
        </div>
        <div class="d-flex flex-column">
          <Controls />
          <TimeseriesLegend class="flex-grow-1" />
          <v-btn class="ma-1" @click="scatterplotVisible = true">
            Permeability
          </v-btn>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column flex-grow-1">
      <Maps :landmarksIds="[landmarkFocusId]" />
      <Timeseries />
    </div>
    <v-dialog
      class="d-flex flex-column"
      v-model="scatterplotVisible"
      max-width="70%"
      scrollable
    >
      <Scatterplot class="flex-grow-1" />
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
// @ is an alias to /src
import Maps from "@/components/Maps.vue";
import Timeseries from "@/components/Timeseries.vue";
import LandmarksControl from "@/components/LandmarksControl.vue";
import TimeseriesLegend from "@/components/TimeseriesLegend.vue";
import Controls from "@/components/Controls.vue";
import Scatterplot from "@/components/Scatterplot";
import { MDI_ICONS } from "@/utils/app";

export default {
  name: "Home",
  components: {
    Maps,
    Timeseries,
    LandmarksControl,
    TimeseriesLegend,
    Controls,
    Scatterplot,
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
              pic: "martina.jpg",
              lab: "LAB-U",
              labURL: "https://www.epfl.ch/labs/lab-u/",
            },
            {
              name: "Paolo Benettin",
              pic: "paolo.jpg",
              lab: "ECHO",
              labURL: "https://www.epfl.ch/labs/echo/",
            },
            {
              name: "Cédric Wehrle",
              pic: "cedric.jpg",
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
              pic: "charlie.jpg",
              lab: "ENAC-IT4R",
              labURL: "https://enacit4r.epfl.ch/",
            },
            {
              name: "Samuel Bancal",
              pic: "samuel.jpg",
              lab: "ENAC-IT4R",
              labURL: "https://enacit4r.epfl.ch/",
            },
          ],
        },
      ],
      scatterplotVisible: false,
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
    compareUrbanFabricTypes() {
      this.$router.push({ name: "CompareUrbanFabricTypes" });
    },
  },
};
</script>
