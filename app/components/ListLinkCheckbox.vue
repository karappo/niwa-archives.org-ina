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
    top: 0;
    transition: none;
  }
  .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
    background-color: #d3d3d3 !important;
  }
}
</style>

<script setup>
import _uniq from 'lodash/uniq'
import { camelCase } from 'change-case'
import { useMainStore } from '~/stores/main.js'
const mainStore = useMainStore()
import { useAnnotationsStore } from '~/stores/annotations.js'
const annotationsStore = useAnnotationsStore()
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

const route = useRoute()

const title = computed(() => {
  return $getTitle(props.listName)
})

const disabled = computed(() => {
  if (props.listName === 'Annotations') {
    return false
  }
  const annotations = annotationsStore[camelCase(route.params.alias)]
  if (!annotations || !Array.isArray(annotations)) {
    return true
  }
  return !annotations.filter(a => a.category.includes(props.listName)).length
})

const visibility = computed({
  get() {
    return mainStore.annotationVisibilities[props.listName]
  },
  set(value) {
    const key = props.listName
    mainStore.annotationVisibilities({ key, value })
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
    const childrenValues = Object.keys(mainStore.annotationVisibilities).map(key => {
      if (key.includes(`${props.listName}/`)) {
        return mainStore.annotationVisibilities[key]
      }
    })
    return 1 < _uniq(childrenValues).length
  }
  return false
})
</script>
