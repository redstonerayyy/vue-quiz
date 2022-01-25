<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="d-sm-flex col-main">
        <div
          class="question-view"
          v-if="this.$store.state.questions.current_question"
        >
          <p class="question">{{ question_text }}</p>
          <div class="stats-container">
            <span class="total stats-counter">Total: {{ stats_total }} </span>
            <span class="right stats-counter">Right: {{ stats_right }} </span>
            <span class="wrong stats-counter">Wrong: {{ stats_wrong }} </span>
            <span class="unanswered stats-counter"
              >Unanswered: {{ stats_unanswered }}
            </span>
            <span class="remaining"
              >{{ this.$store.state.stats.current_quiz.total }} /
              {{ this.$store.state.settings.number }}</span
            >
          </div>
          <v-progress-linear
            :value="
              (this.$store.state.stats.current_quiz.total /
                this.$store.state.settings.number) *
              100
            "
          ></v-progress-linear>
          <p>{{ this.time }}</p>
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
        <div v-if="this.$store.state.questions.isFinished">
          <p style="text-align: center">Stats for this Quiz</p>
          <div class="stats-container">
            <span class="total stats-counter"
              >Total: {{ this.$store.state.stats.current_quiz.total }}
            </span>
            <span class="right stats-counter"
              >Right: {{ this.$store.state.stats.current_quiz.right }}
            </span>
            <span class="wrong stats-counter"
              >Wrong: {{ this.$store.state.stats.current_quiz.wrong }}
            </span>
            <span class="unanswered stats-counter"
              >Unanswered:
              {{ this.$store.state.stats.current_quiz.not_answered }}
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Answer from "../components/Answer.vue";
import Timer from "../scripting/Timer";
import { mapState } from "vuex";
import fetchQuestions from "../scripting/FetchQuestions";
import syncWithBackend from "../scripting/SyncWithBackend";

export default {
  name: "Home",
  components: {
    Answer,
  },
  data() {
    return {};
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
    time: (state) => (state.timer.time ? state.timer.time : ""),
  }),
  watch: {
    $route: function () {
      this.$store.state.timer.reset();
    },
  },
  methods: {
    startQuestion() {
      this.$store.state.questions.timeEnded = false;
      this.$store.commit("setIsClickDisabled", false);
      this.$store.commit("setIsAnswered", false);
      this.$store.commit("setIsAnswerCorrect", false);
      this.$store.state.timer = new Timer(15, 1, this.timeEnded);
      this.$store.state.timer.start();
    },
    answerClicked() {
      //check so clicking multiple times doesn't spawn a number of setInterval processes
      if (!this.$store.state.questions.isClickDisabled) {
        this.$store.commit("setIsClickDisabled", true);
        this.$store.state.timer.stop();
        this.$store.commit("setIsAnswered", true);
        this.prepareNextQuestion();
      }
    },
    timeEnded() {
      this.$store.commit("setIsClickDisabled", true);
      this.$store.state.questions.timeEnded = true;
      this.$store.commit("setIsAnswered", false);
      this.prepareNextQuestion();
    },
    prepareNextQuestion() {
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
      setTimeout(() => {
        //next question
        if (this.$store.state.questions.fetched.length <= 0) {
          this.questionsFinished();
        } else {
          this.$store.commit("nextQuestion");
          this.startQuestion();
        }
      }, 2000);
    },
    questionsFinished() {
      this.$store.state.questions.current_question = false;
      this.$store.state.questions.isFinished = true;
      syncWithBackend();
    },
  },
  created() {
    if (
      !this.$store.state.questions.isFinished &&
      this.$store.state.categoryinfo.trivia_categories
    ) {
      let selected_categories = this.$store.state.settings.selects.category;
      let category_ids =
        this.$store.state.categoryinfo.trivia_categories.filter((category) => {
          if (selected_categories.includes(category.name)) {
            return true;
          } else {
            return false;
          }
        });
      category_ids = category_ids.map((category) => category.id);
      for (let i = 0; i < this.$store.state.settings.number; i++) {
        fetchQuestions(
          1,
          category_ids[Math.floor(category_ids.length * Math.random())],
          this.$store.state.settings.selects.difficulty[
            Math.floor(
              this.$store.state.settings.selects.difficulty.length *
                Math.random()
            )
          ],
          this.$store.state.settings.selects.type[
            Math.floor(
              this.$store.state.settings.selects.type.length * Math.random()
            )
          ]
        ).then((questions) => {
          this.$store.commit("addQuestion", questions[0]);
          if (!this.$store.state.questions.current_question) {
            this.$store.commit("nextQuestion");
            this.startQuestion();
          }
        });
      }
    }
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

.stats-counter {
  border-radius: 5px;
  color: white;
  padding: 5px;
  margin: 10px;
  display: inline-block;
}

.total {
  background: blue;
}

.right {
  background: green;
}

.wrong {
  background: red;
}

.unanswered {
  background: turquoise;
}

.stats-countainer {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
}
</style>
