<template lang="pug">
article
  .close(@click="$emit('close')") Close
  h1 {{ data.title }}
  ul.list(v-if="data.list.length")
    li(v-for="o in data.list" @click="$emit('showAnnotation', o.index)") {{ o.title }}
  .empty(v-else) データがありません
</template>

<style lang="sass" scoped>
article
  background-color: #111
  color: white
  width: calc(100% - 30px)
  min-height: calc(100% - 30px)
  padding: 15px
.close
  float: right
  cursor: pointer
  font-size: 12px
  color: #898989
  transition: color 0.2s
  &:hover
    color: white
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
  }
}
</script>
