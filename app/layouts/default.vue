<template>
  <NuxtPage />
</template>

<script>
export default {
  mounted() {
    window.addEventListener('resize', this.resize)
    this.resize()
    document.documentElement.style.setProperty(
      '--initial-vh',
      `${window.innerHeight}px`
    )
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight}px`
      )
    }
  }
}
</script>
