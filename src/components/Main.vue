<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="12">
          <v-sheet min-height="90vh" rounded="lg">
            <router-view
              :question="question"
              :right="right"
              :answers="answers"
            />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: () => ({
    question: "asdf",
    right: "a",
    answers: ["a", "b", "c", "d"],
  }),
};
</script>
