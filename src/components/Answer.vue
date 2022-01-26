<template>
  <v-chip
    :color="color"
    :outlined="
      answer_correct && this.$store.state.questions.isAnswered ? false : true
    "
    label
    large
    @click="answerClicked"
    >{{ text }}</v-chip
  >
</template>

<script>
export default {
  name: "Answer",
  props: {
    text: String,
    answer_correct: Boolean,
  },
  computed: {
    color() {
      if (this.answer_correct && this.$store.state.questions.isAnswered) {
        return "green";
      } else {
        if (this.$store.state.questions.isAnswered && this.clicked) {
          return "red";
        } else if (
          this.$store.state.questions.timeEnded &&
          this.answer_correct
        ) {
          return "green";
        } else {
          return "black";
        }
      }
    },
  },
  methods: {
    answerClicked() {
      this.$store.state.questions.current_answer = this.text;
      this.clicked = true;
      this.$emit("answer-clicked");
    },
  },
};
</script>

<style scoped>
span {
  width: 40%;
  padding: 20px;
  margin: 20px;
  min-width: 200px;
}
</style>
