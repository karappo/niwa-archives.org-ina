<template lang="pug">
article
  header
    h1 3D Data
    a.close(@click="$emit('close')" title="Close") X
  .content

</template>

<style lang="sass" scoped>
// @import ~/assets/style/const
@import ~/assets/style/drawer-common
.content
  font-size: 14px
  line-height: 2
  color: #898989
</style>
