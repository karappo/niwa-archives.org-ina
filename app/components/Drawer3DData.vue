<template>
  <div class="content">
    <header>
      <h1>3D Data</h1>
      <DrawerCloseButton />
    </header>
    <article v-if="threeDDataContent">
      <div v-html="threeDDataContent"></div>
    </article>
  </div>
</template>
<style scoped>
@import '@/assets/style/_drawer-common.css';
article {
  font-size: 14px;
  line-height: 2;
  color: #898989;
}
</style>

<script setup lang="ts">
import { useGardenData } from '~/composables/useGardenData'

const route = useRoute()
const { getGardenData } = useGardenData()

const threeDDataContent = ref<string | null>(null)

onMounted(async () => {
  // 庭園データを取得してthreeDDataContentを設定
  const alias = Array.isArray(route.params.alias) ? route.params.alias[0] : route.params.alias
  if (!alias) return
  const gardenData = await getGardenData(alias)
  if (gardenData && gardenData.threeDDataContent) {
    threeDDataContent.value = gardenData.threeDDataContent
  }
  nextTick(() => {
    if (typeof FONTPLUS !== 'undefined' && FONTPLUS) {
      FONTPLUS.start()
    }
  })
})
</script>
