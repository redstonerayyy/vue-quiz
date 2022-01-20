<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="d-sm-flex col-main">
          <v-sheet min-height="90vh" rounded="lg">
            <router-view
              @answer-clicked="answerClicked"
              :question="question"
              :right="right"
              :answers="answers"
              :answered="answered"
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
    answered: false,
  }),
  methods: {
    answerClicked() {
      this.answered = true;
    },
    decode(str) {
      var textarea = document.createElement("textarea");
      textarea.innerHTML = str;
      return textarea.value;
    },
  },
  async created() {
    let res = await fetch("http://localhost:5000/results", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    let num = Math.floor(Math.random() * 10);
    this.question = this.decode(data[num].question);
    this.right = this.decode(data[num].correct_answer);
    this.answers = [
      ...data[num].incorrect_answers,
      data[num].correct_answer,
    ].map((el) => this.decode(el));
  },
};
</script>

<style scoped>
.col-main {
  justify-content: center;
}
</style>