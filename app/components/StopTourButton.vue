<template>
  <div class="stopTourButton" @click="stopTour">
    Stop Tour
    <IconStop v-if="icon" />
  </div>
</template>

<script>
import IconStop from '~/assets/image/icon-stop.svg?inline'
import { useMainStore } from '~/stores/main'

export default {
  components: {
    IconStop
  },
  props: {
    icon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    stopTour() {
      const store = useMainStore()
      store.setTourName(null)
    }
  }
}
</script>
