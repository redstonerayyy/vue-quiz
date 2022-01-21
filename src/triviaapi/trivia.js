class TriviaAPI {
  constructor() {
    this.urls = {
      baseurl: "https://opentdb.com/api.php",
      tokenurl: "https://opentdb.com/api_token.php",
      categoryurl: "https://opentdb.com/api_category.php",
      categoryinfourl: "https://opentdb.com/api_count.php",
      globalinfourl: "https://opentdb.com/api_count_global.php",
    };
  }

  async request(url) {
    let res = await axios.get(url);
    return res;
  }

  decodehtmlentities(str) {
    let textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  }

  getToken() {
    let url = this.url.tokenurl + "?command=request";
  }

  resetToken(token) {
    let url = this.url.tokenurl + `?command=reset&token=${token}`;
  }

  getCategories() {
    let url = this.urls.categoryurl
  }

  getCategoryInfo(category) {
    let url = this.urls.categoryinfourl + `?category=${category}`;
  }

  getGlobalInfo() {
    let url = this.urls.globalinfourl;
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
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()
db.data ||= { posts: [] }
const { posts } = db.data

// You can also use this syntax if you prefer
await db.write()

const trivia = new TriviaAPI();
const app = express();

app.get("*", async (req, res) => {
  let data = await trivia.request(trivia.makeURL(1));
  res.send(JSON.stringify(data.data));
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});