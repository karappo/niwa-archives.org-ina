<template lang="pug">
main
  .wrap
    h1 Incomplete Niwa Archives <br>終らない庭のアーカイヴ
    nav
      nuxt-link(v-for="(c, i) in clouds" :key="i" :to="c.href" :class="c.class")
        | {{ c.label }}
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
    font-size: 15px
    text-align: center
    &.joei_ji
      background-color: #88b5d6
    &.murin_an
      background-color: #84c1b9
    &.ryogen_in
      background-color: #6dd261
</style>

<script>
export default {
  data() {
    return {
      clouds: [
        {
          href: '/joei_ji/',
          class: 'joei_ji',
          label: '常栄寺'
        },
        {
          href: '/murin_an-summer/',
          class: 'murin_an',
          label: '無鄰菴 - 夏'
        },
        {
          href: '/murin_an-winter/',
          class: 'murin_an',
          label: '無鄰菴 - 冬'
        },
        {
          href: '/murin_an-snow/',
          class: 'murin_an',
          label: '無鄰菴 - 雪化粧'
        },
        {
          href: '/ryogen_in/',
          class: 'ryogen_in',
          label: '龍源院'
        }
      ]
    }
  }
}
</script>
