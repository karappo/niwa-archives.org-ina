<template lang="pug">
#pageTop
  header
    .colL
      Img2X.logo(src='logo.png')
    .colR
      .label
        span.ja 終らない庭のアーカイヴ
        span.en Project Outline
      nav.lang
        nuxt-link(to='/en/' :class="{current: $nuxt.$route.path === '/en/'}") EN
        nuxt-link(to='/' :class="{current: $nuxt.$route.path === '/'}") JA
  nuxt/
</template>

<style lang="sass" scoped>
@import '~/assets/style/general/const'
#pageTop
  padding: 62px
  header
    display: flex
    margin-top: 5px
    .colL
      width: auto
      flex: 1
      .logo
        position: fixed
    .colR
      width: 690px
      margin-right: 0
      display: flex
      position: relative
      .label
        position: relative
        display: flex
        flex-direction: column
        margin-top: -10px
        &:before
          position: absolute
          top: 11px
          left: -128px
          content: ''
          display: block
          width: 110px
          border-top: 1px solid #516760
        .ja
          font-size: 16px
        .en
          margin-top: 14px
          font-size: 14px
      nav.lang
        position: fixed
        margin-top: 3px
        right: 63px
        display: flex
        font-family: $helvetica
        a
          font-size: 15px
          letter-spacing: 0.03em
          padding-bottom: 13px
        .current
          border-bottom: 1px solid #A9BCB6
        a + a
          margin-left: 1em
</style>

<script>
export default {}
</script>
