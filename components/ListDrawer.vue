<template lang="pug">
article
  header
    h1
      Icon(:category="data.category")
      | {{ title }}
    a.close(@click="$emit('close')" title="Close") X
  ul.list(v-if="data.list.length")
    li(v-for="o in data.list" @click="$emit('showAnnotation', o.index)")
      Icon(v-if="!icon" :category="o.category")
      | {{ o.title }}
  .empty(v-else) データがありません
</template>

<style lang="sass" scoped>
@import ~/assets/style/const
article
  background-color: #111
  color: white
  width: calc(100% - 30px)
  min-height: calc(100% - 30px)
  padding: 15px
header
  display: flex
  height: 65px
  align-items: center
  margin-bottom: 15px
.close
  @extend %button
  height: 32px
  width: 32px
  font-size: 12px
  color: #898989
  transition: color 0.2s
  margin-left: 10px
  margin-right: 0
  &:hover
    color: white
h1
  display: flex
  align-items: center
  margin: 0
  margin-right: auto
  .icon
    font-size: 30px
    margin-right: 0.5em
.list
  display: block
  padding: 0
  margin: 0
  li
    display: block
    padding: 0.5em 0
    border-top: 1px solid #555
    color: #898989
    cursor: pointer
    .icon
      margin-right: 0.5em
    &:hover
      color: white
  li:last-child
    border-bottom: 1px solid #555
.empty
  color: #898989
</style>

<script>
export default {
  props: {
    data: {
      type: Object,
      require: true,
      default: null
    }
  },
  computed: {
    title() {
      return this.$getTitle(this.data.category)
    },
    icon() {
      return this.$getIcon(this.data.category)
    }
  }
}
</script>
