<template>
  <div class="close button" title="Close" @click="emit('closeDrawer')">
    <IconClose />
  </div>
</template>

<style scoped>
.close {
  height: 34px;
  width: 34px;
  font-size: 12px;
  transition: color 0.2s;
}
</style>

<script setup>
import IconClose from '~/assets/image/icon-close.svg'

const emit = defineEmits(['closeDrawer'])
</script>
