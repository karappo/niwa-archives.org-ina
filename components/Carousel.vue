<template lang="pug">
swiper.carousel(ref="mySwiper" :options="options")
  swiper-slide(v-for="(i, index) in [1,2,3,4]" :key="i")
    Img2X(:src="`mv-${i}.jpg`")
    .caption {{ slides[index].caption }}
</template>

<style lang="sass" scoped>
@import '~/assets/style/const'
.carousel
  width: 100%
  position: relative
  img
    width: 100%
    height: auto
  .caption
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
</style>

<script>
export default {
  data() {
    return {
      slides: [
        { caption: '3D scanning data of Sessyu-tei' },
        { caption: '3D scanning data of Sessyu-tei' },
        { caption: '3D scanning data of Murin-an' },
        { caption: '3D scanning data of Murin-an' }
      ],
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
