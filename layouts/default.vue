<template lang="pug">
#pageTop
  header(data-fuwa)
    h1
      a(href="#" v-scroll-to="'#pageTop'")
        Img2X.logo(src='logo.png')
      span Project Outline
    nav.sections
      a(href="#" v-scroll-to="'#about'") About
      a(href="#" v-scroll-to="'#report'") Report
      a(href="#" v-scroll-to="'#credit'") Credit
    nav.languages
      nuxt-link(to='/en/' :class="{current: $nuxt.$route.path === '/en/'}")
        span.pc English
        span.sp EN
      nuxt-link(to='/' :class="{current: $nuxt.$route.path === '/'}")
        span.pc Japanese
        span.sp JA
  Img2X.floatingTitle(src='owaranai.png' alt='終らない庭のアーカイヴ')
  nuxt/
</template>

<style lang="sass" scoped>
@import '~/assets/style/general/const'
@import '~/assets/style/const'
#pageTop
  header
    padding: 88px 62px
    margin-top: -21px
    margin-left: 5px
    font-family: 'K2-v1-Light', $helvetica
    display: flex
    +sp
      margin-top: 0
      margin-left: 0
      padding: 43px 22px 0
    h1
      position: fixed
      display: flex
      align-items: flex-start
      margin-top: 1px
      z-index: 2
      +sp
        position: relative
        flex-direction: column
      span
        color: #A3A3A3
        font-size: 15px
        font-weight: lighter
        letter-spacing: 0.05em
        margin-top: 2px
        margin-left: 70px
        +sp
          margin-top: 86px
          margin-left: 0
          font-size: 12px
    a
      color: white
    nav
      a
        font-size: 15px
        letter-spacing: 0.06em
        padding-bottom: 13px
      .current
        border-bottom: 1px solid #A9BCB6
      a + a
        margin-left: 32px
        +sp
          margin-left: 16px
    nav.sections
      margin: 3px 262px 0 auto
      position: relative
      +sp
        display: none
      &:after
        content: ''
        position: absolute
        top: 7px
        right: -80px
        display: block
        width: 70px
        border-top: 1px solid #516760
    nav.languages
      margin: 3px 0 0 0
      display: flex
      position: fixed
      top: 66px
      right: 65px
      z-index: 2
      +sp
        top: 43px
        right: 25px
.floatingTitle
  position: fixed
  left: 62px
  bottom: 56px
  z-index: -1
  +sp
    display: none
</style>

<script>
export default {
  mounted() {
    window.addEventListener('resize', this.setVH)
    this.setVH()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setVH)
  },
  methods: {
    setVH() {
      const vh = window.innerHeight
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  }
}
</script>
