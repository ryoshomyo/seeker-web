/*----------------------------------
 Vue.jsのカスタムフィルタ定義
----------------------------------*/
/** 文字列が指定文字数を超える場合、末尾に省略表示(...)をつける */
export function truncate(text, max = 300) {
  // 省略表示にする
  if (typeof max === `number` && typeof text === `string` && text.length > max) {
    text = text.substring(0, max + 1)
    return `${text}...`;
  }
  // 条件に合わないため、そのまま返す
  return text;
}