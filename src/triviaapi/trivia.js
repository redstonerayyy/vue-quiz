class TriviaAPI {
  constructor() {
    this.difficulties = ["easy", "medium", "hard"];
    this.types = ["multiple", "boolean"];
    this.urls = {
      baseurl: "https://opentdb.com/api.php",
      tokenurl: "https://opentdb.com/api_token.php",
      categoryurl: "https://opentdb.com/api_category.php",
      categoryinfourl: "https://opentdb.com/api_count.php",
      globalinfourl: "https://opentdb.com/api_count_global.php",
    };
    this.request(this.getGlobalInfo()).then((data) => {
      this.globalinfo = data.data;
      this.globalinfo.types = this.types;
      this.globalinfo.difficulties = this.difficulties;
    })
    this.request(this.getCategories()).then((data) => {
      this.categoryinfo = data.data;
    });
    this.request(this.getToken()).then((data) => {
      this.token = data.data.token;
    })
  }

  async request(url) {
    let res = await axios.get(url);
    return res;
  }

  update() {
    this.globalinfo = this.request(this.getGlobalInfo());
    this.categoryinfo = this.request(this.getCategories());
    this.token = this.request(this.getToken());
  }

  decodehtmlentities(str) {
    let textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  }

  getToken() {
    let url = this.urls.tokenurl + "?command=request";
    return url;
  }

  resetToken(token) {
    let url = this.urls.tokenurl + `?command=reset&token=${token}`;
    return url;
  }

  getCategories() {
    let url = this.urls.categoryurl
    return url;
  }

  getCategoryInfo(category) {
    let url = this.urls.categoryinfourl + `?category=${category}`;
    return url;
  }

  getGlobalInfo() {
    let url = this.urls.globalinfourl;
    return url;
  }

  makeURL(amount, category, difficulty, type, token, encoding) {
    let url = this.urls.baseurl;
    url += amount ? `?amount=${amount}` : "";
    url += category ? `&category=${category}` : "";
    url += difficulty ? `&difficulty=${difficulty}` : "";
    url += type ? `&type=${type}` : "";
    url += token ? `&token=${token}` : "";
    url += encoding ? `&encodingt=${encoding}` : "";
    return url;
  }
}

import axios from "axios";
import express from "express";
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

// Use JSON file for storage
const __dirname = dirname(fileURLToPath(import.meta.url));
const adapter = new JSONFile(__dirname + "/db.json");
const db = new Low(adapter)

await db.read()
db.data ||= { data: [] };
const { dbdata } = db.data;

await db.write()

const trivia = new TriviaAPI();
const app = express();

app.get("/api", async (req, res) => {
  let urlparams = new URLSearchParams(req.query);
  let urldata = {};
  for (let [name, value] of urlparams) {
    urldata[name] = value;
  }
  console.log(urldata);
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
      console.log(trivia.makeURL(
        urldata.amount,
        urldata.category,
        urldata.difficulty,
        urldata.type,
        trivia.token
      ));
      if (data.data.response_code === 4) {
        this.request(this.getToken()).then((data) => {
          this.token = data.data.token;
        });
        data = await trivia.request(trivia.makeURL(1, "", "", ""));
        res.send(JSON.stringify(data.data));
      } else {
        res.send(JSON.stringify(data.data));
      }
      break;
    default:
      break;
  }
});

app.get("/stats", (req, res) => {
  console.log("stats");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});