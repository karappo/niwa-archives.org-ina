<template>
  <div
    :data-name="listName"
    :class="{ current: mainStore.pageName === listName, disabled }"
    class="btn"
    @click="handleSelectList(listName)"
  >
    <span v-if="icon === 'dot'" class="dot icon"></span>
    <IconTour v-else-if="icon === 'tour'" class="tour"></IconTour>
    <IconHyphen v-else-if="icon === 'hyphen'" class="tour"></IconHyphen>
    {{ title }}
  </div>
</template>

<style scoped>
.btn {
  cursor: pointer;
  font-family: 'K2-v1-Heavy';
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  margin-left: 20px;

  --bg-color: #4d4d4d;
  &[data-name='Viewpoints/Still Images'] {
    --bg-color: var(--color--still-images);
  }
  &[data-name='Viewpoints/Movies'] {
    --bg-color: var(--color--movies);
  }
  &[data-name='Elements/Stones'] {
    --bg-color: var(--color--stones);
  }
  &[data-name='Elements/Plants'] {
    --bg-color: var(--color--plants);
  }
  &[data-name='Elements/Creatures'] {
    --bg-color: var(--color--creatures);
  }
  &[data-name='Elements/Artifacts'] {
    --bg-color: var(--color--artifacts);
  }
  &[data-name='Elements/DNA Data'] {
    --bg-color: var(--color--dna-data);
  }
  &[data-name='Oral Archives'] {
    --bg-color: var(--color--oral-archives);
  }
  &[data-name='Guided Tour'] {
    --bg-color: var(--color--guided-tour);
  }
  &[data-name='Ramble Tour'] {
    --bg-color: var(--color--ramble-tour);
  }

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
  &.current {
    color: white;
    pointer-events: none;
  }
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: var(--bg-color);
    margin-left: 1px;
    margin-right: 9px;
    border-radius: 50%;
  }
  .tour {
    margin-right: 8px;
    &:deep(path) {
      fill: var(--bg-color);
    }
  }
  .hyphen {
    margin-right: 10px;
  }
}
</style>

<script setup>
import IconHyphen from '~/assets/image/icon-hyphen.svg'
import IconTour from '~/assets/image/icon-tour.svg'
import { useMainStore } from '~/stores/main.js'
import { useEventBus } from '~/composables/useEventBus'
import { checkListDisabled } from '~/utils/checkListDisabled'
import { useGardenData } from '~/composables/useGardenData'

const mainStore = useMainStore()
const route = useRoute()
const { $getTitle } = useNuxtApp()
const { hasHistory } = useGardenData()

const props = defineProps({
  listName: {
    type: String,
    required: true,
    default: ''
  },
  dot: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String,
    default: null
  }
})

// EventBus
const eventBus = useEventBus()

// Functions
const handleSelectList = (listName) => {
  eventBus.emit('selectList', listName)
}

const title = computed(() => {
  return $getTitle(props.listName)
})

const disabled = ref(false)

// 非同期でdisabledを更新
watchEffect(async () => {
  if (props.listName === 'History') {
    disabled.value = !(await hasHistory(route.params.alias))
  } else if (props.listName === 'Plans') {
    disabled.value = checkListDisabled(props.listName)
  } else {
    disabled.value = false
  }
})
</script>
