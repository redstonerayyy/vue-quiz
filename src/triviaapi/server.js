import express from "express";
import TriviaAPI from "./trivia.mjs";
import { findUser, storeUser, connect, deleteUsers } from "./database.mjs";

connect("mongodb://localhost:27017/quiz").then(() => {
  //
});

const trivia = new TriviaAPI();
const app = express();

app.get("/api", async (req, res) => {
  let urlparams = new URLSearchParams(req.query);
  let urldata = {};
  for (let [name, value] of urlparams) {
    urldata[name] = value;
  }
  let data;
  switch (urldata.request) {
    case "globalinfo":
      res.send(JSON.stringify(trivia.globalinfo));
      break;

    case "categoryinfo":
      data = await trivia.request(trivia.getCategoryInfo(urldata.category));
      res.send(JSON.stringify(data.data));
      break;

    case "categories":
      res.send(JSON.stringify(trivia.categoryinfo));
      break;

    case "question":
      data = await trivia.request(
        trivia.makeURL(
          urldata.amount,
          urldata.category,
          urldata.difficulty,
          urldata.type,
          trivia.token
        )
      );

      //console.log(data.data.response_code);
      if (data.data.response_code === 4) {
        trivia.request(trivia.getToken()).then((data) => {
          trivia.token = data.data.token;
        });
        console.log("other");
        data = await trivia.request(
          trivia.makeURL(1, urldata.category, urldata.difficulty, urldata.type)
        );
        res.send(JSON.stringify(data.data));
      } else {
        console.log("normal");
        res.send(JSON.stringify(data.data));
      }
      break;
    default:
      break;
  }
});

app.get("/user", (req, res) => {
  console.log("stats");
});

app.post("/user", (req, res) => {
  //
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});