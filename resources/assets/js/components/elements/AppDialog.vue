<template lang="pug">
  .app-dialog
    v-dialog(
      v-model="dialog"
      max-width="290"
      persistent="persistent"
    )
      v-card
        v-card-title.headline
          slot(name="title")
        v-card-text
          slot(name="message")
        v-card-actions
          v-spacer
          v-btn(color="black" text="" @click="sendNoFlag")
            | いいえ
          v-btn(color="black" text="" @click="sendYesFlag")
            | はい
</template>
<script>
  export default {
    name: `AppDialog`,
    props: {
      /** ダイアログを表示するか */
      visibleOfDialog: Boolean,
    },
    data() {
      return {
        dialog: false,
        persistent: false,
      };
    },
    methods: {
      /** ダイアログを閉じる */
      sendNoFlag() {
        this.dialog = false;
        this.$emit('getResult', false);
      },

      /** ダイアログで はい をクリックした場合は親コンポーネントに知らせる */
      sendYesFlag() {
        this.dialog = false;
        this.$emit('getResult', true);
      }
    },
    watch: {
      visibleOfDialog() {
        this.dialog = this.visibleOfDialog || false;
      },
    }
  }
</script>