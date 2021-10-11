<template lang="pug">
.linkCheck(:class="{disabled}")
  ListLink(:listName="listName" :icon="icon") {{ title }}
  el-checkbox(v-if="!disabled" v-model="visibility" :indeterminate="indeterminate")
</template>

<style lang="sass" scoped>
.linkCheck
  display: flex
  align-items: center
  justify-content: space-between
  &.disabled
    opacity: 0.5
    pointer-events: none
  /deep/ .el-checkbox
    margin-right: 12px
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner
    background-color: #434343
    border-color: #434343
  /deep/ .el-checkbox__inner
    border-color: transparent
    background-color: #434343
  /deep/ .el-checkbox__inner::after
    border: 2px solid #D3D3D3
    border-left: 0
    border-top: 0
    top: 0
    transition: none
  /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner::before
    background-color: #D3D3D3
</style>

<script>
import _uniq from 'lodash/uniq'
import { camelCase } from 'change-case'
export default {
  props: {
    listName: {
      type: String,
      required: true,
      default: ''
    },
    icon: {
      type: String,
      default: null
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
    },
    indeterminate() {
      if (this.listName === 'Annotations') {
        const childrenValues = []
        // eslint-disable-next-line
        Object.keys(this.$store.getters.annotationVisibilities).map((key) => {
          childrenValues.push(this.$store.getters.annotationVisibilities[key])
        })
        return 1 < _uniq(childrenValues).length
      }
      if (['Viewpoints', 'Elements'].includes(this.listName)) {
        const childrenValues = []
        // eslint-disable-next-line
        Object.keys(this.$store.getters.annotationVisibilities).map((key) => {
          if (key.includes(`${this.listName}/`)) {
            childrenValues.push(this.$store.getters.annotationVisibilities[key])
          }
        })
        return 1 < _uniq(childrenValues).length
      }
      return false
    }
  }
}
</script>
