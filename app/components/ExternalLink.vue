<template>
  <a :href="href" target="_blank" rel="noopener noreferrer" :class="$attrs.class">
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    required: true
  }
})
</script>