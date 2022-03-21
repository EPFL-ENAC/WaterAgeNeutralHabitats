<template>
  <div>
    <v-dialog v-model="showDialog">
      <v-stepper v-model="currentStep">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1">
            Watershed
          </v-stepper-step>
          <v-stepper-step :complete="currentStep > 2" step="2">
            Subwatershed
          </v-stepper-step>
          <v-stepper-step step="3"> Urban fabric types </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="step-card mb-12 d-flex flex-column" flat>
              <v-row>
                <v-col cols="6">
                  <div>
                    Re-designing the urban water cycle: Towards
                    Water-Age-Neutral
                  </div>
                  <div>
                    Habitats Knowledge of how to articulate the “urban
                    transition” is today urgently needed. Urbanization is on a
                    steadily growing trend that impacts the water cycle as a
                    whole. However, while the effects of urbanised/urbanising
                    areas on water quantity (how much water) have been well
                    studied for flood prevention, other effects - as those
                    related to water quality (which water) - are mostly unknown.
                    Taking hold from the most recent developments on the “water
                    age” concept, i.e., the time that water resides in the
                    landscape before exiting as runoff or evaporation, we
                    propose a proof-of-concept study on the notion of
                    “water-age-neutral” design. This concept envisions the
                    possibility of lowering - through design - net impacts on
                    the city-territory's “natural” water age balance. This
                    project's case study lies within the Panke river catchment
                    in Berlin (DE).
                  </div>
                </v-col>
                <v-col cols="6">
                  <div id="introMap0" class="oneLeafletMap" />
                </v-col>
              </v-row>
              <v-spacer />
              <v-card-actions>
                <v-spacer />
                <v-btn text @click="closeDialog"> Skip intro </v-btn>
                <v-btn color="primary" @click="nextStep"> &#62; </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="step-card mb-12 d-flex flex-column" flat>
              <v-row>
                <v-col cols="6">
                  In order to showcase the heterogeneous effects of urbanization
                  on the water cycle and the way design strategies can minimize
                  this impact, we have selected four samples of 250x250 meters
                  each, located within the Pankow district and sub-watershed.
                  The Pankow district lies at the edge of the 19th Century
                  expansion of Berlin, and thus features a varied and spectrum
                  of urbanization patterns, representative of 20th Century
                  building practices. Each sample represents a specific urban
                  built type: open block housing, housing slabs, single family
                  housing, and industry.
                </v-col>
                <v-col cols="6">
                  <div id="introMap1" class="oneLeafletMap" />
                </v-col>
              </v-row>
              <v-spacer />
              <v-card-actions>
                <v-spacer />
                <v-btn text @click="prevStep"> &#60; </v-btn>
                <v-btn color="primary" @click="nextStep"> &#62; </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="step-card mb-12 d-flex flex-column" flat>
              <v-row>
                <v-col cols="6">
                  A set of water/land-use interaction patterns and their outputs
                  in terms of water flow partitioning are modeled and analyzed
                  to evaluate the impact of land-use/urban form on the water
                  cycle. In particular, this model examines the division of
                  precipitation between surface runoff, evapotranspiration, and
                  leakage (infiltration), and how this proportion changes over
                  time and in accordance with different design interventions.
                  Following a detailed survey of the existing situation, a
                  series of design strategies have been implemented on each
                  urban built type. Each design strategy relates to a single
                  urban element (e.g., parking lots, sidewalks, flat roofs,
                  secondary streets, etc.), and are combined to construct two
                  urban transformation scenarios - a conservative and a radical
                  one. Each design strategy and scenario can be compared between
                  each other, between built types, and through time.
                </v-col>
                <v-col cols="6">
                  <v-row>
                    <v-col
                      v-for="(landmark, index) in LANDMARKS"
                      :key="index"
                      cols="6"
                    >
                      <v-card flat>
                        <v-img
                          :src="landmark.svg"
                          :alt="landmark.name"
                          max-height="100%"
                          max-width="100%"
                        />
                        <span class="d-flex justify-center subtitle-1">
                          {{ landmark.name }}
                        </span>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-spacer />
              <v-card-actions>
                <v-spacer />
                <v-btn text @click="prevStep"> &#60; </v-btn>
                <v-btn color="primary" @click="nextStep"> Explore </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </div>
</template>

<script>
import L from "leaflet";
const axios = require("axios");

import { LANDMARKS, URLS } from "@/utils/app";
export default {
  name: "IntroStepper",
  data() {
    return {
      LANDMARKS,
      showDialog: true,
      currentStep: 1,
      attribution: "Tiles &copy; Esri",
      introMaps: [], // set in mounted
      nbMaps: 2,
      landmarkFocusId: 0,
      waterBlue: "#7db1f5",
      geojsonData: {},
    };
  },
  watch: {
    showDialog: {
      handler() {
        this.$router.push({ name: "Home" });
      },
    },
  },
  mounted() {
    this.introMaps = new Array(this.nbMaps).fill().map((_val, index) => {
      return L.map(`introMap${index}`, {
        layers: [
          L.tileLayer(URLS.tiles, {
            attribution: this.attribution,
          }),
        ],
        center: LANDMARKS[this.landmarkFocusId].center,
        zoom: LANDMARKS[this.landmarkFocusId].zoom,
      });
    });

    this.leafletBugWorkaround();

    // Display watershed on map1
    URLS.PankeWatershedGeojsons.map((url) =>
      this.displayVectorData(url, this.introMaps[1])
    );
  },
  methods: {
    closeDialog() {
      this.showDialog = false;
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep -= 1;
        this.leafletBugWorkaround();
      } else {
        this.closeDialog();
      }
    },
    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep += 1;
        this.leafletBugWorkaround();
      } else {
        this.closeDialog();
      }
    },
    displayVectorData(geojsonFilepath, map) {
      const url = geojsonFilepath;
      axios
        .get(url)
        .then((response) => {
          if (response.data instanceof Object) {
            return response.data;
          } else {
            throw new Error("Error parsing data received from " + url);
          }
        })
        .then((data) => {
          this.geojsonData[geojsonFilepath] = data;
          L.geoJSON(this.geojsonData[geojsonFilepath], {
            style: {
              color: this.waterBlue,
              fillColor: this.waterBlue,
              fillOpacity: 0.6,
            },
          }).addTo(map);
        })
        .catch((error) => {
          console.log("Error", { error });
        });
    },
    leafletBugWorkaround() {
      // Threre is a known bug in vue-leaflet
      // https://github.com/vue-leaflet/Vue2Leaflet/issues/96#issuecomment-1022346171
      // this is the workaround
      setTimeout(function () {
        window.dispatchEvent(new Event("resize"));
      }, 250);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.step-card {
  height: 70vh;
}
.oneLeafletMap {
  height: 65vh;
}
</style>
