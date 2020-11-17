<template lang="pug">
#pageTop
  nav
    nuxt-link.sessyu-tei(to='/sessyu-tei-0.2/' :class="{current: $route.path === '/sessyu-tei-0.2/'}") 雪舟庭(0.2)<br>41.2MB
    nuxt-link.sessyu-tei(to='/sessyu-tei-0.1/' :class="{current: $route.path === '/sessyu-tei-0.1/'}") 雪舟庭(0.1)<br>169MB
    nuxt-link.sessyu-tei(to='/sessyu-tei-0.08/' :class="{current: $route.path === '/sessyu-tei-0.08/'}") 雪舟庭(0.08)<br>263.4MB
    nuxt-link.sessyu-tei(to='/sessyu-tei-0.07/' :class="{current: $route.path === '/sessyu-tei-0.07/'}") 雪舟庭(0.07)<br>341.7MB
    nuxt-link.murin-an(to='/murin-an-0.2/' :class="{current: $route.path === '/murin-an-0.2/'}") 無鄰菴(0.2)<br>17.3MB
    nuxt-link.murin-an(to='/murin-an-0.1/' :class="{current: $route.path === '/murin-an-0.1/'}") 無鄰菴(0.1)<br>61.8MB
    nuxt-link.murin-an(to='/murin-an-0.08/' :class="{current: $route.path === '/murin-an-0.08/'}") 無鄰菴(0.08)<br>91.6MB
    nuxt-link.murin-an(to='/murin-an-0.07/' :class="{current: $route.path === '/murin-an-0.07/'}") 無鄰菴(0.07)<br>114.1MB
    //- nuxt-link.murin-an(to='/murin-an-0.06/' :class="{current: $route.path === '/murin-an-0.06/'}") 無鄰菴(0.06)<br>146.7MB
    nuxt-link.murin-an(to='/murin-an-0.05/' :class="{current: $route.path === '/murin-an-0.05/'}") 無鄰菴(0.05)<br>195.5MB
    //- nuxt-link.murin-an(to='/murin-an-0.04/' :class="{current: $route.path === '/murin-an-0.04/'}") 無鄰菴(0.04)<br>276.6MB
    //- nuxt-link.murin-an(to='/murin-an-0.03/' :class="{current: $route.path === '/murin-an-0.03/'}") 無鄰菴(0.03)<br>418.8MB
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
