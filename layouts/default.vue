<template lang="pug">
#pageTop
  nav
    nuxt-link(to='/sessyu-tei/' :class="{current: $route.path === '/sessyu-tei/'}") 雪舟庭
    nuxt-link(to='/murin-an/' :class="{current: $route.path === '/murin-an/'}") 無鄰菴
  main
    nuxt/
</template>

<style lang="sass" scoped>
#pageTop
  display: flex
  flex-wrap: wrap
  flex-direction: column
nav
  width: 100%
  height: 30px
  display: flex
  align-items: center
  a
    width: 50%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    background: gray
    color: white
    &.current
      background: black
main
  height: calc(100vh - 30px)
  background: black
</style>
