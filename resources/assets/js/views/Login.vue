<template lang="pug">
  .login
    v-app#inspire
      v-content
        v-container(fluid="" fill-height="")
          v-layout(align-center="" justify-center="")
            v-flex(xs12="" sm8="" md4="")
              v-card.card-box.elevation-12
                v-toolbar(color="black" dark="" flat="")
                  v-toolbar-title Login
                  v-spacer
                v-card-text
                  v-form
                    .required-notice
                      .required-notice-sign *
                      .required-notice-text 全てが入力必須項目になります。
                    .errors(v-if="loginErrorMessages")
                      ul(v-if="loginErrorMessages.email")
                        li(v-for="message in loginErrorMessages.email" :key="message") {{ message }}
                      ul(v-if="loginErrorMessages.password")
                        li(v-for="message in loginErrorMessages.password" :key="message") {{ message }}
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
                      v-text-field#password.text-field(
                        v-model="registerForm.password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        label="Password"
                        name="password"
                        @click:append="showPassword = !showPassword"
                      )
                v-card-actions
                  v-spacer
                  v-btn.btn-text(color="black" @click="login") Login
</template>
<script>
import RepositoryFactory from "../repositorys/RepositoryFactory";
import AuthRepository from "../repositorys/AuthRepository";
import { mapState } from 'vuex';

// auth
const authRepository = RepositoryFactory.get(AuthRepository);
export default {
  name: `Login`,
  data() {
    return {
       drawer: null,
       showPassword: false,
       registerForm: {
        email: null,
        password: null,
       }
    };
  },
  computed: {
    ...mapState({
      /** API ステータス */
      apiStatus: state => state.auth.apiStatus,
      /** ログインエラーメッセージ */
      loginErrorMessages: state => state.auth.loginErrorMessages
    }),
  },
  methods: {
    /** ログイン */
    async login() {
      await this.$store.dispatch('auth/login', this.registerForm);
      // エラーなしの場合
      if (this.apiStatus) {
        // トップページに移動する
        this.moveToTopAfterTenTime();
      }
    },

    /** ログインエラーメッセージをクリアする */
    clearError () {
      this.$store.commit('auth/setLoginErrorMessages', null)
    },

    /** 10 秒後にトップ画面に遷移 */
    moveToTopAfterTenTime() {
      setTimeout(() => {
        this.$router.push({ name: `top` });
      }, 5 * 1000);
    }
  },
  created () {
    this.clearError();
  }
}
</script>
<style lang="scss" scoped>
.login {
  padding-right: 200px;
}

.card-box {
  margin-bottom: 200px; 
}

.email-icon,
.lock-icon,
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

ul {
  margin-bottom: 0;
}

.errors {
  color: #c60019;
}
</style>