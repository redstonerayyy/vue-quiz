<template>
  <div class="question-view">
    <p class="question">{{ question }}</p>
    <div class="answers">
      <Answer
        @answer-clicked="$emit('answer-clicked', text)"
        :text="answer"
        :key="answer"
        v-for="answer in answers"
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
  },
  components: {
    Answer,
  },
};
</script>

<style scoped>
.question-view {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
}
</style>
