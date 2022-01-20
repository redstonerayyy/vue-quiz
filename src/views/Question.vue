<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="d-sm-flex col-main">
        <v-sheet min-height="90vh" rounded="lg">
          <div class="question-view">
            <p class="question">{{ question }}</p>
            <Timer :time="this.time" />
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
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Answer from "../components/Answer.vue";
import Timer from "../components/Timer.vue";

export default {
  name: "Home",
  components: {
    Answer,
    Timer,
  },
  data() {
    return {
      time: 15,
      question: "",
      right: "",
      answers: ["1", "2", "3", "4"],
      answered: false,
    };
  },
  methods: {
    answerClicked() {
      this.answered = true;
      clearInterval(this.timer);
      this.next = setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    },
    decode(str) {
      var textarea = document.createElement("textarea");
      textarea.innerHTML = str;
      return textarea.value;
    },
    timeout() {
      this.answered = true;
      this.next = setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    },
  },
  async created() {
    let res = await fetch("api");
    let data = await res.json();
    data = data.results[0];
    this.question = this.decode(data.question);
    this.right = this.decode(data.correct_answer);
    this.answers = [...data.incorrect_answers, data.correct_answer].map((el) =>
      this.decode(el)
    );
    for (let i = 0; i < this.answers.length; i++) {
      this.answers = this.answers.sort(() => 0.5 > Math.random());
    }
    this.timer = setInterval(() => {
      this.time -= 1;
      if (this.time < 1) {
        clearInterval(this.timer);
        this.timeout();
      }
    }, 1000);
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
  margin: 100px;
  text-align: center;
}

.col-main {
  justify-content: center;
}
</style>
