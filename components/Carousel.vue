<template lang="pug">
swiper.carousel(ref="mySwiper" :options="options")
  swiper-slide(v-for="i in [1,2,3,4]" :key="i")
    Img2X(:src="`mv-${i}.jpg`")
</template>

<style lang="sass" scoped>
.carousel
  width: 100%
  img
    width: 100%
    height: auto
</style>

<script>
export default {
  data() {
    return {
      options: {
        autoplay: true,
        allowTouchMove: false,
        effect: 'fade',
        speed: 5000,
        fadeEffect: {
          crossFade: true
        },
        loop: true
      }
    }
  }
}
</script>
