<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
.full-height {
  height: 100%;
}
.flex-even {
  flex: 1 1 0;
}
</style>
