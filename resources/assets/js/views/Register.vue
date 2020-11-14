<template lang="pug">
  .sign-up
    .registered-notice-view(v-if="registered") 会員登録完了！
    .failed-to-register-notice-view(v-if="failedToRegister")
      v-icon.failed-to-register-notice-icon mdi-alert-circle-outline
      .failed-to-register-notice-message 会員登録が失敗しました。暫く待ってから再登録をお試しください。
    v-app#inspire(v-if="!registered && !failedToRegister")
      v-content
        v-container(fluid="" fill-height="")
          v-layout(align-center="" justify-center="")
            v-flex(xs12="" sm8="" md4="")
              v-card.card-box.elevation-12
                v-toolbar(color="black" dark="" flat="")
                  v-toolbar-title SignUp
                  v-spacer
                v-card-text
                  v-form
                    .required-notice
                      .required-notice-sign *
                      .required-notice-text 全てが入力必須項目になります。
                    //- TODO: コンポーネント化
                    .error-message(v-show="showErrorMessage") {{ errorMessage }}
                    .input-box
                      v-icon.email-icon mdi-email  
                      v-text-field.text-field(
                        v-model="registerForm.email"
                        label="Email"
                        name="email"
                        type="email"
                      )
                    .input-box
                      v-icon.lock-icon mdi-lock
                      v-text-field.text-field(
                        v-model="registerForm.password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        label="Password"
                        name="password"
                        @click:append="showPassword = !showPassword"
                      )
                    .input-box
                      v-icon.lock-icon mdi-lock
                      v-text-field.text-field(
                        v-model="registerForm.password_confirmation"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        label="Password (confirm)"
                        name="password"
                        @click:append="showPassword = !showPassword"
                      )
                v-card-actions
                  v-spacer
                  v-btn.btn-text(color="black" @click="register") SignUp
</template>
<script>
import RepositoryFactory from "../repositorys/RepositoryFactory";
import AuthRepository from "../repositorys/AuthRepository";
import ErrorUtil from "../util/ErrorUtil";

// auth
// TODO: これいまうまくいけないなー
const authRepository = RepositoryFactory.get(AuthRepository);
export default {
  name: `Register`,
  data() {
    return {
        registered: false,
        failedToRegister: false,
        errors: {},
        drawer: null,
        showPassword: false,
        registerForm: {
          name: `無名`,
          email: null,
          password: null,
          password_confirmation: null,
        },
        visibleOfPasswordNotMatchedError: false,
        visibleOfRegisterItemUninputError: false,
        visibleOfServerError: false,
        showErrorMessage: false,
    };
  },
  computed: {
    /** ログイン済みであるか */
    isLoggedIn () {
      return this.$store.getters['auth/check']
    },

    /** ユーザー名 */
    username () {
      return this.$store.getters['auth/username']
    },

    /** エラーメッセージ */
    errorMessage() {
      // TODO: サーバーエラーの際の考慮
      if (
        this.visibleOfRegisterItemUninputError || 
        this.visibleOfServerError || 
        this.visibleOfPasswordNotMatchedError
        ) {
        // エラーメッセージを表示
        this.showErrorMessage = true;
      }
      // TODO: switch のほうがいいかも？
      if (this.visibleOfRegisterItemUninputError) {
        return `必須項目を入力してください。`;
      } else if (this.visibleOfServerError) {
        // TODO: もっとあるので後で補足
        return `通信エラーです。暫くお待ちしていただいてから、次の操作を行ってください。`;
      } else if (this.visibleOfPasswordNotMatchedError) {
        return `二回入力して頂いたパスワードが合致しておりません。`;
      }
    },
  },
  methods: {
    /** 初期化処理 */
    init() {
      this.visibleOfPasswordNotMatchedError = false;
      this.visibleOfRegisterItemUninputError = false;
      this.visibleOfServerError = false;
      this.showErrorMessage = false;
      this.registered = false;
      this.failedToRegister = false;
    },

    /** 会員を登録する */
    async register() {
      // 初期化処理
      this.init();
      // 必須項目が入力された場合
      if (
        this.registerForm.email && 
        this.registerForm.password && 
        this.registerForm.password_confirmation
        ) {
        // 二回入力されているパスワードが合致していない場合
        // エラーを出して登録処理を中止
        if (this.registerForm.password !== this.registerForm.password_confirmation) {
          this.visibleOfPasswordNotMatchedError = true;
          return;
        }

        try {
          // authストアのresigterアクションを呼び出す
          await this.$store.dispatch('auth/register', this.registerForm)
          // 登録成功の場合
          // 成功を表す文言を表示してトップ画面に遷移
          if(this.username) {
            this.registered = true;
            this.moveToTopAfterTenTime(); 
          } else {
            // 登録失敗の場合
            // 失敗を表す文言を表示
            this.failedToRegister = true;
          }
        } catch(error) {
          console.log(error);
          // エラー取得
          this.errors = ErrorUtil.getErrors(error);
          // 画面上にサーバーエラーメッセージを表示
          this.visibleOfServerError = true;
        }
      } else {
        // 必須項目が入力されていなかった場合
        // 画面上に必須項目未入力エラーメッセージを表示  
        this.visibleOfRegisterItemUninputError = true;
      }
    },
    
    /**
     * 5 秒後にトップ画面に遷移
     */
    moveToTopAfterTenTime() {
      setTimeout(() => {
        this.$router.push({ name: `top` })
      }, 10 * 1000);
    }
  },

  mounted() {
    // 初期化処理
    this.init();
  }
}
</script>
<style lang="scss" scoped>
.sign-up {
  padding-right: 200px;
}

.card-box {
  margin-bottom: 200px; 
}

.email-icon,
.lock-icon,
.failed-to-register-notice-icon,
.failed-to-register-notice-message,
.text-field {
  display: inline-block;
}

.text-field {
  width: 90%;
}

.email-icon {
  padding-top: 12px;
}

.lock-icon {
  padding-top: 9px;
}

.failed-to-register-notice-icon {
  padding: 0 5px 5px 0;
  color:#c60019;
}

.text-field {
  padding-left: 10px;
}

.btn-text {
  color: #fff;
}

.required-notice-text,
.required-notice-sign {
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
}

.required-notice-sign {
  color:#c60019;
}

.error-message {
  display: inline-block;
  font-size: 12px;
  color:#c60019;
  font-weight: bold;
}
</style>