<template>
  <div class="d-flex flex-row align-end">
    <v-card flat>
      <v-card-title class="pt-0 pb-0">
        Water fluxes in time
        <InfoTooltipTimeseries />
      </v-card-title>

      <v-card-text>
        <div>
          <div v-for="(serie, index) in TIMESERIES_LINES_ATTRS" :key="index">
            <v-card flat>
              <v-card-title>
                {{ serie.name }}
              </v-card-title>
              <v-card-text>
                <div
                  class="d-flex flex-row"
                  v-for="entry in serie.entries"
                  :key="entry.label"
                >
                  <div
                    class="color-square ma-1"
                    :style="{ backgroundColor: entry.color }"
                  />
                  {{ entry.label }}
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import InfoTooltipTimeseries from "@/infos/InfoTooltipTimeseries";
import { TIMESERIES_LINES_ATTRS } from "@/utils/app";
export default {
  name: "TimeseriesLegend",
  data() {
    return {
      TIMESERIES_LINES_ATTRS,
    };
  },
  components: {
    InfoTooltipTimeseries,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.color-square {
  width: 15px;
  height: 15px;
}
</style>
