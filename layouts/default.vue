<template lang="pug">
#pageTop
  header
    Img2X.logo(src='logo.png')
    .content
      .label
        span.ja 終らない庭のアーカイヴ
        span.en Project Outline

  nuxt/
</template>

<style lang="sass" scoped>
#pageTop
  padding: 0 62px
  header
    padding: 64px 62px 0
    .logo
    .label
      &:before
        content: ''
        display: block
        width: 110px
        border-top: 1px solid #516760
</style>

<script>
export default {}
</script>
