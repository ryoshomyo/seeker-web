<template lang="pug">
  //- TODO: スターグループ要開発
  .app-stars
    v-btn(icon color="indigo" Disabled)
      v-icon mdi-star
</template>
<script>
  export default {
    name: `AppStars`,
    props: {},
    data() {
      return {};
    },
    computed: {
      /** ページネーションのボタン表示数を算出 */
      // length() {
      //   if(this.itemList && this.displayItemCount) {
      //     return Math.ceil(this.itemList.length / this.displayItemCount);
      //   }
      //   return 0;
      // }
    },
    methods: {
      /** 選択したページボタンを親に知らせる */
      // selectPage() {
      //   this.$emit('getPage', this.page);
      // }
    }
  }
</script>
<style lang="scss" scoped>
.app-stars {
  display: inline-block;
}
</style>