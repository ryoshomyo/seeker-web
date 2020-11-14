<template lang="pug">
  .app-footer
    v-footer(
      padless
    )
      v-card.cart-box(
        flat
        tile
        class="indigo lighten-1 white--text text-center "
      )
        v-card-text
          v-btn(
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          )
            v-icon(size="24px") {{ icon }}
        v-card-text(class="white--text pt-0 main-card-text") {{ mainCardText }}
        v-divider
        v-card-text(class="white--text") {{ subCardText }}
</template>
<script>
export default {
  name: `AppFooter`,
  computed: {
    mainCardText() {
      // TODO: 後で補完
      return ``;
      // return `Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.`;
    },
    subCardText() {
      return `${new Date().getFullYear()} — book-seeker`;
    },
    icons() {
      return [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram',
      ];
    }
  },
};
</script>
<style lang="scss" scoped>
.cart-box {
  width: 100%;
}
</style>