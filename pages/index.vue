<template lang="pug">
main
  Img2X.mv(src='mv.jpg')
  article
    nuxt-content(:document="page")
</template>

<style lang="sass" scoped>
main
  padding-top: 150px
  .mv
    padding-left: 63px
    width: calc(100% - 63px)
    height: auto
    margin-bottom: 60px
  article
    width: 690px
    margin-left: auto
    margin-right: 0
    font-size: 15px
    line-height: 2
    h2
      font-size: 16px
      &:not(:first-child)
        margin-top: 250px
    p + p
      margin-top: 2em
</style>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content('ja').fetch()
    return {
      page
    }
  }
}
</script>
