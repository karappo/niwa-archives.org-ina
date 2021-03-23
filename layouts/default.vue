<template lang="pug">
#pageTop
  header
    h1
      a(href="#pageTop")
        Img2X.logo(src='logo.png')
      span Project Outline
    nav.sections
      a(href="#about") About
      a(href="#report") Report
      a(href="#credit") Credit
    nav.languages
      nuxt-link(to='/en/' :class="{current: $nuxt.$route.path === '/en/'}") English
      nuxt-link(to='/' :class="{current: $nuxt.$route.path === '/'}") Japanese
  Img2X.floatingTitle(src='owaranai.png' alt='終らない庭のアーカイヴ')
  nuxt/
</template>

<style lang="sass" scoped>
@import '~/assets/style/general/const'
#pageTop
  header
    padding: 88px 62px
    margin-top: -21px
    margin-left: 5px
    font-family: 'K2-v1-Light', $helvetica
    display: flex
    h1
      position: fixed
      display: flex
      align-items: flex-start
      margin-top: 1px
      span
        color: #A3A3A3
        font-size: 15px
        font-weight: lighter
        letter-spacing: 0.05em
        margin-top: 2px
        margin-left: 70px
    nav
      a
        font-size: 15px
        letter-spacing: 0.06em
        padding-bottom: 13px
      .current
        border-bottom: 1px solid #A9BCB6
      a + a
        margin-left: 32px
    nav.sections
      margin: 3px 102px 0 auto
    nav.languages
      margin: 3px 0 0 0
      display: flex
      position: relative
      &:before
        content: ''
        position: absolute
        top: 7px
        left: -90px
        display: block
        width: 70px
        border-top: 1px solid #516760
.floatingTitle
  position: fixed
  left: 62px
  bottom: 56px
  z-index: -1
</style>

<script>
export default {}
</script>
