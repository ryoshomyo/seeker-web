import Vue from "vue";
// CSRF 対策
import './bootstrap'
// TODO: 絶対パスに
import store from "./store";
import router from "./router";
import App from "./App.vue";
import * as filters from "./filters";
import vuetify from "./plugins/vuetify";
import smoothScroll from "vue-smoothscroll";

// スムーズスクロールライブラリ
Vue.use(smoothScroll)
// カスタムフィルタ
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
// Vue の起動時のプロダクションのヒントを非表示にする
Vue.config.productionTip = false;
// グローバルイベントを登録
window.EventEmitter = new Vue();

const createApp = async () => {
  // NOTE: アプリ起動時、Vue インスタンスを生成する前に
  // もしログイン中であれば、そのユーザーの情報をストアにセットする
  await store.dispatch('auth/currentUser');

  new Vue({
    router,
    store, 
    vuetify,
    render: h => h(App)
  }).$mount('#app');
}

createApp();