/** 
 * エラー関連の共通処理
 */
export default class ErrorUtil {
  /** 
   * try catch の際に出たエラーを配列にして取得する
   */
  static getErrors(error) {
    if (
      !error || 
      !error.response || 
      !error.response.data || 
      !error.response.data.errors
    ) {
      return null;
    }

    // レスポンスエラーを全部取得
    const responseErrors = error.response.data.errors;
    const errors = [];
    for(const key in responseErrors) {
      if (responseErrors.hasOwnProperty(key)) {
        errors[key] = responseErrors[key][0];
      }
    }
    
    return errors;
  }
}