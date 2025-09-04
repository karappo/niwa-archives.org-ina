export default defineNuxtRouteMiddleware((to, from) => {
  // TODO ここhtaccessに移動できるかも？
  if (to.path === '/') {
    return navigateTo('/fugetsu_ro-spring/', { redirectCode: 301 })
  } else if (to.path === '/fugetsu_ro-july/') {
    return navigateTo('/fugetsu_ro-summer/', { redirectCode: 301 })
  } else if (to.path === '/fugetsu_ro-february/') {
    return navigateTo('/fugetsu_ro-winter/', { redirectCode: 301 })
  }
})
