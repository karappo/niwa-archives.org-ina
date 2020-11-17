<template lang="pug">
#pageTop
  nav
    nuxt-link(to='/sessyu-tei-0.2/' :class="{current: $route.path === '/sessyu-tei-0.2/'}") 雪舟庭(0.2)
    nuxt-link(to='/sessyu-tei-0.1/' :class="{current: $route.path === '/sessyu-tei-0.1/'}") 雪舟庭(0.1)
    nuxt-link(to='/sessyu-tei-0.08/' :class="{current: $route.path === '/sessyu-tei-0.08/'}") 雪舟庭(0.08)
    nuxt-link(to='/sessyu-tei-0.07/' :class="{current: $route.path === '/sessyu-tei-0.07/'}") 雪舟庭(0.07)
    nuxt-link(to='/murin-an-0.2/' :class="{current: $route.path === '/murin-an-0.2/'}") 無鄰菴(0.2)
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
