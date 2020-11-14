<template lang="pug">
  .app-list-item-group
    template
      v-card.card-box.mx-auto(:style="styles")
        v-list
          v-list-item-group(v-model="model")
            v-list-item(v-for="(item, i) in items" :key="i")
              v-list-item-icon
                v-icon(v-text="item.icon")
              v-list-item-content
                v-list-item-title.title-box(v-text="item.text")
</template>
<script>
export default {
  name: `AppListItemGroup`,
  props: {
    /** 表示文言とアイコンを格納する項目リスト */
    items: Array,
    /** リストアイテムグループを表示するか */
    visibleOfAppListItemGroup: Boolean,
    /** リストアイテムグループの最大幅 */
    maxWidth: String,
    /** リストアイテムグループのフォントサイズ */
    fontSize: String,
  },
  data() {
    return {
      model: false,
      defaultMaxWidth: `500px`,
      defaultFontSize: `12px`,
    };
  },
  computed: {
    // バインドするスタイルを生成
    styles () {
      return {
        '--width': this.maxWidth,
        '--font-size': this.fontSize,
      }
    }
  },
  watch: {
    visibleOfAppListItemGroup() {
      this.model = this.visibleOfAppListItemGroup || false;
    },
  }
};
</script>
<style lang="scss" scoped>
.card-box {
  /* デフォルト最大幅 */
  --width: 180px;
  /* CSS変数を幅に割り当て */
  width: var(--width);
  display: inline-block;
}

.title-box {
  /* デフォルト最大幅 */
  --font-size: 12px;
  /* CSS変数をフォントサイズに割り当て */
  font-size: var(--font-size);
  display: inline;
  margin-left: 10px;
}
</style>