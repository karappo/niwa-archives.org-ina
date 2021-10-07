<template lang="pug">
.sorryScreen
  h1.en
    img(
      src='~/assets/image/top/logo-en.png'
      srcset='~/assets/image/top/logo-en.png 1x, ~/assets/image/top/logo-en@2x.png 2x'
      alt='Incomplete Niwa Archives'
    )
  p.ja
    | このページはモバイル端末からはご覧に慣れません。<br>
    | デスクトップ版 Chrome でご覧ください。
  p.en
    | You are not accustomed to viewing this page from a mobile device. Please use the desktop version of Chrome.
  nuxt-link(to="/") Back to top
</template>

<style lang="sass" scoped>
.sorryScreen
  background-color: #121212
  color: white
  width: calc(100% - 40px)
  height: calc(100% - 40px)
  padding: 20px
  display: flex
  flex-direction: column
  justify-content: flex-end
  h1.en
    position: absolute
    top: 23px
    left: 20px
    margin-top: 0
    margin-bottom: auto
    img
      width: 105px
      height: auto
  p
    font-size: 12px
    line-height: 2
  p + p
    margin-top: 20px
  a
    margin-top: 40px
    margin-bottom: 20px
    background-color: #CECECE
    color: black
    font-size: 16px
    display: block
    height: 30px
    border-radius: 30px
    display: flex
    justify-content: center
    align-items: center
    padding: 10px
</style>
