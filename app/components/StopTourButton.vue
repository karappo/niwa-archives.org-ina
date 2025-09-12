<template>
  <div class="stopTourButton" @click="stopTour">
    Stop Tour
    <IconStop v-if="icon" />
  </div>
</template>

<script setup>
import IconStop from '~/assets/image/icon-stop.svg'
import { useMainStore } from '~/stores/main'

const props = defineProps({
  icon: {
    type: Boolean,
    default: false
  }
})

const store = useMainStore()

const stopTour = () => {
  store.setTourName(null)
}
</script>
