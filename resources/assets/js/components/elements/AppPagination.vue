<template lang="pug">
  .app-pagination
    v-container
      v-row(justify="center")
        v-col(cols="12")
          v-container.max-width(@click="selectPage")
            v-pagination.my-4(v-model="page" :length="length")
</template>
<script>
  export default {
    name: `AppPagination`,
    props: {
      /** ページネーションをつけたい明細リスト */
      itemList: Array,
      /** 1ページに表示したい明細数 */
      displayItemCount: Number,
    },
    data() {
      return {
        page: 1,
      };
    },
    computed: {
      /** ページネーションのボタン表示数を算出 */
      length() {
        if(this.itemList && this.displayItemCount) {
          return Math.ceil(this.itemList.length / this.displayItemCount);
        }
        return 0;
      }
    },
    methods: {
      /** 選択したページボタンを親に知らせる */
      selectPage() {
        this.$emit('getPage', this.page);
      }
    }
  }
</script>