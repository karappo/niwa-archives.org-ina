<template lang="pug">
.linkCheck(:class="{disabled}")
  ListLink(:listName="listName" :dot="dot") {{ title }}
  input(v-if="!disabled" type="checkbox" v-model="visibility")
</template>

<style lang="sass" scoped>
.linkCheck
  display: flex
  align-items: center
  justify-content: space-between
  &.disabled
    opacity: 0.5
    pointer-events: none
</style>

<script>
import { camelCase } from 'change-case'
export default {
  props: {
    listName: {
      type: String,
      required: true,
      default: ''
    },
    dot: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    title() {
      return this.$getTitle(this.listName)
    },
    disabled() {
      if (this.listName === 'Annotations') {
        return false
      }
      // eslint-disable-next-line
      const annotations = this.$store.state.annotations[camelCase(this.$route.params.alias)]
      // eslint-disable-next-line
      return !annotations.filter((a) => a.category.includes(this.listName)).length
    },
    visibility: {
      get() {
        return this.$store.getters.annotationVisibilities[this.listName]
      },
      set(value) {
        const key = this.listName
        this.$store.commit('annotationVisibilities', { key, value })
      }
    }
  }
}
</script>
