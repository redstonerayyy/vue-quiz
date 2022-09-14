import express from "express";
import TriviaAPI from "./trivia.mjs";
import { findUser, storeUser, connect, deleteUsers } from "./database.mjs";

connect("mongodb://localhost:27017/quiz")
    .catch(error => console.log(error));

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

    //   console.log(data.data.response_code);
      if (data.data.response_code === 4) {
        trivia.request(trivia.getToken()).then((data) => {
          trivia.token = data.data.token;
        });
        data = await trivia.request(
          trivia.makeURL(1, urldata.category, urldata.difficulty, urldata.type)
        );
        if (data.data.response_code !== 0) {
          data = await trivia.request(trivia.makeURL(1, urldata.category));
        }
        // console.log(data);
        res.send(JSON.stringify(data.data));
      } else {
        res.send(JSON.stringify(data.data));
      }
      break;
    default:
      break;
  }
});

app.use(express.json());

app.get("/user", (req, res) => {
  let urlparams = new URLSearchParams(req.query);
  let urldata = {};
  for (let [name, value] of urlparams) {
    urldata[name] = value;
  }
  findUser(urldata.username).then((user) => {
    if (user.length > 0) {
      res.send({ ...user[0], found: true });
    } else {
      res.send({ found: false });
    }
  });
});

app.post("/user", (req, res) => {
  let user = req.body;
  findUser(req.body.username).then((users) => {
    if (users.length > 0) {
      let knownuser = users[0];
      knownuser.total = user.total;
      knownuser.unanswered = user.unanswered;
      knownuser.wrong = user.wrong;
      knownuser.right = user.right;
      knownuser.save();
    } else {
      storeUser(user.username, user.email, user.password, {
        total: user.total,
        unanswered: user.unanswered,
        wrong: user.wrong,
        right: user.right,
      })
    }
  })
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});