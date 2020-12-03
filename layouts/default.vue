<template lang="pug">
#pageTop
  nav
    nuxt-link.sessyu-tei(to='/sessyu-tei-0.1/' :class="{current: $route.path === '/sessyu-tei-0.1/'}") 雪舟庭(0.1)<br>169MB
    nuxt-link.sessyu-tei(to='/sessyu-tei-0.05/' :class="{current: $route.path === '/sessyu-tei-0.05/'}") 雪舟庭(0.05)<br>605.1MB
    nuxt-link.sessyu-tei(to='/sessyu-tei-0.02/' :class="{current: $route.path === '/sessyu-tei-0.02/'}") 雪舟庭(0.02)<br>2.95GB
    nuxt-link.murin-an(to='/murin-an-0.1/' :class="{current: $route.path === '/murin-an-0.1/'}") 無鄰菴(0.1)<br>61.8MB
    nuxt-link.murin-an(to='/murin-an-0.05/' :class="{current: $route.path === '/murin-an-0.05/'}") 無鄰菴(0.05)<br>195.5MB
    nuxt-link.murin-an(to='/murin-an-0.02/' :class="{current: $route.path === '/murin-an-0.02/'}") 無鄰菴(0.02)<br>750.3MB
  main
    nuxt/
</template>

<style lang="sass" scoped>
#pageTop
  display: flex
  flex-wrap: wrap
  flex-direction: column
$nav_h: 50px
nav
  width: 100%
  height: $nav_h
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
    text-align: center
    &.sessyu-tei
      background-color: #a5c6de
      &.current
        background-color: #73b0dc
    &.murin-an
      background-color: #a5ded6
      &.current
        background-color: #78d4c7
main
  height: calc(100vh - #{$nav_h})
  background: black
</style>
