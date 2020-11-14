<template lang="pug">
  .top
    .title-box
      .title-message Make a Good Choice
    .content-box
      product-list.product-list(:productList="productList")
      .side-bar-box
        v-hover(
          v-slot:default="{ hover }"
          open-delay="100"
        )
          v-card.mx-auto(
            :elevation="hover ? 12 : 2"
            width="250"
            min-height="100"
            outlined=""
          )
            .tag-keyword よく検索されるキーワード
            //- TODO: タグ検索
            v-chip.ma-2.chip(
              color="deep-purple accent-4"
              label=""
              outlined=""
            )
              | Complete
            v-chip.ma-2.chip(
              color="deep-purple accent-4"
              label=""
              outlined=""
            )
              | react
            v-chip.ma-2.chip(
              color="deep-purple accent-4"
              label=""
              outlined=""
            )
              | vue
            v-chip.ma-2.chip(
              color="deep-purple accent-4"
              label=""
              outlined=""
            )
              | SSR
      
</template>
<script>
import ProductList from "../components/blocks/ProductList.vue";
export default {
  name: `Top`,
  components : {
    ProductList,
  },
  data() {
    return {
      hover: true,
      productList: [],
    };
  },
  methods: {
    /** ダミー商品明細リストを作成 */
    createProductListMock() {
      const nameList = [
        `入社1年目ビジネスマナーの教科書`, 
        `開眼! JavaScript ―言語仕様から学ぶJavaScriptの本質`,
        `JavaScriptパターン ―優れたアプリケーションのための作法`,
        `初めてのPHP`
      ];
      const detailList = [
        `挨拶の仕方、正しい敬語の使い方、名刺交換、電話の応対、メールの書き方など`,
        `本書は、JavaScriptの言語的特性で知っておくべきポイントをまとめた書籍です。JavaScriptの「オブジェクト」の理解を中心に据えて、JavaScriptをひと通り経験した人が陥りがちな落とし穴であるthis、プロトタイプチェーン(継承)、スコープチェーンなどをサンプルを使って解説します。`,
        `JavaScriptについては一通りマスターした中上級者が、さらに上を目指すための高度でかつ有用なテクニックを盛り込んでいます。`,
        `10年ぶりにメジャーバージョンアップされ、大幅な高速化やメモリ使用量の低減など、大きく性能が向上したPHP 7に対応したロングセラーの入門書の改訂版です。`,
      ]
      const imageList = [
        `https://m.media-amazon.com/images/I/51li3gWSc1L._SY346_.jpg`,
        `https://images-na.ssl-images-amazon.com/images/I/51jMq3%2BDklL._SX352_BO1,204,203,200_.jpg`,
        `https://images-na.ssl-images-amazon.com/images/I/51ZoMJ%2BrLhL._SX389_BO1,204,203,200_.jpg`,
        `https://images-na.ssl-images-amazon.com/images/I/51VvVTeZbvL._SX388_BO1,204,203,200_.jpg`,
      ];
      const productList = [];
      const productCount = 20;
      for(let i = 0; i < productCount; i++) {
        productList.push({
          id: i + 1,
          name: nameList[i % 4],
          price: i * 10 + 1320,
          detail: detailList[i % 4],
          image: imageList[i % 4],
        });
      }
      this.productList = productList;
    }
  },
  created() {
    // TODO: mockに移そう
    this.createProductListMock();
  }
};
</script>
<style lang="scss" scoped>
.top {
  padding-top: 60px;
  min-height: 500px;
  width: 100%;
}

.title-message {
  font-size: 52px;
  font-family: 'Josefin Slab', serif;
  color: rgba(0, 0, 0, 0.87);
  margin-left: 30px;
}

.product-list,
.side-bar-box {
  display: inline-block;
}

.side-bar-box {
  vertical-align: top;
  margin-top: 80px;
}

.chip {
  cursor: pointer;
}

.tag-keyword {
  display: inline-block;
  padding: 10px 10px 0 10px;
  font-weight: bold;
}
</style>