<template lang="pug">
  div
    app-header
    main
      .container
        v-app
          router-view.router-view
    app-footer
  </div>
</template>
<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { INTERNAL_SERVER_ERROR } from './enums';
export default {
  name: `app-view`,
  components : {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      logined: false
    };
  },
  computed: {
    errorCode () {
      return this.$store.state.error.code
    }
  },
  watch: {
    errorCode: {
      handler (value) {
        if (value === INTERNAL_SERVER_ERROR) {
          this.$router.push('/500')
        }
      },
      immediate: true
    },
    $route () {
      this.$store.commit('error/setCode', null)
    }
  }
};
</script>
<style lang="scss" scoped>
.app-header {
  background: white;
}

.router-view {
  margin-top: 70px;
  width: 120%;
}
</style>