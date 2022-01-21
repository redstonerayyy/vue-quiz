<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="d-sm-flex col-main">
        <div
          class="question-view"
          v-if="this.$store.state.questions.current_question"
        >
          <p class="question">{{ question_text }}</p>
          <p>
            Total:{{ stats_total }} Right:{{ stats_right }} Wrong:{{
              stats_wrong
            }}
            Unanswered:{{ stats_unanswered }}
          </p>
          <Timer :time="this.time" />
          <div class="answers">
            <Answer
              @answer-clicked="answerClicked"
              :text="answer"
              :key="answer"
              v-for="answer in answers"
              :answer_correct="answer === correct_answer"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Answer from "../components/Answer.vue";
import Timer from "../components/Timer.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Answer,
    Timer,
  },
  data() {
    return {
      time: 15,
    };
  },
  computed: mapState({
    question_text: (state) => state.questions.current_question.question_text,
    correct_answer: (state) => state.questions.current_question.correct_answer,
    answers: (state) => state.questions.current_question.answers,
    answered: (state) => state.questions.answered,
    stats_right: (state) => state.stats.right,
    stats_wrong: (state) => state.stats.wrong,
    stats_unanswered: (state) => state.stats.not_answered,
    stats_total: (state) => state.stats.total,
  }),
  methods: {
    answerClicked() {
      //check so clicking multiple times doesn't spawn a number of setInterval processes
      if (!this.$store.state.questions.isClickDisabled) {
        this.$store.commit("setIsAnswered", true);
        this.$store.commit("setIsClickDisabled", true);
        this.stopTimer();
        this.prepareNextQuestion();
      }
    },
    async fetchQuestion() {
      let res = await fetch("api");
      let json = await res.json();
      //TODO handle response code
      let question = json.results[0];
      //decode html entities like &#23;
      question.question_text = this.decodeHtmlEntities(
        json.results[0].question
      );
      question.correct_answer = this.decodeHtmlEntities(
        json.results[0].correct_answer
      );
      question.answers = [
        ...question.incorrect_answers,
        question.correct_answer,
      ].map((el) => this.decodeHtmlEntities(el));
      //reorder answers
      if (question.type === "multiple") {
        for (let i = 0; i < question.answers.length; i++) {
          question.answers = question.answers.sort(() => 0.5 > Math.random());
        }
      } else {
        question.answers = ["True", "False"];
      }
      //add to store
      this.$store.commit("addQuestion", question);
      return true;
    },
    decodeHtmlEntities(str) {
      var textarea = document.createElement("textarea");
      textarea.innerHTML = str;
      return textarea.value;
    },
    async prepareNextQuestion() {
      this.fetchQuestion();
      setTimeout(() => {
        //add to stats
        if (
          this.$store.state.questions.current_question.correct_answer ===
          this.$store.state.questions.current_answer
        ) {
          this.$store.commit("incrementRightCount");
        } else if (!this.$store.state.questions.isAnswered) {
          this.$store.commit("incrementUnansweredCount");
        } else {
          this.$store.commit("incrementWrongCount");
        }
        this.$store.commit("incrementTotalCount");
        this.$store.state.questions.timeEnded = false;
        this.$store.commit("nextQuestion");
        this.$store.commit("setIsClickDisabled", false);
        this.startTimer();
      }, 2000);
    },
    timeEnded() {
      this.$store.commit("setIsClickDisabled", true);
      this.$store.state.questions.timeEnded = true;
      this.$store.commit("setIsAnswered", false);
      this.prepareNextQuestion();
    },
    startTimer() {
      this.setTime(15);
      this.timer = setInterval(() => {
        this.time -= 1;
        if (this.time < 1) {
          this.stopTimer();
          this.timeEnded();
        }
      }, 1000);
    },
    setTime(time) {
      this.time = time;
    },
    stopTimer() {
      clearInterval(this.timer);
    },
  },
  async created() {
    this.fetchQuestion().then(() => {
      this.$store.commit("nextQuestion");
      this.startTimer();
    });
    this.fetchQuestion();
  },
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
  margin: 70px;
  text-align: center;
}

.col-main {
  justify-content: center;
}
</style>
