<template lang="pug">
main
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
nav
  width: 100%
  min-width: 300px
  flex-basis: 50px
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
    &.sessyu-tei
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
          alias: 'sessyu-tei-0.1',
          label: '雪舟庭(0.1)',
          size: '169MB'
        },
        {
          alias: 'sessyu-tei-0.05',
          label: '雪舟庭(0.05)',
          size: '605.1MB'
        },
        {
          alias: 'sessyu-tei-0.02',
          label: '雪舟庭(0.02)',
          size: '2.95GB'
        },
        {
          alias: 'murin-an-0.1',
          label: '無鄰菴(0.1)',
          size: '61.8MB'
        },
        {
          alias: 'murin-an-0.05',
          label: '無鄰菴(0.05)',
          size: '195.5MB'
        },
        {
          alias: 'murin-an-0.02',
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
      const aliasWithoutNum = alias.match(/(.*)-[0-9.]+$/)[1]
      __class[aliasWithoutNum] = true
      return __class
    }
  }
}
</script>
