<template lang="pug">
article
  header
    h1 History
    a.close(@click="$emit('close')" title="Close") X
  .content
    template(v-if="$route.params.alias === 'joei_ji'")
    template(v-else-if="$route.params.alias === 'murin_an-summer'")
    template(v-else-if="$route.params.alias === 'murin_an-winter'")
    template(v-else-if="$route.params.alias === 'murin_an-snow'")
    template(v-else-if="$route.params.alias === 'ryogen_in'")
</template>

<style lang="sass" scoped>
// @import ~/assets/style/const
@import ~/assets/style/drawer-common
.content
  font-size: 14px
  line-height: 2
  color: #898989
</style>
