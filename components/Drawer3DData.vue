<template lang="pug">
article
  header
    h1 3D Data
    a.close(@click="$emit('close')" title="Close") X
  .content
    template(v-if="$route.params.alias === 'joei_ji'")
      | 撮影日：2021年4月24日、25日、26日<br>
      | <br>
      | 撮影者：<br>
      | 井上智博（京都工芸繊維大学 KYOTO Design Lab）<br>
      | 高原文江（山口情報芸術センター［YCAM］）<br>
      | 津田和俊（山口情報芸術センター［YCAM］、京都工芸繊維大学 ）<br>
      | <br>
      | 編集者：<br>
      | 井上智博（京都工芸繊維大学 KYOTO Design Lab）<br>
      | 撮影機材：FARO FocusS 350 / FocusX 130<br>
      | <br>
      | 精度：4x<br>
      | 解像度：1/4<br>
      | 測点数：74<br>
      | <br>
      | 編集ソフトウェア：<br>
      | FARO Scene<br>
      | CloudCompare<br>
      | <br>
      | 点群数：<br>
      | 188,768,417<br>
    template(v-else-if="$route.params.alias === 'murin_an-summer'")
      | 撮影日：2020年6月20日、21日、23日、24日<br>
      | <br>
      | 撮影者：<br>
      | 井上智博（京都工芸繊維大学 KYOTO Design Lab）<br>
      | 孫夢（京都工芸繊維大学 KYOTO Design Lab）<br>
      | 津田和俊（山口情報芸術センター［YCAM］、京都工芸繊維大学 ）<br>
      | <br>
      | 編集者：<br>
      | 井上智博（京都工芸繊維大学 KYOTO Design Lab）<br>
      | 撮影機材：FARO FocusS 350 / FocusX 130<br>
      | <br>
      | 精度：3x<br>
      | 解像度：1/4<br>
      | 測点数：91<br>
      | <br>
      | 編集ソフトウェア：<br>
      | FARO Scene<br>
      | CloudCompare<br>
      | <br>
      | 点群数：<br>
      | 74,236,424<br>
    template(v-else-if="$route.params.alias === 'murin_an-winter'")
      | 撮影日：2020年12月16日、18日、24日<br>
      | <br>
      | 撮影者：<br>
      | 井上智博（京都工芸繊維大学 KYOTO Design Lab）<br>
      | 孫夢（京都工芸繊維大学 KYOTO Design Lab）<br>
      | 津田和俊（山口情報芸術センター［YCAM］、京都工芸繊維大学 ）<br>
      | <br>
      | 編集者：<br>
      | 井上智博（京都工芸繊維大学 KYOTO Design Lab）<br>
      | 撮影機材：FARO FocusS 350 / FocusX 130<br>
      | <br>
      | 精度：3x<br>
      | 解像度：1/4<br>
      | 測点数：102<br>
      | <br>
      | 編集ソフトウェア：<br>
      | FARO Scene<br>
      | CloudCompare<br>
      | <br>
      | 点群数：<br>
      | 76,621,130<br>
    template(v-else-if="$route.params.alias === 'murin_an-snow'")
      | 撮影日：2020年12月17日<br>
      | <br>
      | 撮影者：<br>
      | 井上智博（京都工芸繊維大学 KYOTO Design Lab）<br>
      | 孫夢（京都工芸繊維大学 KYOTO Design Lab）<br>
      | 津田和俊（山口情報芸術センター［YCAM］、京都工芸繊維大学 ）<br>
      | <br>
      | 編集者：<br>
      | 井上智博（京都工芸繊維大学 KYOTO Design Lab）<br>
      | 撮影機材：FARO FocusS 350 / FocusX 130<br>
      | 精度：3x<br>
      | 解像度：1/4<br>
      | 測点数：48<br>
      | <br>
      | 編集ソフトウェア：<br>
      | FARO Scene<br>
      | CloudCompare<br>
      | <br>
      | 点群数：<br>
      | 43,348,577<br>
    template(v-else-if="$route.params.alias === 'ryogen_in'")
      | 撮影日：2021年7月11日<br>
      | <br>
      | 撮影者：<br>
      | 井上智博（京都工芸繊維大学 KYOTO Design Lab）<br>
      | 津田和俊（山口情報芸術センター［YCAM］、京都工芸繊維大学 ）<br>
      | <br>
      | 編集者：<br>
      | 津田和俊（山口情報芸術センター［YCAM］、京都工芸繊維大学 ）<br>
      | <br>
      | 撮影機材：FARO FocusS 350 / FocusX 130<br>
      | 精度：3x<br>
      | 解像度：1/4<br>
      | 測点数：42<br>
      | <br>
      | 編集ソフトウェア：<br>
      | FARO Scene<br>
      | CloudCompare<br>
      | <br>
      | 点群数：<br>
      | 59,793,125<br>
</template>

<style lang="sass" scoped>
// @import ~/assets/style/const
@import ~/assets/style/drawer-common
.content
  font-size: 14px
  line-height: 2
  color: #898989
</style>
