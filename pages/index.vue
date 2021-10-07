<template lang="pug">
.root
  .mv
    h1.en
      img(
        src='~/assets/image/top/logo-en.png'
        srcset='~/assets/image/top/logo-en.png 1x, ~/assets/image/top/logo-en@2x.png 2x'
        alt='Incomplete Niwa Archives'
      )
    nav.globalNav
      nuxt-link(v-scroll-to="'#about'" to) About
      nuxt-link(v-scroll-to="'#archives'" to) Archives
      nuxt-link(v-scroll-to="'#exhibition'" to) Exhibition
      nuxt-link(v-scroll-to="'#reports'" to) Reports
    ScrollGuide(
      text="Scroll"
      gutterColor="#000000"
      highlightColor="#C9E2D4"
      textColor="#C9E2D4"
    )
    h1.ja
      LogoJa.logoJa
    .footage
      | Grant-in-Aid for Scientific Research (B)<br>
      | “Research and Development of Comprehensive Archives of Japanese Gardens”
  section#about
    h2 About
    .cols(data-col="2")
      .col
        p 庭園アーカイヴ・プロジェクトは、現代のテクノロジーを駆使して、日本庭園の多様な側面をデータ化した新しい総合的アーカイヴを研究開発するものです。このウェブサイトでは、山口市・常栄寺庭園、京都市・無鄰菴庭園、同・龍源院庭園を対象に開発したアーカイヴを公開しています。
      .col
        p The Garden Archives Project aims to study and develop a new kind of comprehensive archives that digitally survey Japanese gardens’ diverse aspects. This website features Jōei-ji Garden in Yamaguchi City, Murin-an Garden, and Ryōgen-in Garden in Kyoto City.
    .cols(data-col="2")
      .col
        a(href="#") Read more.
      .col
        a(href="#") Read more.
  section#archives
    h2 Archives
    .garden.joei_ji
      .cols(data-col="4")
        nuxt-link.col(to='/joei_ji/')
          h3 常栄寺庭園
        nuxt-link.col(to='/joei_ji/')
          | Jōei-ji Garden<br>
          | Yamaguchi
        .col
          | Update<br>
          | {{ format($store.getters.lastUpdateDateTime.joeiJi) }}
        .col
          | Annotations Quantity<br>
          | {{ $store.state.annotations.joeiJi.length }}
      nuxt-link.image(to='/joei_ji/')
        img(
          src='~/assets/image/top/joei_ji.jpg'
          alt='常栄寺の点群'
        )
    .garden.murin_an
      .cols(data-col="4")
        .col
          h3 無鄰菴庭園
        .col
          | Murin-an Garden<br>
          | Kyoto
        .col
          | Update<br>
          | {{ format(murinAnLastUpdateDateTime) }}
        .col
          | Annotations Quantity<br>
          | {{ murinAnDataQuantity }}
      a.image
        img(
          src='~/assets/image/top/murin_an.jpg'
          alt='無鄰菴の点群'
        )
        .overlay
          .select3D
            h6 Select 3D Data
            nav
              nuxt-link(to='/murin_an-summer/') Summer
              nuxt-link(to='/murin_an-winter/') Winter
              nuxt-link(to='/murin_an-snow/') Snow
    .garden.ryogen_in
      .cols(data-col="4")
        nuxt-link.col(to='/ryogen_in/')
          h3 龍源院庭園
        nuxt-link.col(to='/ryogen_in/')
          | Ryōgen-in Garden<br>
          | Kyoto
        .col
          | Update<br>
          | {{ format($store.getters.lastUpdateDateTime.ryogenIn) }}
        .col
          | Annotations Quantity<br>
          | {{ $store.state.annotations.ryogenIn.length }}
      nuxt-link.image(to='/ryogen_in/')
        img(
          src='~/assets/image/top/ryogen_in.jpg'
          alt='無鄰菴の点群'
        )
  section#exhibition
    h2 Exhibition
    img.ycam(
      src='~/assets/image/top/logo-ycam.png'
      alt='YCAMのロゴ'
    )
    h3
      | 原瑠璃彦+YCAM　共同研究成果展示<br>
      | Incomplete Niwa Arhives  ― 終わらない庭のアーカイブ
    .place
      | 2021年10月8日（金）〜 2022年1月30日（日）<br>
      | 山口情報芸術センター［YCAM］2階ギャラリー
    .info.cols(data-col="2")
      .col
        | 主催：山口市、公益財団法人山口市文化振興財団<br>
        | 後援：山口市教育委員会<br>
        | 助成：令和3年度日本博を契機とする文化資源コンテンツ創成事業<br>
        | 共同開発：YCAM InterLab<br>
        | 企画制作：山口情報芸術センター［YCAM］<br>
        | <br>
        | ＊本展示の一部は、科学研究費 基盤研究（B）「日本庭園の総合的アーカイヴの開発をめぐる研究」（2019-21年度、研究代表者：原瑠璃彦、課題番号：19H01225）による研究成果です。<br>
        | <br>
        | 庭園アーカイヴ・プロジェクト：原瑠璃彦（静岡大学）、伊藤隆之（YCAM）、高原文江（YCAM）、津田和俊（YCAM、京都工芸繊維大学）、城一裕（YCAM、九州大学）<br>
        | <br>
        | 企画制作：菅沼聖（YCAM）、会田大也（YCAM）、原瑠璃彦（静岡大学）
      .col
        | ウェブデザイン・開発／グラフィック・デザイン：KARAPPO Inc.<br>
        | 空間デザイン：ALTEMY<br>
        | プログラミング：白木良<br>
        | <br>
        | 3Dスキャン・点群編集：井上智博（京都工芸繊維大学 KYOTO Design Lab）<br>
        | 常栄寺庭園 3Dスキャン 協力：石井栄一、西本文博<br>
        | 無鄰菴庭園 3Dスキャン 協力：孫夢（京都工芸繊維大学 KYOTO Design Lab）<br>
        | 常栄寺庭園 サウンド・レコーディング 協力：中上淳二（YCAM InterLab）、石井栄一<br>
        | サウンド・システム開発：安齋励應（東京藝術大学）、岡﨑圭佑（慶應義塾大学）<br>
        | <br>
        | 映像データ整理：石井栄一<br>
        | 画像権利処理協力：木村英恵<br>
        | <br>
        | 謝辞：宗教法人 常栄寺、  山口市文化財保護課、京都市、無鄰菴管理事務所、<br>
        | 植彌加藤造園株式会社、宗教法人 龍源院
    .logos.cols(data-col="2")
      .col
        img.logo(
          src='~/assets/image/top/logo-bunkacho.png'
          alt='文化庁のロゴ'
        )
        img.logo(
          src='~/assets/image/top/logo-expo.png'
          alt='日本博のロゴ'
        )
  section#onlineEvents
    h2 関連オンラインイベント
    p
      | 展覧会のオンラインイベントを、<br>
      | 「INA」Youtube チャンネル上で行います。（参加無料）
    .cols(data-col="2")
      .col
        span.dateTime 2021年10月9日（土） 19:00〜20:30
        h4
          | 庭と山口情報芸術センター（YCAM）
          span.lead ――「INA」前史とその研究活動
        p.detail 登壇者：原瑠璃彦（静岡大学）、伊藤隆之（YCAM）、高原文江（YCAM）、城一裕（YCAM、九州大学）、津田和俊（YCAM、京都工芸繊維大学）、会田大也（YCAM）
      .col
        span.dateTime 2021年10月30日（土）　19:00〜20:30
        h4
          | 庭とウェブメディア・デザイン・アーカイヴ
          span.lead ――「INA」ウェブサイトの開発
        p.detail 登壇者：三尾康明（KARAPPO Inc.）、寺田直和（KARAPPO Inc.）、原瑠璃彦ほか
    .cols(data-col="2")
      .col
        span.dateTime 2021年11月13日（土）　19:00〜20:30
        h4
          | 庭と空間・身体性・アーカイヴ
          span.lead ――「INA」インスタレーション・ヴァージョンの制作プロセス
        p.detail 登壇者：津川恵理（ALTEMY）、戸村陽（ALTEMY）、白木良（プログラマー）、原瑠璃彦ほか
      .col
        span.dateTime 2021年12月11日（土）　17:00〜18:30
        h4.noLead 日本庭園のアーカイヴの歴史と未来
        p.detail 登壇者：粟野隆（東京農業大学）、エマニュエル・マレス（京都産業大学）、原瑠璃彦ほか
    p 2022年1月には、映画「動いている庭」ほかの上映、トークイベントを予定しています。
    ExternalLink.youtube(href="https://www.youtube.com/channel/UCtZit5KBQw8olVPRWnDdG0w")
      | YOUTUBE CHANNEL
      YoutubeArrow
  section#reports
    h2 Reports
    p
      | 庭園アーカイブプロジェクトは3年間のプロジェクトです。<br>
      | ここでは1年毎のレポートを公開しています。
    a(href="/2020/" target="_blank")
      img(
        src='~/assets/image/top/2020.jpg'
        srcset='~/assets/image/top/2020.jpg 1x, ~/assets/image/top/2020@2x.jpg 2x'
        alt='イメージ'
      )
      p 2020：「Incomplete Niwa Archives 終らない庭のアーカイヴ」へ
    a(href="/2019/Towards_a_New_Archive_of_Gardens.pdf" target="_blank")
      img(
        src='~/assets/image/top/2019.jpg'
        srcset='~/assets/image/top/2019.jpg 1x, ~/assets/image/top/2019@2x.jpg 2x'
        alt='イメージ'
      )
      p 2019： 庭の新しいアーカイヴをめざして [PDF]
  footer
    p
      | 科学研究費 基盤研究 (B)<br>
      | 「日本庭園の総合的アーカイヴの開発をめぐる研究」<br>
      | （課題番号：19H01225、研究代表者：原瑠璃彦）<br>
      | contact:
      MailLink(to="niwaarchive@rurihikohara.com")
