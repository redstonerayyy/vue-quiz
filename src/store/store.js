import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import mutations from "./mutations";

const store = new Vuex.Store({
  state: {
    login: {
      loggedin: false,
      username: "anton",
    },
    questions: {
      fetched: [],
      current_question: false,
      current_answer: "",
      isAnswered: false,
      isAnswer_correct: false,
      isClickDisabled: false,
      timeEnded: false,
    },
    settings: {
      selects: {},
    },
    stats: {
      total: 0,
      right: 0,
      wrong: 0,
      not_answered: 0,
    },
  },
  mutations: mutations,
});

export default store;
