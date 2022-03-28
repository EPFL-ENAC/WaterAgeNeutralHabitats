import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/Intro",
  },
  {
    path: "/Intro",
    name: "Intro",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Intro" */ "../views/Intro.vue"),
  },
  {
    path: "/Home",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
  },
  {
    path: "/CompareUrbanFabricTypes",
    name: "CompareUrbanFabricTypes",
    component: () =>
      import(
        /* webpackChunkName: "CompareUrbanFabricTypes" */ "../views/CompareUrbanFabricTypes.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
