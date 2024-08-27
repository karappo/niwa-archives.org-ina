// -------------------------------
// ※ ページが増えたときはここに追加
const pages = [
  'joeiJi',
  'murinAnSnow',
  'murinAnSummer',
  'murinAnWinter',
  'ryogenIn',
  'debug',
  'fugetsuRoSpring',
  'fugetsuRoSummer',
  'fugetsuRoAutumn',
  'fugetsuRoWinter'
]
// -------------------------------
const mapStates = () => {
  const result = {}
  for (const page of pages) {
    result[page] = null
  }
  return result
}
const mapMutations = () => {
  const result = {}
  for (const page of pages) {
    // eslint-disable-next-line
    result[page] = new Function(
      'state',
      'val',
      `state.${page} = val;`
    )
  }
  return result
}
const mapGetters = () => {
  const result = {}
  for (const page of pages) {
    // eslint-disable-next-line
    result[page] = new Function(
      'state',
      `return state.${page};`
    )
  }
  return result
}
// -------------------------------
export const state = () => ({
  ...mapStates()
})
export const mutations = {
  ...mapMutations()
}
export const getters = {
  ...mapGetters()
}
