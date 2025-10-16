import { camelCase } from 'change-case'
import { useRoute } from 'vue-router'
import { useAnnotationsStore, type Annotation } from '~/stores/annotations'

export const checkListDisabled = (listName?: string): boolean => {
  const route = useRoute()
  const annotationsStore = useAnnotationsStore()

  const alias = route.params.alias
  if (typeof alias !== 'string') {
    return true
  }

  const annotations = annotationsStore[camelCase(alias)] as Annotation[] | null
  if (!annotations || !Array.isArray(annotations)) {
    return true
  } else if (listName === 'Annotations') {
    return !annotations.length
  } else if (listName) {
    return !annotations.filter(a => a.category.includes(listName)).length
  }
  return !annotations.length
}
