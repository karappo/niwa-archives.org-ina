<template lang="pug">
article
  .close(@click="$emit('close')") Close
  h1
    span.icon(v-if="icon") {{ icon }}
    | {{ title }}

  ul.list(v-if="data.list.length")
    li(v-for="o in data.list" @click="$emit('showAnnotation', o.index)")
      span.icon(v-if="!icon") {{ getIcon(o.category) }}
      | {{ o.title }}
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
.icon
  font-family: 'Font Awesome 5 Pro-Light-300'
h1
  display: flex
  align-items: center
  .icon
    font-size: 50px
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
      return this.data.category.split('/').pop()
    },
    icon() {
      return this.getIcon(this.data.category)
    }
  },
  methods: {
    getIcon(category) {
      switch (category) {
        case 'Viewpoints/Photos':
          return ''
        case 'Viewpoints/Movies':
          return ''
        case 'Elements/Stones':
          return ''
        case 'Elements/Plants':
          return ''
        case 'Elements/Creatures':
          return ''
        case 'Elements/Artifacts':
          return ''
        case 'Elements/DNA Data':
          return ''
        case 'Oral Archives':
          return ''
      }
      return null
    }
  }
}
</script>
