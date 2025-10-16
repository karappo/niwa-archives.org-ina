<template>
  <div>Redirecting...</div>
</template>

<script setup lang="ts">
// このページは存在しない。
// リダイレクト処理を実行
onMounted(() => {
  navigateTo('/fugetsu_ro-spring/')
})
</script>
