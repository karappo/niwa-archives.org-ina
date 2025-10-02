import { camelCase } from 'change-case'
import { useRoute } from 'vue-router'
import { useAnnotationsStore } from '~/stores/annotations'

export const checkListDisabled = (listName) => {
  const route = useRoute()
  const annotationsStore = useAnnotationsStore()

  const annotations = annotationsStore[camelCase(route.params.alias)]
  if (!annotations || !Array.isArray(annotations)) {
    return true
  } else if(listName === 'Annotations') {
    return !annotations.length
  } else if(listName) {
    return !annotations.filter(a => a.category.includes(listName)).length
  }
  return !annotations.length
}
