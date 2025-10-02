import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  strict: true,
  // すべてのルートに末尾スラッシュを追加
  routes: (_routes) => {
    return _routes.map((route) => {
      // 既に末尾スラッシュがある場合はそのまま
      if (route.path.endsWith('/')) {
        return route
      }
      // 末尾スラッシュを追加
      return {
        ...route,
        path: route.path + '/'
      }
    })
  }
}
