const mutations = {
  addQuestion(state, question) {
    state.questions.fetched.push(question);
  },
  nextQuestion(state) {
    state.questions.current_question = state.questions.fetched[0];
    state.questions.fetched = state.questions.fetched.slice(1);
    state.questions.isAnswerCorrect = false;
    state.questions.isAnswered = false;
  },
  shuffleFetched(state, times) {
    for (let i = 0; i < times; i++) {
      state.questions.fetched = state.questions.fetched.sort(
        () => Math.random() < 0.5
      );
    }
  },
  setIsAnswered(state, boolean) {
    state.questions.isAnswered = boolean;
  },
  setIsAnswerCorrect(state, boolean) {
    state.questions.isAnswerCorrect = boolean;
  },
  setIsClickDisabled(state, boolean) {
    state.questions.isClickDisabled = boolean;
  },
  setCurrentAnswer(state, answer) {
    state.questions.current_answer = answer;
  },
  incrementWrongCount(state) {
    state.stats.wrong++;
  },
  incrementRightCount(state) {
    state.stats.right++;
  },
  incrementUnansweredCount(state) {
    state.stats.not_answered++;
  },
  incrementTotalCount(state) {
    state.stats.total++;
  },
  setSelect(state, value) {
    state.settings.selects[value[0]] = value[1];
  },
};

export default mutations;
