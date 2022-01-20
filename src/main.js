import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(Vuex);

import mutations from './store/mutations';

const store = new Vuex.Store({
  state: {

  },
  mutations: mutations
});

new Vue({
  store: store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
