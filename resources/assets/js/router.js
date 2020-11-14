import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

// ページコンポーネント
import Top from "./views/Top.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import Confirm from "./views/Confirm.vue";

import SystemError from './views/errors/System.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: `/`,
    name: `top`,
    component: Top
  },
  {
    path: `/register`,
    name: `register`,
    component: Register
  },
  {
    path: `/login`,
    name: `login`,
    component: Login,
    beforeEnter (to, from, next) {
      // ログインしていない状態でアドレス直打ちすると、トップ画面に飛ばされる
      store.getters['auth/check'] ? next('/') : next();
    }
  },
  {
    path: `/confirm/:productId`,
    name: `confirm`,
    component: Confirm,
  },
  // エラー系
  // システムエラー
  {
    path: '/500',
    component: SystemError
  }
]

const router = new VueRouter({
  mode: `history`,
  scrollBehavior (to, from, savedPosition) {
    // 遷移する度にスクロールをトップに移動
    return { x: 0, y: 0 };
  },
  routes,
})

export default router;