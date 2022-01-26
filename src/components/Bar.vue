<template>
  <v-app-bar app color="white" flat>
    <v-tabs centered class="ml-n9" color="grey darken-1">
      <v-tab v-for="link in links" :key="link[0]" :to="link[1]">
        {{ link[0] }}
      </v-tab>
    </v-tabs>
    <v-avatar color="indigo" size="44">{{
      this.$store.state.login.username[0]
        ? this.$store.state.login.username[0].toUpperCase()
        : ""
    }}</v-avatar>
  </v-app-bar>
</template>

<script>
export default {
  name: "Bar",
  data: () => ({
    links: [
      ["Home", "/home"],
      ["Quiz", "/quiz"],
      ["Profile", "/profile"],
      ["About", "/about"],
    ],
  }),
};
</script>
