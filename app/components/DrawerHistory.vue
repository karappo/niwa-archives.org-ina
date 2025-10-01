<template>
  <div class="content">
    <header>
      <h1>History</h1>
      <DrawerCloseButton></DrawerCloseButton>
    </header>
    <article v-if="historyContent">
      <img class="image" :src="historyContent.image" />
      <h1>{{ historyContent.title }}</h1>
      <div v-html="historyContent.body"></div>
    </article>
  </div>
</template>

<style scoped>
@import '~/assets/style/_drawer-common.css';
article {
  font-size: 14px;
  line-height: 2;
  color: #898989;
}
</style>

<script setup>
import ExternalLink from '~/components/ExternalLink.vue'
import { useGardenData } from '~/composables/useGardenData'

const route = useRoute()
const { getGardenData } = useGardenData()

const historyContent = ref(null)

onMounted(async () => {
  if (typeof FONTPLUS !== 'undefined') {
    FONTPLUS.start()
  }

  // 庭園データを取得してhistoryContentを設定
  const gardenData = await getGardenData(route.params.alias)
  if (gardenData && gardenData.historyContent) {
    historyContent.value = gardenData.historyContent
  }
})
</script>
