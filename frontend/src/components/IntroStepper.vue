<template>
  <div>
    <v-dialog v-model="showDialog" max-width="1200px">
      <v-stepper v-model="currentStep">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 0" step="0">
            Welcome
          </v-stepper-step>
          <v-stepper-step :complete="currentStep > 1" step="1">
            Watershed
          </v-stepper-step>
          <v-stepper-step :complete="currentStep > 2" step="2">
            Subwatershed
          </v-stepper-step>
          <v-stepper-step step="3"> Urban fabric types </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="0">
            <v-card class="step-card d-flex flex-column" flat>
              <v-card-title :class="titleClasses" :style="titlesStyle">
                Re-designing the urban water cycle
              </v-card-title>
              <v-card-text :class="textClasses">
                <v-row>
                  <v-col class="fill-height" cols="6">
                    There is a strong relationship between the magnitude of
                    water fluxes (surface runoff, infiltration,
                    evapotranspiration) and the fraction of permeable surfaces
                    in a given landscape. Urban and territorial design can
                    deeply modify this fraction and its associated fluxes.
                  </v-col>
                  <v-col cols="6">
                    <v-img
                      :src="URLS.welcomeImage.png"
                      :alt="URLS.welcomeImage.alt"
                      max-height="100%"
                      max-width="100%"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-spacer />
              <v-card-actions>
                <v-spacer />
                <v-btn text @click="closeDialog"> Skip intro </v-btn>
                <v-btn color="primary" @click="nextStep"> &#62; </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="1">
            <v-card class="step-card d-flex flex-column" flat>
              <v-card-text :class="textClasses">
                <v-row>
                  <v-col class="fill-height" cols="5">
                    Urbanization is on a steadily growing trend that impacts the
                    water cycle as a whole. However, while the effects of
                    urbanized/urbanizing areas on water quantity (how much
                    water) have been well studied for flood prevention, other
                    effects – such as those related to water quality (which
                    water) – are mostly unknown. <br /><br />
                    Taking hold from the most recent developments in the fields
                    of environmental science and urbanism, we propose to study
                    the impact of urban planning on the water cycle, exploring
                    the possibility of lowering – through design – net impacts
                    on the water cycle of urbanized areas. This project’s case
                    study lies within the Panke river catchment in Berlin (DE).
                  </v-col>
                  <v-col cols="7">
                    <div id="introMap0" class="oneLeafletMap" />
                    <div class="text-caption">
                      Panke river in blue; Watersheds in white
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-spacer />
              <v-card-actions>
                <v-spacer />
                <v-btn text @click="prevStep"> &#60; </v-btn>
                <v-btn color="primary" @click="nextStep"> &#62; </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="step-card d-flex flex-column" flat>
              <v-card-text :class="textClasses">
                <v-row>
                  <v-col class="fill-height" cols="4">
                    In order to showcase the heterogeneous effects of
                    urbanization on the water cycle and the way design
                    strategies can minimize this impact, we selected 4 samples
                    of 250x250m, located within the Pankow district and
                    sub-watershed. The Pankow district lies at the edge of the
                    19th Century expansion of Berlin, and thus features a varied
                    and spectrum of urbanization patterns, representative of
                    20th Century building practices. Each sample represents a
                    specific urban built type: open block housing, housing
                    slabs, single family housing, and industry.
                  </v-col>
                  <v-col cols="8">
                    <div id="introMap1" class="oneLeafletMap" />
                    <div class="text-caption">
                      Pankow watershed in white; 250x250 meters samples in red
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-spacer />
              <v-card-actions>
                <v-spacer />
                <v-btn text @click="prevStep"> &#60; </v-btn>
                <v-btn color="primary" @click="nextStep"> &#62; </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="step-card d-flex flex-column" flat>
              <v-card-text :class="textClasses">
                <v-row>
                  <v-col class="fill-height" cols="5">
                    A set of water/land-use interaction patterns and their
                    outputs in terms of water flow partitioning are modeled and
                    analyzed to evaluate their impact on the water cycle. In
                    particular, this model examines the division of
                    precipitation between surface runoff, evapotranspiration,
                    and leakage (infiltration), and how this proportion changes
                    over time and in accordance with different design
                    interventions. <br /><br />
                    Following a detailed survey, a series of design strategies
                    have been implemented on each urban built type. Each design
                    strategy relates to a single urban element (e.g., parking
                    lots, secondary streets), and are combined to construct two
                    urban transformation scenarios - a conservative and a
                    radical one.
                  </v-col>
                  <v-col cols="7">
                    <v-row>
                      <v-col
                        v-for="(landmark, index) in LANDMARKS"
                        :key="index"
                        cols="6"
                      >
                        <div class="d-flex flex-column">
                          <v-img
                            :src="landmark.svg"
                            :alt="landmark.name"
                            max-height="100%"
                            max-width="100%"
                          />
                          <div class="landmarkText">
                            {{ landmark.name }}
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
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

