<template>
  <v-app>
    <Bar />
    <Main />
  </v-app>
</template>

<script>
import Bar from "./components/Bar.vue";
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Bar,
    Main,
  },
  data: () => ({
    //
  }),
};
</script>
