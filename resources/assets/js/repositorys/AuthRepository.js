import axios from "axios";
const resource = 'api';

/**
 * 認証関連リポジトリ
 */
export default class AuthRepository {
    /**
     * 新規登録メソッド
     * @param data ユーザ情報
     */
    static async register(data) {
        return axios.post(`${resource}/register`, data);
    }

    /**
     * ログインメソッド
     * @param data ログイン情報
     */
    static async login(data) {
        return axios.post(`${resource}/login`, data);
    }

    /**
     * ログアウトメソッド
     */
    static async logout() {
        return axios.post(`${resource}/logout`);
    }

    /**
     * ログイン中ユーザーの情報を取得
     */
    static async getCurrentUser() {
        return axios.get(`${resource}/user`);
    }
}