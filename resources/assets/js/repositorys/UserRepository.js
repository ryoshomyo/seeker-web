import axios from "axios";
const resource = `api`;

/**
 * ユーザ情報リポジトリ
 */
export default class UserRepository {
    /**
     * ユーザ情報取得メソッド
     * @param id ユーザ番号
     */
    static async show(id) {
        return axios.get(`${resource}/${id}`);
    }

    /**
     * ユーザ情報更新メソッド
     * @param id   ユーザ番号
     * @param data ユーザ情報
     */
    static async update(id, data) {
        return axios.post(`${resource}/${id}`, data);
    }
}