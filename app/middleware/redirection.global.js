export default defineNuxtRouteMiddleware((to) => {
  // TODO ここhtaccessに移動できるかも？
  if (to.path === '/ina/') {
    return navigateTo('/ina/fugetsu_ro-spring/', { redirectCode: 301 })
  } else if (to.path === '/ina/fugetsu_ro-july/') {
    return navigateTo('/ina/fugetsu_ro-summer/', { redirectCode: 301 })
  } else if (to.path === '/ina/fugetsu_ro-february/') {
    return navigateTo('/ina/fugetsu_ro-winter/', { redirectCode: 301 })
  }
})
