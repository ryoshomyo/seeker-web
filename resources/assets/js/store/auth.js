import AuthRepository from "../repositorys/AuthRepository";
import { OK, UNPROCESSABLE_ENTITY } from '../enums';

const state = {
  /** ログイン済みユーザーの情報 */
  user: null,
  /** 
   * API ステータス
   * 
   * - NOTE:
   * true エラーなし
   * false エラーあり
   */
  apiStatus: null,
  /** ログインエラーメッセージ */
  loginErrorMessages: null,
}

const getters = {
  /** ログイン済みユーザーであるかを判断 */
  check: state => !!state.user,
  /** ログイン済みユーザーの名前を取得 */
  username: state => state.user ? state.user.name : ``,
};

const mutations = {
  /** user ステート値を更新する */
  setUser (state, user) {
    state.user = user;
  },

  /** 
   * API ステータスのステート値を更新する
   * 
   * - NOTE:
   * true エラーなし
   * false エラーあり
   */
  setApiStatus (state, status) {
    state.apiStatus = status
  },

  /** ログインエラーメッセージのステート値を更新する */
  setLoginErrorMessages (state, messages) {
    state.loginErrorMessages = messages;
  }
};

const actions = {
  /** 会員登録 */
  async register (context, data) {
    const response = await AuthRepository.register(data);
    context.commit('setUser', response.data);
  },

  /** ログイン */
  async login (context, data) {
    context.commit('setApiStatus', null);
    const response = await AuthRepository.login(data)
      .catch(error => error.response || error);

    // 成功した場合は通常の response オブジェクトを
    // 失敗した場合は error にある response オブジェクトを
    if (response.status === OK) {
      context.commit('setApiStatus', true);
      context.commit('setUser', response.data);
      return false;
    };
  
    context.commit('setApiStatus', false);
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit('setLoginErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
  },

  /** ログアウト */
  async logout (context) {
    const response = await AuthRepository.logout();
    context.commit('setUser', null);
  },

  /** ログイン中ユーザーの情報を取得 */
  async currentUser (context) {
    const response = await AuthRepository.getCurrentUser();
    // ログインしていない場合は空文字列がくるため、null にしておく
    const user = response.data || null;
    context.commit('setUser', user);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};