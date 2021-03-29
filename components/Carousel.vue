<template lang="pug">
swiper.carousel(ref="mySwiper" :options="options")
  swiper-slide(v-for="(i, index) in [1,2,3,4]" :key="i")
    .slide(:style="style(i)")
      img.aspect(src="~/assets/image/carousel-aspect-ratio.svg")
      .caption {{ $t(`carouselCaptions[${index}]`) }}
</template>

<style lang="sass" scoped>
@import '~/assets/style/const'
.carousel
  width: 100%
  position: relative
  .slide
    background-position: center
    background-size: cover
    +sp
      width: 100%
      height: calc( var(--vh, 100vh) - 277px) // ブラウザのUIを考慮した高さを取得
  img.aspect
    width: 100%
    height: auto
    visibility: hidden
    +sp
      display: none
  .caption
    opacity: 0.8
    position: absolute
    right: 20px
    bottom: 10px
    font-family: 'K2-v1-Regular'
    font-weight: bold
    text-align: right
    color: rgba(255,255,255,0.8)
    font-size: 12px
    line-height: 1
    line-height: 23px
    text-shadow: 0px 0px 4px black
    +sp
      display: none
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
  },
  methods: {
    style(i) {
      return {
        backgroundImage: `url(${require(`@/assets/image/mv-${i}@2x.jpg`)})`
      }
    }
  }
}
</script>
