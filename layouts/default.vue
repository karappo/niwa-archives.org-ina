<template lang="pug">
#pageTop
  header
    nuxt-link(v-for="(c, i) in clouds" :key="i" :to="`/${c.alias}/`" :class="_class(c.alias)")
      | {{ c.label }}<br>{{ c.size }}
  main
    nuxt/
  footer
    label(for='shape') PointShape:
    ShapeSelect
</template>

<style lang="sass" scoped>
#pageTop
  height: 100vh
  display: flex
  flex-direction: column
header
  width: 100%
  height: 50px
  flex-basis: 50px
  display: flex
  align-items: center
  a
    height: 100%
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
main
  flex-basis: auto
  background: black
  flex-grow: 2
footer
  width: 100%
  flex-basis: 50px
  background-color: black
  display: flex
  align-items: center
  padding: 0 20px
  color: white
  font-size: 12px
  label
    margin-right: 10px
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
