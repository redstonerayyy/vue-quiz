import { decodeHtmlEntities } from "./Helpers.js";

async function fetchQuestions(amount, category, difficulty, type) {
  //max amount 50
  //contruct request url parameters
  let urlparams = new URLSearchParams();
  urlparams.append("amount", amount);
  urlparams.append("category", category);
  urlparams.append("difficulty", difficulty);
  urlparams.append("type", type);
  //make request
  let res = await fetch("/api?request=question&" + urlparams.toString());
  let json = await res.json();
  //TODO handle response code
  if (json.response_code !== 0) {
    //
  }
  //store the question in a special format
  let questions_as_json = json.results;
  let questions = [];
  questions_as_json.forEach((question) => {
    //decode html entities like &#23;
    question.question_text = decodeHtmlEntities(json.results[0].question);
    question.correct_answer = decodeHtmlEntities(
      json.results[0].correct_answer
    );
    question.answers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ].map((el) => decodeHtmlEntities(el));
    //reorder answers
    if (question.type === "multiple") {
      for (let i = 0; i < question.answers.length; i++) {
        question.answers = question.answers.sort(() => 0.5 > Math.random());
      }
    } else {
      question.answers = ["True", "False"];
    }
    questions.push(question);
  });
  return questions;
}

export default fetchQuestions;
