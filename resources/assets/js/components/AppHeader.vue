<template lang="pug">
  .app-header
    v-card
      v-app-bar(
        absolute
        color="white"
        elevate-on-scroll
      )
        v-toolbar-title.toolbar-title(@click="moveToTop") BookSeeker
        v-spacer
        v-text-field.search-input(
          class="shrink"
        )
        v-btn(class="icon")
          v-icon mdi-magnify
        .btn-box
          v-btn.btn(
            depressed 
            small 
            @click="register"
          ) 新規登録
          v-btn.btn(
            v-if="!isLoggedIn"
            depressed 
            small 
            @click="login"
          ) ログイン
          v-btn.btn.logout(
            v-if="isLoggedIn"
            depressed 
            small 
            @click="moveTologout"
          ) ログアウト
        .user-info(v-if="!isLoggedIn")
          .user-notice ようこそ！無名さん
        .user-info(v-if="isLoggedIn") 
          .user-notice ようこそ！{{ username }} さん
          .user-icon
            v-icon(
              class="account-icon"
              @click="changeVisibleOfAccountListItemGroup"
            ) mdi-account
            v-icon(
              v-show="!visibleOfAccountListItemGroup"
              @click="changeVisibleOfAccountListItemGroup"
            ) mdi-chevron-double-down
            v-icon(
              v-show="visibleOfAccountListItemGroup"
              @click="changeVisibleOfAccountListItemGroup"
            ) mdi-chevron-double-up
    app-dialog(
      :visibleOfDialog="visibleOfDialog"
      @getResult="logout"
    )
      div(slot="title") 確認
      div(slot="message") ログアウトしますか？
    transition(name="fade")    
      app-list-item-group(
        class="account-list-item-group"
        v-show="visibleOfAccountListItemGroup"
        :model="visibleOfAccountListItemGroup"
        :items="AccountItems"
        :maxWidth="listItemGroupMaxWidth"
      )
</template>
<script>
import AppDialog from "./elements/AppDialog.vue";
import AppListItemGroup from "./elements/AppListItemGroup.vue";
export default {
  name: `AppHeader`,
  components : {
    AppDialog,
    AppListItemGroup,
  },
  data() {
    return {
      listItemGroupMaxWidth: `230px`,
      visibleOfDialog: false,
      visibleOfAccountListItemGroup: false,
      AccountItems: [
        {
          icon: `mdi-account-card-details`,
          text: `ユーザー情報管理`,
        },
        {
          icon: 'mdi-star',
          text: '気になるリスト',
        },
      ],
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
    }
  },
  methods: {
    /** トップページに遷移する */
    moveToTop() {
      this.$router.push({ name: `top` });
    },

    /** 新規登録する */
    register() {
      this.$router.push({ name: `register` });
    },

    /** ログインする */
    login() {
      this.$router.push({ name: `login` });
    },

    /** ログアウトの準備をする */
    moveTologout() {
      this.visibleOfDialog = true;
    },

    /** ログアウトする */
    async logout(shouldLogout) {
      this.visibleOfDialog = false;
      if (shouldLogout) {
        console.log(shouldLogout);
        await this.$store.dispatch('auth/logout');
      }
    },

    /** アカウント情報リストの表示状態を切り替える */
    changeVisibleOfAccountListItemGroup() {
      this.visibleOfAccountListItemGroup = !this.visibleOfAccountListItemGroup;
    },
  }
}
</script>
<style lang="scss" scoped>
header {
 background: #fff;
}

.app-header {
  position: fixed;
  width: 100%;
  z-index: 9999;
}

.toolbar-title {
  cursor: pointer;
}

.account-icon,
.account-list-item-group,
.account-list-item-group-box {
  display: inline-block;
}

.account-icon {
  padding-bottom: 2px;
}

.search-input {
  margin-right: 20px;
  height: 36px;
  width: 240px;
}

.btn-box {
  margin-left: 10px;
}

.btn {
  margin-left: 10px;
}

.account-list-item-group {
  position: absolute;
  top: 64px;
  right: 0;
}

.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.fade-enter, .fade-leave-to {
  transform: translateY(-200px);
  opacity: 0;
}

.user-info,
.user-icon,
.user-notice {
  display: inline-block;
}

.user-info {
  padding-left: 10px;
}

.user-icon {
  margin-left: 5px; 
}

.user-notice {
  font-size: 12px;
  padding-right: 10px;
}
</style>