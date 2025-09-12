<template>
  <div>Redirecting...</div>
</template>

<script setup>
// このページは存在しない。
// リダイレクト処理を実行
onMounted(() => {
  navigateTo('/fugetsu_ro-spring/')
})
</script>
