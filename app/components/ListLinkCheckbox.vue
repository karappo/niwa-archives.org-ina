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

<script setup lang="ts">
import _uniq from 'lodash/uniq'
import { camelCase } from 'change-case'
import { useMainStore } from '~/stores/main'
import { useAnnotationsStore, type Annotation } from '~/stores/annotations'
import { checkListDisabledFromAnnotations } from '~/composables/useListDisabled'

const mainStore = useMainStore()
const annotationsStore = useAnnotationsStore()
const route = useRoute()
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

// コンポーネント内でストアにアクセスし、共通関数でdisabled判定（リアクティブ）
const disabled = computed(() => {
  if (!route || !route.params) return true
  const alias = route.params.alias
  if (typeof alias !== 'string') return true

  const annotations = annotationsStore[camelCase(alias)] as Annotation[] | null
  return checkListDisabledFromAnnotations(annotations, props.listName)
})

const visibility = computed({
  get() {
    return (mainStore.annotationVisibilities as any)[props.listName]
  },
  set(value) {
    mainStore.setAnnotationVisibilities(props.listName as any, value)
  }
})

const indeterminate = computed(() => {
  const visibilities = { ...mainStore.getAnnotationVisibilities } as any

  // グループ要素を除外
  delete visibilities.Annotations
  delete visibilities.Viewpoints
  delete visibilities.Elements

  if (props.listName === 'Annotations') {
    const childrenValues: boolean[] = Object.keys(visibilities).map(key => {
      return visibilities[key]
    })
    return 1 < _uniq(childrenValues).length
  }
  if (['Viewpoints', 'Elements'].includes(props.listName)) {
    const childrenValues: boolean[] = []
    Object.keys(visibilities).map(key => {
      if (key.includes(`${props.listName}/`)) {
        childrenValues.push(visibilities[key])
      }
    })
    return 1 < _uniq(childrenValues).length
  }
  return false
})

// disabledの変更を監視してmainStoreに通知
watch(disabled, (newValue) => {
  mainStore.setDisabledAnnotation(props.listName as any, newValue)
}, { immediate: true })
</script>
