<template lang="pug">
  .product-list
    .product-box(v-for="product in displayProductList")
      v-hover(
        v-slot:default="{ hover }"
        open-delay="100"
      )
        v-card.mx-auto(
          :elevation="hover ? 12 : 2"
          width="880"
          height="180"
          outlined=""
        )
          .load-box(v-show="isloading.product")
            v-progress-circular.progress-circular(
              :indeterminate="isloading.product"
              color="primary"
            )
          .display-box(v-show="!isloading.product")
            v-list-item(three-line="")
              v-list-item-content
                v-list-item-title.headline.mb-1 {{ product.name }}
                .price ¥{{ product.price }}
                v-list-item-subtitle {{ product.detail }}
              v-list-item-avatar(tile="" size="100")
                img(v-bind:src="product.image")
            v-card-actions
              v-btn(text) AMAZON
              v-btn(text) 楽天
              v-btn(text) その他
              v-btn(text @click="moveToConfirm(product)") ★評価確認
    .pagination-box
      app-pagination.pagination(
        @getPage="getDisplayProductList",
        :itemList="productList",
        :displayItemCount="displayProductCount"
      )
</template>
<script>
import AppPagination from "../elements/AppPagination.vue";
/** 1ページに表示したい明細数 */
const DisplayProductCount = 12;

export default {
  name: `ProductList`,
  components : {
    AppPagination,
  },
  props: {
    productList: Array,
  },
  data() {
    return {
      hover: true,
      isloading: { product: false },
      displayProductList: [...this.productList.slice(0, DisplayProductCount)],
    };
  },
  computed: {
    /** 1ページに表示したい明細数 */
    displayProductCount() {
      return DisplayProductCount;
    }, 
  },
  methods: {
    /** 評価確認ページに遷移する */
    moveToConfirm(product) {
      if (product && product.id) {
        this.$router.push({ name: `confirm`, params: { productId: product.id }})
      }
    },

    /** 表示する明細リストを取得 */
    getDisplayProductList(page) {
      this.isloading.product = true;
      const end = page * DisplayProductCount;
      const start = end - DisplayProductCount < 0 ? 0 : end - DisplayProductCount;
      this.displayProductList = [...this.productList.slice(start, end)];
      this.isloading.product = false;
    },
  }
};
</script>
<style lang="scss" scoped>
.product-list {
  margin-top: 80px;
  width: 960px;
}

.product-box {
  display: inline-block;
  height: 200px;
  margin-left: 30px;
}

.price {
  color: #c60019;
  font-size: 14px;
}

.load-box {
  position: relative;
}

.progress-circular {
  position: absolute;
  top: 72px;
  left: 154px;
}

.product-name {
  font-size: 16px;
}

.pagination-box {
  width: 100%;
  display: table;
}

.pagination {
  display: table-cell;
  text-align: center;
}
</style>