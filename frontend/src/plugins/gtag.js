import Vue from "vue";
import VueGtag from "vue-gtag";

import { GTAG } from "@/utils/app";

if (GTAG.id !== "") {
  Vue.use(VueGtag, {
    config: {
      id: GTAG.id,
      params: GTAG.params,
    },
  });
}
