<template lang="pug">
.stopTourButton(@click="$store.commit('tourName', null)")
  | Stop Tour
  IconStop(v-if="icon")
</template>

<script>
import IconStop from '~/assets/image/icon-stop.svg?inline'
export default {
  components: {
    IconStop
  },
  props: {
    icon: {
      type: Boolean,
      default: false
    }
  }
}
</script>
