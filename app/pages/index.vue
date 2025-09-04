<template>
  <div>
    <h1>Incomplete Niwa Archives</h1>
    <p>Loading...</p>
  </div>
</template>

<script setup>
// ミドルウェアでリダイレクトされるため、このページは表示されない
definePageMeta({
  middleware: 'redirection'
})
</script>
