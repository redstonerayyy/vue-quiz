<template>
  <div class="question-view">
    <p class="question">{{ question }}</p>
    <div class="answers">
      <Answer
        @answer-clicked="answerClicked"
        :text="answer"
        :key="answer"
        v-for="answer in answers"
        :right="answered && answer === right ? true : false"
      />
    </div>
  </div>
</template>

<script>
import Answer from "../components/Answer.vue";

export default {
  name: "Home",
  props: {
    question: String,
    right: String,
    answers: Array,
    answered: Boolean,
  },
  components: {
    Answer,
  },
  methods: {
    answerClicked(answer) {
      this.$emit("answer-clicked", answer);
    },
  },
  emits: ["answer-clicked"],
};
</script>

<style scoped>
.question-view {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;
}

.answers {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.question {
  margin: 100px;
  text-align: center;
}
</style>