import { LANDMARKS, URLS, TILES } from "@/utils/app";
export default {
  name: "IntroStepper",
  data() {
    return {
      LANDMARKS,
      URLS,
      showDialog: true,
      currentStep: 0,
      introMaps: [], // set in mounted
      nbMaps: 2,
      mapsSetup: [
        {
          center: { lat: 52.63911414937194, lng: 13.511123657226564 },
          zoom: 11,
        },
        {
          center: { lat: 52.574606315912796, lng: 13.41585159301758 },
          zoom: 14,
        },
      ],
      landmarkFocusId: 0,
      waterBlue: "#7db1f5",
      white: "#ffffff",
      red: "#e81717",
      transparent: "#ffffff00",
      geojsonData: {},
      titlesStyle: { wordBreak: "break-word" },
      titleClasses: ["text-h2"],
      textClasses: ["text-h5", "text-justify", "d-flex"],
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
          L.tileLayer(TILES.default.url, {
            attribution: TILES.default.attribution,
          }),
          L.tileLayer(TILES.stamen.url, {
            attribution: TILES.stamen.attribution,
            subdomains: TILES.stamen.subdomains,
            minZoom: TILES.stamen.minZoom,
            maxZoom: TILES.stamen.maxZoom,
            ext: TILES.stamen.ext,
          }),
        ],
        center: this.mapsSetup[index].center,
        zoom: this.mapsSetup[index].zoom,
      });
    });

    this.leafletBugWorkaround();

    // Display GeoJSONs on introMaps
    // Step 1
    this.displayVectorData(
      URLS.pankePankowWatershedGeojson,
      this.introMaps[0],
      {
        color: this.white,
        weight: 2,
        fillColor: this.white,
        fillOpacity: 1,
      }
    );
    this.displayVectorData(URLS.watershedGeojson, this.introMaps[0], {
      color: this.white,
      weight: 3,
      fillColor: this.transparent,
    });
    this.displayVectorData(URLS.pankeRiverlineGeojson, this.introMaps[0], {
      color: this.waterBlue,
      weight: 2,
      fillColor: this.transparent,
    });

    // Step 2
    this.displayVectorData(
      URLS.pankePankowWatershedGeojson,
      this.introMaps[1],
      {
        color: this.white,
        fillColor: this.transparent,
      }
    );
    [
      URLS.extentIndustryGeojson,
      URLS.extentOpenBlocksGeojson,
      URLS.extentSingleFamilyHousingGeojson,
      URLS.extentSlabsGeojson,
    ].map((url) => {
      this.displayVectorData(url, this.introMaps[1], {
        color: this.red,
        fillColor: this.transparent,
      });
    });

    window.addEventListener("keydown", this.keyUpHandler);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyUpHandler);
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
    displayVectorData(geojsonFilepath, map, style) {
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
          L.geoJSON(this.geojsonData[geojsonFilepath], style).addTo(map);
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
    keyUpHandler(e) {
      if (e.key === "ArrowRight") {
        this.nextStep();
      } else if (e.key === "ArrowLeft") {
        this.prevStep();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.step-card {
  height: 70vh;
}
.step-card .v-card__text {
  height: 91%;
}
.step-card .fill-height.col {
  overflow-y: scroll;
}
.oneLeafletMap {
  height: 60vh;
}
.landmarkText {
  text-align: center;
}
</style>
