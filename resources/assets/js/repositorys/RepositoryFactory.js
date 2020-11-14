import AuthRepository from "./AuthRepository";
import UserRepository from "./UserRepository";

const authRepository = new AuthRepository();
const userRepository = new UserRepository();

/**
 * リポジトリ群をまとめるクラス
 */
export default class RepositoryFactory {
    /**
     * リポジトリインスタンスを取得
     * @param repository コンポーネント側で利用したいリポジトリ
     */
    static get(repository) {
      switch (repository) {
        case `authRepository`:
          return authRepository;
          break;
        case `userRepository`:
          return userRepository;
          break;
        default:
          return null;
      }
    }
}