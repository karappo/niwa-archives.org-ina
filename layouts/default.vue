<template lang="pug">
#pageTop
  nav
    nuxt-link.sessyu-tei(to='/sessyu-tei-0.2/' :class="{current: $route.path === '/sessyu-tei-0.2/'}") 雪舟庭(0.2)
    nuxt-link.sessyu-tei(to='/sessyu-tei-0.1/' :class="{current: $route.path === '/sessyu-tei-0.1/'}") 雪舟庭(0.1)
    nuxt-link.sessyu-tei(to='/sessyu-tei-0.08/' :class="{current: $route.path === '/sessyu-tei-0.08/'}") 雪舟庭(0.08)
    nuxt-link.sessyu-tei(to='/sessyu-tei-0.07/' :class="{current: $route.path === '/sessyu-tei-0.07/'}") 雪舟庭(0.07)
    nuxt-link.murin-an(to='/murin-an-0.2/' :class="{current: $route.path === '/murin-an-0.2/'}") 無鄰菴(0.2)
    nuxt-link.murin-an(to='/murin-an-0.1/' :class="{current: $route.path === '/murin-an-0.1/'}") 無鄰菴(0.1)
    nuxt-link.murin-an(to='/murin-an-0.08/' :class="{current: $route.path === '/murin-an-0.08/'}") 無鄰菴(0.08)
    nuxt-link.murin-an(to='/murin-an-0.07/' :class="{current: $route.path === '/murin-an-0.07/'}") 無鄰菴(0.07)
    nuxt-link.murin-an(to='/murin-an-0.06/' :class="{current: $route.path === '/murin-an-0.06/'}") 無鄰菴(0.06)
    nuxt-link.murin-an(to='/murin-an-0.05/' :class="{current: $route.path === '/murin-an-0.05/'}") 無鄰菴(0.05)
    nuxt-link.murin-an(to='/murin-an-0.04/' :class="{current: $route.path === '/murin-an-0.04/'}") 無鄰菴(0.04)
    nuxt-link.murin-an(to='/murin-an-0.03/' :class="{current: $route.path === '/murin-an-0.03/'}") 無鄰菴(0.03)
    nuxt-link.murin-an(to='/murin-an-0.02/' :class="{current: $route.path === '/murin-an-0.02/'}") 無鄰菴(0.02)
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
    font-size: 11px
    &.sessyu-tei
      background-color: #a5c6de
      &.current
        background-color: #73b0dc
    &.murin-an
      background-color: #a5ded6
      &.current
        background-color: #78d4c7
main
  height: calc(100vh - 30px)
  background: black
</style>
