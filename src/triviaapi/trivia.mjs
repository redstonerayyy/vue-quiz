import axios from "axios";

export default class TriviaAPI {
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
    });
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
