<template>
  <div :class="['linkCheck', { disabled }]">
    <ListLink :list-name="listName" :icon="icon">{{ title }}</ListLink>
    <el-checkbox
      v-if="!disabled"
      v-model="visibility"
      :indeterminate="indeterminate"
    ></el-checkbox>
  </div>
</template>

<style scoped>
.linkCheck {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>

<style>
/* 下記のコードは本当はdeepでscopedの方に入れたい */
.linkCheck {
  .el-checkbox {
    margin-right: 12px;
    height: auto;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #434343 !important;
    border-color: #434343 !important;
  }
  .el-checkbox__inner {
    border-color: transparent !important;
    background-color: #434343 !important;
  }
  .el-checkbox__inner::after {
    border: 2px solid #d3d3d3 !important;
    border-left: 0 !important;
    border-top: 0 !important;
    transition: none;
  }
  .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
    background-color: #d3d3d3 !important;
  }
}
</style>

<script setup>
import _uniq from 'lodash/uniq'
import { useMainStore } from '~/stores/main.js'
import { checkListDisabled } from '~/utils/checkListDisabled'

const mainStore = useMainStore()
const { $getTitle } = useNuxtApp()

const props = defineProps({
  listName: {
    type: String,
    required: true,
    default: ''
  },
  icon: {
    type: String,
    default: null
  }
})

const title = computed(() => {
  return $getTitle(props.listName)
})

const disabled = computed(() => {
  if (props.listName === 'Annotations') {
    return false
  }
  return checkListDisabled(props.listName)
})

const visibility = computed({
  get() {
    return mainStore.annotationVisibilities[props.listName]
  },
  set(value) {
    mainStore.setAnnotationVisibilities(props.listName, value)
  }
})

const indeterminate = computed(() => {
  if (props.listName === 'Annotations') {
    const childrenValues = Object.keys(mainStore.annotationVisibilities).map(key => {
      return mainStore.annotationVisibilities[key]
    })
    return 1 < _uniq(childrenValues).length
  }
  if (['Viewpoints', 'Elements'].includes(props.listName)) {
    const childrenValues = []
    Object.keys(mainStore.annotationVisibilities).map(key => {
      if (key.includes(`${props.listName}/`)) {
        childrenValues.push(mainStore.annotationVisibilities[key])
      }
    })
    return 1 < _uniq(childrenValues).length
  }
  return false
})
</script>
