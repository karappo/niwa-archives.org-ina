export default defineNuxtRouteMiddleware((to) => {
  console.log('Redirection middleware called for path:', to.path)
  
  // TODO ここhtaccessに移動できるかも？
  if (to.path === '/ina/') {
    console.log('Redirecting to fugetsu_ro-spring')
    return navigateTo('/ina/fugetsu_ro-spring/', { redirectCode: 301 })
  } else if (to.path === '/ina/fugetsu_ro-july/') {
    console.log('Redirecting to fugetsu_ro-summer')
    return navigateTo('/ina/fugetsu_ro-summer/', { redirectCode: 301 })
  } else if (to.path === '/ina/fugetsu_ro-february/') {
    console.log('Redirecting to fugetsu_ro-winter')
    return navigateTo('/ina/fugetsu_ro-winter/', { redirectCode: 301 })
  }
})