</template>

<style lang="sass" scoped>
@import ../assets/style/general/clf
@import ../assets/style/const
.root
  position: relative
  @extend %font_light
  color: #C9E2D4
%wrap
  padding: 0 65px
.mv
  width: 100%
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  background-color: #0B101A
  background-image: url('~assets/image/top/bg@2x.jpg')
  background-position: center
  background-size: cover
  position: relative
  /deep/
    .scroll_guide_wrap
      position: absolute
      left: 0
      bottom: 4px
      width: 14px
      .scroll_guide
        padding: 36px
        > span
          font-size: 12px
          letter-spacing: 0.05em
          transform: rotate(90deg)
        > i
          margin-top: 19px
          width: 1px
          height: 65px
  h1.en
    position: absolute
    top: 40px
    left: 40px
  .logoJa
    width: 102vw
    height: auto
  .globalNav
    position: fixed
    top: 40px
    right: 40px
    font-size: 15px
    color: #CBD5C8
    z-index: 10
    a + a
      margin-left: 2em
  .footage
    position: absolute
    bottom: 40px
    right: 40px
    font-size: 13px
    line-height: calc(25 / 13)
    text-align: right
section
  background-color: #0B101A
  padding-top: 143px
  font-size: 14px
  line-height: 2
  letter-spacing: 0.06em
  h2
    margin-bottom: 84px
    font-size: 15px
    font-weight: normal
    letter-spacing: 0
  h3
    @extend %font_light
    font-size: 30px
  .cols + .cols
    margin-top: 2em

  &#about
    padding-top: 100px
    @extend %wrap

  &#archives
    h2
      @extend %wrap
      margin-bottom: 48px
    .garden
      .image
        display: block
        margin-top: 20px
        cursor: pointer
        position: relative
        opacity: 0.9
        transition: opacity 0.4s
        &:hover
          opacity: 1
        img
          width: 100%
          height: auto
          z-index: 1
        .overlay
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          display: flex
          justify-content: center
          align-items: center
          z-index: 2
          cursor: default
          &:hover
            .select3D
              opacity: 1
          .select3D
            opacity: 0
            transition: opacity 0.2s
            h6
              background-color: rgba(0,0,0,0.9)
              font-size: 14px
              font-family: 'K2-v1-Bold'
              color: #7C7C7C
              width: 100%
              height: 41px
              display: flex
              justify-content: center
              align-items: center
            nav
              margin-top: 2px
              display: flex
              flex-direction: row
              a + a
                margin-left: 2px
              a
                display: flex
                justify-content: center
                align-items: center
                background-color: rgba(0,0,0,0.9)
                font-size: 19px
                font-family:
                font-family: 'K2-v1-Bold'
                color: #A5A5A5
                transition: color 0.2s
                width: 245px
                height: 91px
                &:hover
                  color: white
      .cols
        @extend %wrap
        display: flex
        align-items: center
    .garden + .garden
      margin-top: 82px

  &#exhibition
    @extend %wrap
    background-color: #0D1F1F
    margin-top: 250px
    padding-bottom: 78px
    color: rgba(255,255,255,0.6)
    h2
      padding-top: 75px
      margin-bottom: 10px
    img.ycam
      float: right
    h3
      @extend %font_bold
      clear: both
      font-size: 19px
      line-height: calc(40 / 19)
      margin: 158px 0
      color: #E0E0E0
    .place
      margin-bottom: 60px
      color: #C3C3C3
      font-size: 14px
      line-height: calc(30 / 14)
    .info
      font-size: 13px
      line-height: calc(24 / 13)
    .logos
      margin-top: 37px
    .logo + .logo
      margin-left: 48px
  &#onlineEvents
    @extend %wrap
    background-color: #0D1F1F
    color: #E0E0E0
    padding-bottom: 111px
    h2
      @extend %font_bold
      color: #E0E0E0
      border-top: 1px solid black
      margin: 0
      padding: 50px 0 54px
    > p
      margin-bottom: 58px
    .col
      .dateTime
        @extend %font_bold
        color: #627CAD
      h4
        margin-top: 21px
        @extend %font_bold
        font-size: 19px
        color: #E6E6E6
        &.noLead
          margin: 37px 0 34px
        span.lead
          display: block
          margin-top: 8px
          @extend %font_bold
          font-size: 14px
          color: #C7C7C7
          letter-spacing: 0
      .detail
        margin-top: 16px
        @extend %font_medium
    .cols + .cols
      margin-top: 70px
    .cols + p
      @extend %font_bold
      margin-top: 70px
    .youtube
      margin-top: 74px
      display: block
      font-family: 'K2-v1-Bold'
      font-size: 21px
      color: white
      border-radius: 5px
      background-color: #464B4E
      padding: 30px 40px
      display: flex
      align-items: center
      justify-content: space-between
      transition: background-color 0.2s
      &:hover
        background-color: darken(#464B4E, 10%)
  &#reports
    @extend %wrap
    background-color: #000000
    padding-top: 100px
    padding-bottom: 100px
    h2
      margin: 0 0 75px
    > p
      margin-bottom: 70px
    a + a
      margin-top: 75px
    a
      display: block
      img
        width: 100%
        height: auto
      p
        @extend %font_bold
        font-size: 17px
        margin-top: 19px
footer
  @extend %wrap
  @extend %font_light
  background-color: #000000
  padding-top: 100px
  padding-bottom: 60px
  font-size: 15px
  line-height: 2
  letter-spacing: 0.03em
  a
    margin-left: 0.5em
</style>

<script>
import dayjs from 'dayjs'
import {
  ExternalLink,
  MailLink,
  ScrollGuide
} from '@karappo-inc/vue-components'
import LogoJa from '~/assets/image/top/logo-ja.svg?inline'
import YoutubeArrow from '~/assets/image/top/youtube-arrow.svg?inline'
export default {
  components: {
    ExternalLink,
    MailLink,
    ScrollGuide,
    LogoJa,
    YoutubeArrow
  },
  computed: {
    murinAnLastUpdateDateTime() {
      const array = [
        this.$store.getters.lastUpdateDateTime.murinAnSummer,
        this.$store.getters.lastUpdateDateTime.murinAnWinter,
        this.$store.getters.lastUpdateDateTime.murinAnSnow
      ]
      return array.sort((pre, cur) => {
        return new Date(cur) - new Date(pre)
      })[0]
    },
    murinAnDataQuantity() {
      const a = this.$store.state.annotations
      return (
        a.murinAnSummer.length + a.murinAnWinter.length + a.murinAnSnow.length
      )
    }
  },
  methods: {
    format(datetime) {
      return dayjs(datetime).format('YYYY.MM.DD HH:mm')
    }
  },
  head: {
    bodyAttrs: {
      class: 'top'
    }
  }
}
</script>
