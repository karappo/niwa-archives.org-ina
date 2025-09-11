export default function ({ route, redirect }) {
  // TODO ここhtaccessに移動できるかも？
  if (route.path === '/') {
    redirect(301, '/fugetsu_ro-spring/')
  } else if (route.path === '/fugetsu_ro-july/') {
    redirect(301, '/fugetsu_ro-summer/')
  } else if (route.path === '/fugetsu_ro-february/') {
    redirect(301, '/fugetsu_ro-winter/')
  }
}
