<template lang="pug">
.root
  .mv
    h1.en
      img(
        src='~/assets/image/top/logo-en.png'
        srcset='~/assets/image/top/logo-en.png 1x, ~/assets/image/top/logo-en@2x.png 2x'
        alt='Incomplete Niwa Archives'
      )
    nav.globalNav
      a(href='#about') About
      a(href='#archives') Archives
      a(href='#exhibition') Exhibition
      a(href='#reports') Reports
    ScrollGuide(
      text="Scroll"
      gutterColor="rgba(255,255,255,0.5)"
      highlightColor="#ffffff"
      textColor="#ffffff"
    )
    h1.ja
      LogoJa.logoJa
  section.about
    h2 About
    .cols(data-col="2")
      .col
        p 「庭園アーカイヴ・プロジェクト」は、日本庭園研究者の原瑠璃彦と、伊藤隆之（YCAM）、高原文江（YCAM）、津田和俊（YCAM、京都工芸繊維大学）、城一裕（YCAM、九州大学）による共同研究開発プロジェクトであり、2019年4月に発足しました。このプロジェクトでは、現代のテクノロジー、YCAMがこれまで様々な活動で培ってきたノウハウを駆使して、日本庭園の新しいアーカイヴを研究開発しています。
      .col
        p Launched in April 2019, the Garden Archives Project aims to study and develop a new kind of comprehensive archives that digitally survey Japanese gardens’ diverse aspects.
    .cols(data-col="2")
      .col
        a(href="#") Read more.
      .col
        a(href="#") Read more.
  section.archives
    h2 Archives
    .garden.joei_ji
      .cols(data-col="4")
        .col
          h3 常栄寺庭園
        .col
          | Jōei-ji Garden<br>
          | Yamaguchi
        .col
          | Update<br>
          | {{ format($store.getters.lastUpdateDateTime.joeiJi) }}
        .col
          | Annotations Quantity<br>
          | {{ $store.state.annotations.joeiJi.length }}
      nuxt-link.image(to='/joei_ji/')
        img(
          src='~/assets/image/top/joei_ji.jpg'
          srcset='~/assets/image/top/joei_ji.jpg 1x, ~/assets/image/top/joei_ji@2x.jpg 2x'
          alt='常栄寺の点群'
        )
    .garden.murin_an
      .cols(data-col="4")
        .col
          h3 無鄰菴庭園
        .col
          | Murin-an Garden<br>
          | Kyoto
        .col
          | Update<br>
          | {{ format(murinAnLastUpdateDateTime) }}
        .col
          | Annotations Quantity<br>
          | {{ murinAnDataQuantity }}
      a.image(@click="showMuriAnLink = !showMuriAnLink")
        img(
          src='~/assets/image/top/murin_an.jpg'
          srcset='~/assets/image/top/murin_an.jpg 1x, ~/assets/image/top/murin_an@2x.jpg 2x'
          alt='無鄰菴の点群'
        )
        .overlay(v-if="showMuriAnLink")
          .select3D
            h6 Select 3D Data
            nav
              nuxt-link(to='/murin_an-summer/') Summer
              nuxt-link(to='/murin_an-winter/') Winter
              nuxt-link(to='/murin_an-snow/') Snow
    .garden.ryogen_in
      .cols(data-col="4")
        .col
          h3 龍源院庭園
        .col
          | Ryōgen-in Garden<br>
          | Kyoto
        .col
          | Update<br>
          | {{ format($store.getters.lastUpdateDateTime.ryogenIn) }}
        .col
          | Annotations Quantity<br>
          | {{ $store.state.annotations.ryogenIn.length }}
      nuxt-link.image(to='/ryogen_in/')
        img(
          src='~/assets/image/top/ryogen_in.jpg'
          srcset='~/assets/image/top/ryogen_in.jpg 1x, ~/assets/image/top/ryogen_in@2x.jpg 2x'
          alt='無鄰菴の点群'
        )
</template>

<style lang="sass" scoped>
@import ../assets/style/general/clf
.root
  position: relative
%wrap
  padding: 0 65px
.mv
  width: 100%
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  background-color: #0B101A
  background-image: url('~assets/image/top/bg@2x.jpg')
  background-position: center
  background-size: cover
  position: relative
  /deep/
    .scroll_guide_wrap
      position: absolute
      left: 0
      bottom: 4px
      width: 14px
      .scroll_guide
        padding: 36px
        > span
          font-size: 12px
          letter-spacing: 0.05em
          transform: rotate(90deg)
        > i
          margin-top: 19px
          width: 1px
          height: 65px
  h1.en
    position: absolute
    top: 40px
    left: 40px
  .logoJa
    width: 102vw
    height: auto
  .globalNav
    position: fixed
    top: 40px
    right: 40px
    font-size: 15px
    font-family: 'K2-v1-Light'
    color: #CBD5C8
    a + a
      margin-left: 2em
section
  background-color: #0B101A
  padding-top: 100px
  font-size: 14px
  line-height: 27px
  letter-spacing: 0.06em
  &.about
    @extend %wrap
    padding-top: 100px
  &.archives
    h2
      @extend %wrap
    .garden
      .image
        display: block
        margin-top: 90px
        cursor: pointer
        img
          width: 100%
          height: auto
      .cols
        @extend %wrap
    .garden + .garden
      margin-top: 92px
  h2
    margin: 92px 0
    font-size: 15px
    font-weight: normal
  .cols + .cols
    margin-top: 2em
  .cols
    @extend .clf
    .col
      float: left
    .col + .col
      margin-left: 50px
    &[data-col="2"]
      .col
        width: calc((100% - 50px) / 2)
    &[data-col="4"]
      .col
        width: calc((100% - 150px) / 4)
</style>

<script>
import dayjs from 'dayjs'
import { ScrollGuide } from '@karappo-inc/vue-components'
import LogoJa from '~/assets/image/top/logo-ja.svg?inline'
export default {
  components: {
    ScrollGuide,
    LogoJa
  },
  data() {
    return {
      showMuriAnLink: true
    }
  },
  computed: {
    murinAnLastUpdateDateTime() {
      return this.$store.getters.lastUpdateDateTime.ryogenIn
    },
    murinAnDataQuantity() {
      const a = this.$store.state.annotations
      return (
        a.murinAnSummer.length + a.murinAnWinter.length + a.murinAnSnow.length
      )
    }
  },
  methods: {
    format(datetime) {
      return dayjs(datetime).format('YYYY.MM.DD HH:mm:ss')
    }
  },
  head: {
    bodyAttrs: {
      class: 'top'
    }
  }
}
</script>
