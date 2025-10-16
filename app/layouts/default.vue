<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

const resize = () => {
  document.documentElement.style.setProperty(
    '--vh',
    `${window.innerHeight}px`
  )
}

onMounted(() => {
  window.addEventListener('resize', resize)
  resize()
  document.documentElement.style.setProperty(
    '--initial-vh',
    `${window.innerHeight}px`
  )
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
})
</script>
