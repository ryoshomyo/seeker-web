<template lang="pug">
  .confirm
    .product-info-box
      .product-name {{ product.name }}
      .product-price ¥{{ product.price }}
      //- TODO: 展開部品はコンポーネント化できそうだけど、暇なときにやる
      .product-detail.break(v-show="isTruncated") {{ product.detail | truncate }}
        .expand-box(v-show="isProductDetailCanBeTruncated")
          a(v-show="visibleOfProductDetailExpandLink" @click="expandProductDetail") 展開
          a(v-show="!visibleOfProductDetailExpandLink" @click="contractProductDetail") 省略
      .product-detail.break(v-show="!isTruncated") {{ product.detail }}
        .expand-box(v-show="isProductDetailCanBeTruncated")
          a(v-show="visibleOfProductDetailExpandLink" @click="expandProductDetail") 展開
          a(v-show="!visibleOfProductDetailExpandLink" @click="contractProductDetail") 省略
      img.product-image(v-bind:src="product.image")
    v-divider
    .insite-evaluation-box
      .evaluation-title BookSeekerの評価
      .comment-notice-link
        a(@click="moveToCommentArea") 評価を書く
      .evaluation-box(
        v-if="hasInsiteEvaluation"
        v-for="evaluation in insiteEvaluationList"
      )
    .no-insite-evaluation-box(v-if="!hasInsiteEvaluation") まだ評価がありません。
    v-divider
    .outsite-evaluation-box
      .evaluation-title 外部サイトの評価
      .evaluation-group
        .evaluation
          v-card(
            width="260"
            min-height="400"
          )
            .outsite-info
              .outsite-name サイト名: 
                .outsite-name-value AMAZON
              .outsite-evaluation 評価: 
                .outsite-evaluation-value
                  app-stars
                  app-stars
                  app-stars
                  app-stars
                  app-stars
              .outsite-buyer-count 購買者数: 
                .outsite-buyer-count-value 20人
        .evaluation
          v-card(
            width="260"
            min-height="400"
          )
            .outsite-info
              .outsite-name サイト名: 
                .outsite-name-value 楽天
              .outsite-evaluation 評価: 
                .outsite-evaluation-value
                  app-stars
                  app-stars
                  app-stars
                  app-stars
                  app-stars
              .outsite-buyer-count 購買者数: 
                .outsite-buyer-count-value 30人
        .evaluation
          v-card(
            width="260"
            min-height="400"
          )
            .outsite-info
              .outsite-name サイト名: 
                .outsite-name-value 知らないサイト
              .outsite-evaluation 評価:
                .outsite-evaluation-value
                  app-stars
                  app-stars
                  app-stars
                  app-stars
                  app-stars
              .outsite-buyer-count 購買者数: 
                .outsite-buyer-count-value 1人
    v-divider
    .comment-box
      div(id="inside-comment" class="inside-comment") 
      div
        .comment-box-title 評価を書く
        .comment-user-name-notice ※ お名前未入力の場合は「無名」で投稿します。
        .comment-user-name
          v-col.user-name(cols="4")
            v-text-field(
              v-model="name"
              filled=""
              color="deep-purple"
              counter="30"
              label="お名前"
              style="min-height: 30px"
              type="")
      .comment-content
        v-col.content(cols="4")
          v-textarea(
            v-model="comment"
            auto-grow=""
            filled=""
            color="deep-purple"
            counter="2000"
            label="商品評価"
            rows="6")
      v-btn.white--text(
        :disabled="false"
        color="deep-purple accent-4"
        depressed=""
      ) 発表

</template>
<script>
import AppStars from "../components/elements/AppStars.vue";
const ProductDetailMaxLength = 300;
export default {
  name: `Confirm`,
  components : {
    AppStars,
  },
  data() {
    return {
      /** 商品評価の投稿者名 */
      name: null,
      /** 商品評価 */
      comment: null,
      /** 商品詳細展開部品を表示するか */
      visibleOfProductDetailExpandLink: true,
      /** 商品詳細が省略されたかを判断 */
      isTruncated: true,
      /** 本サイトでの商品評価 */
      insiteEvaluationList: [],
      /** 商品詳細リスト */
      productList: [],
    };
  },
  computed: {
    /** 商品詳細が省略されるべきかを判断 */
    isProductDetailCanBeTruncated() {
      return this.productDetailLength > ProductDetailMaxLength;
    },

    /** 商品詳細の文字数を取得 */
    productDetailLength() {
      return this.product.detail.length;
    },

    /** 商品情報を取得 */
    product() {
      // NOTE: ルーターのパスパラメータになると、文字列になってしまいます。
      // numberにキャストし直すのも手間なので、緩めの等価演算をします
      return this.productList.find(product => product.id == this.$route.params.productId);
    },

    /** 本サイトでの評価がある */
    hasInsiteEvaluation() {
      return this.insiteEvaluationList.length !== 0;
    },
  },
  methods: {
    /** 商品詳細を展開表示にする */
    expandProductDetail() {
      this.visibleOfProductDetailExpandLink = false;
      this.isTruncated = false;
    },

    /** 商品詳細を省略表示にする */
    contractProductDetail() {
      this.visibleOfProductDetailExpandLink = true;
      this.isTruncated = true;
    },

    /** 商品評価記述エリアにスムーズスクロールする */
    moveToCommentArea() {
      event.preventDefault()
      this.$SmoothScroll(
        document.querySelector('#inside-comment'),
        400,
        null,
        null,
        'y'
      )
    },

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
    // this.moveToTop();
    // TODO: mockに移そう
    this.createProductListMock();
  }
};
</script>
<style lang="scss" scoped>
.confirm {
  padding-top: 20px;
  min-height: 500px;
  width: 100%;
}

.product-name {
  font-size: 30px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.87);
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #c60019;
}

.product-detail {
  font-size: 16px;
  padding-top: 5px;
  width: 850px;
}

.product-image {
  margin: 10px 10px 0 0;
  width: 130px;
  height: 170px;
}

.no-insite-evaluation-box {
  display: inline-block;
}

.evaluation-link {
  display: inline;
  color:#342ead;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    color:#856c8b;
  }
}

.outsite-evaluation-box {
  font-weight: bold;
}

.evaluation-title {
  display: inline-block;
  font-weight: bold; 
  font-size: 18px;
  color: rgba(0, 0, 0, 0.87);
}

.comment-notice-link {
  display: inline-block;
  font-size: 14px;
  margin-left: 10px;
}

.evaluation-group {
  padding-top: 15px;
}

.evaluation {
  display: inline-block;
  margin-left: 40px;
  &:first-child {
    margin-left: 0;
  }
}

.outsite-info {
  display: inline-block;
  padding: 15px;
}

.outsite-name-value,
.outsite-evaluation-value,
.outsite-buyer-count-value {
  font-weight: normal;
  display: inline-block;
}

.comment-box {
  padding-top: 10px;
}

.inside-comment {
  display: inline-block;
  padding-top: 80px;
  margin-top: -80px;
}

.comment-box-title {
  font-weight: bold; 
  font-size: 18px;
  color: rgba(0, 0, 0, 0.87);
}

.comment-user-name-notice {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.87);
  margin-top: 5px;
}

.user-name,
.content {
  padding-left: 0;
}

.break {
  word-wrap: break-word;
}

.expand-box {
  display: inline-block;
  padding-left: 5px;
  cursor: pointer;
}
</style>