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

  getToken() {}

  resetToken() {}

  getCategories() {}

  getCategoryInfo() {}

  getGlobalInfo() {}

  makeURL(amount, category, difficulty) {}
}
