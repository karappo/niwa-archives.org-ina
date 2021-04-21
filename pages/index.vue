<template lang="pug">
main
  .wrap
    h1 Incomplete Niwa Archives <br>終らない庭のアーカイヴ
    nav
      nuxt-link(v-for="(c, i) in clouds" :key="i" :to="`/${c.alias}/`" :class="_class(c.alias)")
        | {{ c.label }}<br>{{ c.size }}
</template>

<style lang="sass" scoped>
main
  background: black
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
.wrap
  width: 100%
  max-width: 300px
h1
  font-size: 18px
  color: white
  text-align: center
nav
  flex-basis: 50px
  width: 100%
  display: flex
  align-items: center
  flex-wrap: wrap
  a
    margin: 1px
    height: 60px
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    background: gray
    color: white
    font-size: 11px
    text-align: center
    &.joei-ji
      background-color: #a5c6de
      &.current
        background-color: #73b0dc
    &.murin-an
      background-color: #a5ded6
      &.current
        background-color: #78d4c7
</style>

<script>
export default {
  data() {
    return {
      clouds: [
        {
          alias: 'joei-ji',
          label: '常栄寺(0.02)',
          size: '2.95GB'
        },
        {
          alias: 'murin-an',
          label: '無鄰菴(0.02)',
          size: '750.3MB'
        }
      ]
    }
  },
  methods: {
    _class(alias) {
      const __class = {
        current: this.$route.path === `/${alias}/`
      }
      __class[alias] = true
      return __class
    }
  }
}
</script>
