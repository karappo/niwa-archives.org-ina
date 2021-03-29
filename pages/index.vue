<template lang="pug">
main(:data-lang="this.$i18n.locale")
  section.mv(data-fuwa)
    img.mv-text(src='~/assets/image/mv-text.svg')
    Carousel
    .scrollGuide
      span Scroll
      i

  template(v-if="$i18n.locale == 'ja'")

    article#about(data-fuwa)

      h2 About

      h3 終らない庭のアーカイヴ

      p 2019年4月より始動した庭園アーカイヴ・プロジェクトは、現代のテクノロジーを駆使して、日本庭園の多様な側面をデータ化した新しい総合的アーカイヴを研究開発するものです。
      p 庭とは、時とともに変化してゆきます。建築やいわゆる芸術作品と異なり、庭は、つくられた時点が完成ではありません。庭はそこから歳月をかけることで「時熟」してゆきます。
      p
        | 古来、人はこうした動態としての庭とともに生きてきました。そこは、様々な活動の場であり、人々の記憶が蓄積しています。<br>
        | こうした庭を記録するにあたって、これまで、テキスト、図面、絵画、写真、映像など様々な手法が用いられてきました。
      p
        | 今日、高解像度撮影や実空間の3Dスキャン・3D録音、生物のDNA解析などの技術が発達し、その設備も以前より格段に安価にととのえることが可能になっています。<br>
        | これらのテクノロジーを用いることで、現代に見合った、新しい日本庭園のアーカイヴの構築できるのではないでしょうか。
      p
        | 庭のアーカイヴ化は、矛盾を孕んだ課題でもあります。<br>
        | どのようにしても、庭のアーカイヴは不十分なものとなります。限られた時間、限られた空間、限られたサンプルしか、データを採取することはできません。庭に完成はなく、「終り」はありませんが、そのアーカイヴもまた完成はなく、終わりはないものとなるでしょう。
      p こうした無謀ともいえる試みをあえて行うことによって、庭というものを問い直すこともまたこのプロジェクトの目的です。
      p 2021年秋には、調査対象としている庭園についてのアーカイヴをウェブ上で公開し、それに伴う展示を予定しています。

    article#report

      h2(data-fuwa) Report

      h4(data-fuwa)
        | 「Incomplete Niwa Archives 終らない庭のアーカイヴ」へ <br>
        | ――庭園アーカイヴ・プロジェクト 2020年度 活動レポート

      section(data-fuwa)

        p
          | 2019年に始動した庭園アーカイヴ・プロジェクトの基本的な背景と目的については、
          a(href="#" v-scroll-to="'#about'") ステートメント
          | 、ならびに
          a(href="/doc/Towards_a_New_Archive_of_Gardens.pdf" target="_blank") 「庭の新しいアーカイヴをめざして」
          | を参照されたい。2019年度は、本プロジェクトの主な拠点、山口情報芸術センター（YCAM）にほど近い常栄寺庭園を対象に、様々な実験と試行錯誤を重ねた。これらを踏まえ、2020年度は、対象となる庭園を新たに増やすとともに、具体的な庭園アーカイヴのUIを構築してゆく予定であった。が、言うまでもなく、2020年度は、本プロジェクトもCOVID-19の大きな影響を被ることとなった。研究メンバーの拠点はそれぞれ東京、山口、京都であるが、各地域間の移動もままならず、本プロジェクトに関してもリモートベースでの研究活動を余儀なくされた。
        p しかしながら、そうした制約のなかでも、本プロジェクトの活動はおおむね順調に進行することができた。また、制約ゆえに見出すことのできた可能性も多かったといえる。非常事態宣言が出され、庭園にすら気軽に赴けない状況のなか、本プロジェクトのように庭園のアーカイヴをウェブ上で公開することに新たな意義が賦与されたとも考えられる。
        p 本年度の活動の要点は、大方、以下のように整理される。
        ul
          li YCAM庭園アーカイヴ・プロジェクト研究会の実施
          li 京都・無鄰菴庭園の調査の開始
          li 常栄寺雪舟庭のさらなる調査とアーカイヴUIの開発
          li 目指すアーカイヴの明確化――「Incomplete Niwa Archives 終わらない庭のアーカイヴ」へ
        p 前年度は主に研究メンバー5人のみで研究活動を行なっていたが、2020年度は、幸いなことに多くの人々の協力を得ることができた。以下にその概略を順に記す。

      section(data-fuwa)

        h4 YCAM庭園アーカイヴ・プロジェクト研究会の実施

        p
          | 本年度、オンラインベースの活動に移行したことによって、返って充実した開催ができたのが庭園アーカイヴ・プロジェクトYCAM研究会である。当初は、YCAMに外部講師を招聘する研究会を2020年度中に３回行い、その1回目を4月に開催する予定だったが、中止にはせずオンライン開催に移行した。そして、その内容の充実さもあって、以後は月に1回ペースでの開催の方針に移行し、年度内に計8回の研究会を開催することができた<Footnote num="1" />。<br>
          | そこで招聘した外部講師は、山内朋樹氏（庭師・美学者、京都教育大学准教授）、近藤亮介氏（美学芸術学・ランドスケープ史、東京大学助教）、エマニュエル・マレス氏（日本庭園史・日本建築史、京都産業大学准教授）、井上智博氏（京都工芸繊維大学 KYOTO Design Labテクニカルスタッフ）、島村幸忠氏（三癸亭賣茶流4代目若宗匠、煎茶道研究、京都大学博士課程）、津川恵理氏（建築家、ALTEMY代表、東京藝術大学教育研究助手）、会田大也氏（YCAMアーティスティック・ディレクター）である。<br>
          | 研究会自体は非公開ではあるが、プロジェクトメンバー以外のYCAM職員も参加可能としたこともあって、毎回充実したプレゼンテーションと濃密なディスカッションを行うことができた。そこでは、そもそも庭園や公園がどういう場であり、それはどのように生成され、どのように用いられ、どのように記録・アーカイヴ化されうるのか、という諸問題について、きわめて広範囲な視野のもとに検討することができた。これらの研究会の成果については、何らかのかたちでの公開を予定している。<br>
          | また、当研究会とは別に、シン・八田利也氏企画・主催によるオンライン・レクチャー・シリーズ「フィールドワーク〈で〉デザインすること」の第6回「庭とアーカイヴからみたフィールドワークとデザイン」で、原と高原のプレゼンテーションに基づき、貴重な議論を交わすことができたのは得難い機会であった。このオンライン・イベントによって、本プロジェクトの目指すべきアーカイヴのあり方がより明確にできたところが大きい。

      section.footnotes(data-fuwa)
        ol.footnotes-list
          li#fn1.footnote-item
            p
              | 第１回（2020年4月18日）：原瑠璃彦「石を立てん事から石を伏せん事へ――日本庭園のパラダイムシフト」、近藤亮介「歩行の風景　前編」、山内朋樹「作庭現場における構造の発生１」<br>
              | 第２回（2020年5月30日）：近藤亮介「歩行の風景　後編」、山内朋樹「作庭現場における構造の発生２」<br>
              | 第3回（2020年7月4日）：エマニュエル・マレス「森蘊の日本庭園史研究」<br>
              | 第4回（2020年8月1日）：山内朋樹「作庭現場における構造の発生３」<br>
              | 第5回（2020年8月31日）：井上智博「Digital Heritage Workfolw: 庭園、建築、文化財の3Dスキャニング調査」<br>
              | 第6回（2020年10月10日）：島村幸忠「近代の煎茶空間に対する近世後期文人文化の影響」<br>
              | 第7回（2021年1月16日）：津川恵理「個の表現から生まれる演劇的パブリックスペース」<br>
              | 第8回（2021年2月20日）：会田大也「コロガル公園シリーズについて」
              FootnoteBackref(num="1")

      section(data-fuwa)
        h4 京都・無鄰菴庭園の調査の開始

        p 当初より、2020年度からは、京都・無鄰菴庭園の調査を開始する予定であった。無鄰菴庭園は、明治27-29（1894-96）年に、山縣有朋の京都別邸としてつくられたもので、その庭園は、七代目・小川治兵衛（植治）（1860-1933）によるものである。植治は、近代日本庭園の改革者として知られるが、彼がそうした近代の新しい日本庭園の作庭を最初に実現したのが無鄰菴庭園であった。その変化はしばしば「象徴主義から自然主義」と論じられるが、具体的には、それまでの日本庭園のように海に見立てる池ではなく、疎水から引いた水流をつくり、石を立てるのではなく伏せ、東山の借景を用いる、といった点に集約される<Footnote num="2" />。近年は、様々な文化活動が盛んに実施されており、全国でもっとも活発な日本庭園の一つといえよう<Footnote num="3" />。
        p 日本庭園は、それぞれの土地の特性を生かしてつくられるため、当然ながら、二つとして同じ庭園はない。常栄寺庭園と無鄰菴庭園の2つだけでも様々な対比が可能である<Footnote num="4" />。常栄寺庭園は寺院に付随する庭であるが、無鄰菴庭園はもともと権力者の私邸の庭である。先に述べたように、常栄寺庭園は池を中心とするが、無鄰菴庭園の場合は浅い水流があるのみである。常栄寺が高低差のある構造をしているのに対して、無鄰菴はほとんど平坦な地につくられている。また、常栄寺は山の麓にあり、極めて静謐な環境にあるが、無鄰菴は平地に位置し、すぐ道路に面しており、常に自動車の往来の音が聴こえる。同じく音に関していえば、無鄰菴庭園には、先述の通り、水流があることから、絶えず水流の音が聴こえている。
        p 本年度は6月、12月に、それぞれ庭園全体の3Dスキャンを行い<Footnote num="5" />、10月には、水質の調査と、無鄰菴担当庭師の出口健太氏（植彌加藤造園株式会社）、無鄰菴スタッフの平野友昭氏（植彌加藤造園株式会社）にそれぞれ無鄰菴の庭園管理、無鄰菴に集う野鳥についてのインタビューを実施した。また、10月には、庭園の定点長時間撮影・アンビソニックスによる立体音響録音の実験を行なった。
        p 無鄰菴庭園は季節ごとに変化が豊かである。6月には瑞々しい緑に恵まれた状況で3Dスキャンを実施することができたが、一方で無鄰菴は、冬は枯芝の庭となり趣きが大きく異なるため、その3Dスキャンを行うべく、12月に実施した。ところが、その調査2日目より雪に恵まれたことにより、期せずして3バージョンの3Dスキャンを実施することができた。
        p 無鄰菴庭園に関するこれらの素材については、来年度中に公開予定である。

        figure(data-fuwa)
          Img2X#murin-an-fig1(src="murin-an-1.jpg" alt="無鄰菴庭園 2020年6月20日")
          Img2X#murin-an-fig2(src="murin-an-2.jpg" alt="無鄰菴庭園 2020年12月16日")
          Img2X#murin-an-fig3(src="murin-an-3.jpg" alt="無鄰菴庭園 2020年12月17日")
          figcaption 無鄰菴庭園 2020年6月20日（上）、12月16日（左）、12月17日（右）

      section.footnotes(data-fuwa)
        ol.footnotes-list(start="2")
          li#fn2.footnote-item
            p
              | 尼崎博正「近代庭園の濫觴」『七代目小川治兵衛――山紫水明の都にかへさねば』（ミネルヴァ書房、2012年）、38-55頁、鈴木博之「はじまりとしての山縣有朋」『庭師 小川治兵衛とその時代』（東京大学出版会、2013年）、55-98頁。植治のこうした作庭を促したのは、山県有朋の主導によるところが大きいという。
              FootnoteBackref(num="2")
          li#fn3.footnote-item
            p
              | 詳しくは、<ExternalLink href="https://murin-an.jp">無鄰菴ウェブサイト</ExternalLink> を参照されたい。
              FootnoteBackref(num="3")
          li#fn4.footnote-item
            p
              | 無鄰菴庭園を常栄寺庭園の「うつし」とする説もある〔野村勘治『旅に出たら寄ってみたい庭 30』（小学館、1997年）、88頁〕。
              FootnoteBackref(num="4")
          li#fn5.footnote-item
            p
              | 3Dスキャンにあたっては、京都工芸繊維大学KYOTO Design Labの井上智博氏に多大な協力を得た。
              FootnoteBackref(num="5")

      section(data-fuwa)
        h4 庭園アーカイヴ UIの開発

        p 常栄寺庭園に関しても、昨年度に引き続き調査を行なった。より精度の高い3Dデータを取得するためのスキャニングのほか、庭園において、定点長時間撮影・立体音響録音を複数回行った。また、高原文江は、3Dスキャニングの傍、庭園の各地で見られる生物の撮影も行った。そのほか、庭園の読み解き・解釈の例として、庭園を管理している伊藤尚吾氏（有限会社 伊藤造園 代表取締役）、鉱物学者の加納隆氏（山口大学名誉教授）、動物学者の田中浩氏（山口県立山口博物館学芸員）のインタビューを庭園で直に行った。
        p それぞれの専門によって、庭園への切り口が異なることはいうまでもないが、庭を歩きながらインタビューすることによって、その場所で直に思考が発生する様子を記録することもまた興味深い試みであった。前年度より取得してきたこうした庭園の多様なデータを一つのUIにまとめるべく、本年度より、幅広くデザイン活動を行うKARAPPO Inc.とともに、徐々にUIデザインを検討していった<Footnote num="6" />。
        p 現段階で収集されているデータは以下のようなものである。
        ul
          li 文献などによる文字情報
          li 庭園の図面や絵画などの図像資料
          li 庭園の3Dデータ
          li 庭園の静止画データ（古写真、現状の風景写真）
          li 庭園の映像　定点長回し動画
          li 庭園の立体音響録音データ
          li 庭石や植物、生物などのディテール写真・映像
          li 庭園内の植物・水のDNA解析データ
          li 庭園でのインタビュー動画
        p 現時点では、こうした多様なデータを、主にOUTLINE・VIEW・ELEMENTという3つの階層に分けて整理する方向で作業を進めている。OUTLINEとは、その庭園に関する基本的な情報、またその大枠となる図面や3Dデータ等、庭園の俯瞰を可能にするデータである。VIEWとは、主に人が庭園を体験する視点に基づく画像や映像である。そして、ELEMENTは、庭園の各要素のディテール、さらには人が肉眼では認識できないミクロのレベルの情報である。
        p 現在開発中のUIでは、庭園の3Dデータに、VIEW、ELEMENTのデータをプロットし、ユーザーがこれを任意に参照できるシステムを構築している。それぞれのデータにはタグが付せられており、一つ一つが関係を有する。
        p また、庭園の立体音響録音データに関しては、伊藤隆之を中心として人の聴取に向けた編集を行なっているほか、城一裕主導のもと、慶應義塾大学環境情報学部政策・メディア研究科 徳井直生研究室（安齋励應（M2）、岡崎隆祐（B3））の協力を得て、深層学習を用いた音の判定システムを実験・開発中である。具体的には、日本庭園で聴こえる様々な音を分類し、その分類に基づいて計算機に学習させたモデルを用いることで、季節や時間帯で移り変わるそれぞれの庭園の立体音響録音データから、そこで聴こえる鳥や虫の声の種別を判定するというものである。
        figure(data-fuwa)
          Img2X(src="ui.png" alt="アーカイヴ・ウェブのサンプル")
          figcaption アーカイヴ・ウェブのサンプル
      section.footnotes(data-fuwa)
        ol.footnotes-list(start="6")
          li#fn6.footnote-item
            p
              | KARAPPO Inc.は、本プロジェクトによって重要な先行例《森のDNA図鑑》のウェブ・デザインも手がけている。
              FootnoteBackref(num="6")

      section(data-fuwa)
        h4 庭園をデータ化するということ

        p こうした試行錯誤のなか、徐々に、本プロジェクトが目指すべきアーカイヴのかたちが明確になってきた。とくに、実際に、庭園の録音データや撮影データを多数収集することで見えてくることは多かった。
        p なかでも6月11日に録音したおよそ1時間30分におよぶ常栄寺庭園の早朝の<a @click="openSound()">立体音響録音データ</a>は、メンバー一同が驚くものであった。そこには早朝の庭の饗宴というべきか、無数の野鳥と昆虫、そしてモリアオガエルが庭のそこかしこで鳴き続けていた。まるであらかじめパート分けされているかのように、ヒヨドリたちが全面に聴こえることもあれば、モリアオガエルが一斉に鳴きだすこともあり、また、両者が鳴き交わすこともある。途中からはやがて雨が降り出すが、その音も決して均一ではなく、葉に落ちるとき、水面に落ちるとき、地面に落ちるときで異なり、その強弱から降り方の変化が分かる。
        p 「まるで映画のよう」というのが、メンバー一同の率直な感想だった。庭の音は刻一刻と変化してゆき、二つとして同じ音が再生されることはない。それは当たり前のことではあるのだが、しかし、庭にいて同じ時間を過ごすよりも、そこから音だけを切り出す、つまりそこで起きていることの情報を削減することで、より露わになる。
        figure(data-fuwa)
          Img2X(src="sessyu-tei-photo.jpg" alt="2020年9月21日、早朝の常栄寺庭園")
          figcaption 2020年9月21日、早朝の常栄寺庭園
        p また、高原が撮影した、庭のあちこちにいる生物の様子の動画は数百個に及ぶ。一つの庭のなかで起きていることは、あまりに膨大である。「いま」「そこ」で生成していることすら、あまりに多様で、人間が、あるいはコンピューターであっても、すべてを把握することは不可能である。ましてや、その「いま」が無限に庭では蓄積されていくのである。そうした膨大な情報を撮影や録音等によって「切り出す」ことによって、人は、そこで起きている出来事を比較的容易に把握できるようになる。
        p ここで、これまで度々参照されてきた、ヴァルター・ベンヤミンの「写真小史」（1931）の一節を思い出しておきたい。
        blockquote
          | カメラに語りかける自然は、肉眼に語りかける自然とは当然異なる。（中略）人間によって意識を織りこまれた空間の代わりに、無意識が織りこまれた空間が立ち現われるのである。（中略）こうした視覚における無意識的なものは、写真によってはじめて知られる。それは衝動における無意識的なものが、精神分析によってはじめて知られるのと同様である。<Footnote num="7" />
        p 本プロジェクトが目指しているのは、言ってみれば、庭の「無意識的なもの」を可視化させることであるのかもしれない。ただし、ここで用いられるテクノロジーは写真だけではなく、動画撮影、録音、3Dスキャン等も含まれる<Footnote num="8" />。こうした種々のテクノロジーによって露呈される「庭の無意識的なもの」を一度切り出して収集し、それを再び結合し総合することが、本アーカイヴの目的であるようだ。
        figure(data-fuwa)
          Img2X(src="kanabun.jpg" alt="常栄寺庭園のカナブン")
          figcaption 常栄寺庭園のカナブン

      section.footnotes(data-fuwa)
        ol.footnotes-list(start="7")
          li#fn7.footnote-item
            p
              | 久保哲司訳「写真小史」『ベンヤミン・コレクションI――近代の意味』（筑摩書房、1995年）、558-59頁。
              FootnoteBackref(num="7")
          li#fn8.footnote-item
            p
              | 阿部一直は、「視覚的無意識」を発展させ、「メディア的無意識」という語を用いている。〔Abe Kazunao, “Parks as a Visionary Device: Extensive Readings and Reminiscence in Contemporary Art History,” Promise Park (Seoul: Workroom Press, 2017), p. 188-89.〕
              FootnoteBackref(num="8")

      section(data-fuwa)
        h4 ぼんやりと体験できるアーカイヴ

        p
          | では、そのようにして結合・総合されるアーカイヴとは、どのようなものが理想的なのか。<br>
          | 当初、本プロジェクトは、日本庭園が決して限られた用途にだけ存在しているのではなく多くの用途・可能性に開かれていることを踏まえ、開発する「総合的アーカイヴ」もまた様々な可能性に開かれていることが目指されると考えていた。
        p このことをいま再考してみるに、それは決して、庭が有用性・理性のためだけに存在しているということではないことに注意しておきたい。庭が多くの用途・可能性に開かれていることが重要であることは変わりないが、しかし、庭の本質とは、まだ何事にも用いられない状態にもまた用いられるという点ではないだろうか。分かりやすくいえば、庭をぼんやりと眺めること、何となく歩き回ること、まだ明確な目的がない状態で庭を体験することである。
        p とくに、日本の庭を見てそれを読解し何か理解しようとすると、大きなジレンマに陥る。確かに、そこから象徴的、機能的な意義を読み取ることは可能である。しかしながら、それが庭の体験のすべてではない。庭とは、「よくわからないもの」「とらえどころのないもの」でもある。目の前に広がる庭を、ただ、何となく、ぼんやりと眺め、聴いていること。こうした、半理性的、あるいは半意識的な行為は、庭特有のものではないだろうか。
        p 庭の新しいアーカイヴが、本来の庭のように多くの可能性に開かれたものであることを目指すとき、それは、そのアーカイヴもまた「庭のようなもの」、つまり、「ぼんやりと眺め、聴いていること」が可能なものだということであろう。それは具体的には、そのアーカイヴ・システムが、用途に応じてデータが参照できるというだけでなく、無目的に用いること、言ってみれば、ゲームのように遊ぶことができるということ、あるいは、庭の音や映像が、BGMやBGVにもなるということであろう。そうしたアーカイヴ・システムこそ、息の長いものになるのではないだろうか。

    section.visual(data-fuwa)
      Img2X(src='plan-view.jpg')

    article
      section(data-fuwa)
        h4 「Incomplete Niwa Archives 終らない庭のアーカイヴ」へ

        p こうしたプロセスを経て、最終的に、本プロジェクトが目指すアーカイヴを「Incomplete Niwa Archives 終らない庭のアーカイヴ」と命名するに至った。
        p このタイトルの背景にあるのは、作家・三島由紀夫が1967年に京都・仙洞御所の庭を訪れ、日本の庭を論じたときに用いた「終らない庭」という言葉である。そこで三島は、ヴェルサイユ庭園に代表される西洋の整形式庭園と、日本の庭を対比させている。ヴェルサイユ庭園が「完成」を目指し、時間の要素を排除しようとするのに対して、三島は、日本の庭の特異な点は時間の要素を組み込んだことにあると論じ、「時の庭」という言葉を用いている。ヴェルサイユ庭園が時間経過を嫌うのに対して、日本の庭では「老いる」ことが肯定的に捉えられるということである。三島はこう書いている。
        blockquote
          | おそらく日本の庭の持つ秘密は、「終らない庭」「果てしのない庭」の発明にあつて、それは時間の流れを庭に導入したことによるのではないか。（中略）<br>
          | われわれは音楽を体験するやうに、生を体験するやうに、日本の庭を体験することができる。又、生にあざむかれるやうに、日本の庭にあざむかれることができる。<Footnote num="9" />
        p 本プロジェクトが目指す「庭のような」アーカイヴもまた、このように「終らない」「果てしのない」ものになる。「終らない庭のアーカイヴ」とは、日本庭園という「終らない庭」のアーカイヴのことであるとともに、そのアーカイヴもまた「庭のよう」であり、それも「終らない」ものだということを示している。それは、庭とアーカイヴの矛盾を孕んでいる。
        p こうした企図のもと、いよいよ最終年度となる2021年度には、秋頃に「Incomplete Niwa Archives 終らない庭のアーカイヴ」のフルバージョンをウェブ上で公開するとともに、YCAMという場所に特化した展示を行う予定である。
      section.footnotes(data-fuwa)
        ol.footnotes-list(start="9")
          li#fn9.footnote-item
            p
              | 三島由紀夫「「仙洞御所」序文」『決定版 三島由紀夫全集 34』（新潮社、2003年）、467頁、469頁。
              FootnoteBackref(num="9")

    article#credit

      h2(data-fuwa) Credit

      section(data-fuwa)

        p 科学研究費 基盤研究（B）「日本庭園の総合的アーカイヴの開発をめぐる研究」
        dl
          dt 研究代表者：
          dd 原瑠璃彦（青山学院大学客員研究員）
          dt 研究分担者：
          dd
            | 伊藤隆之（YCAM InterLab）<br>
            | 高原文江（YCAM Inter Lab）<br>
            | 城一裕（九州大学准教授、YCAM専門委員）<br>
            | 津田和俊（京都工芸繊維大学講師、YCAM専門委員）
        p 研究協力者：<br>
        dl.wide
          dt ウェブデザイン・開発
          dd KARAPPO Inc.
          dt 3Dビューワー開発協力
          dd 白木良（プログラマー）
          dt 常栄寺庭園 3Dスキャン
          dd 石井栄一、西本文博
          dt
            | 常栄寺庭園<br>
            | サウンド・レコーディング
          dd 中上淳二（YCAM InterLab）
          dt 常栄寺庭園 植物調査
          dd 出口晃多、大金まどか、平尾美紀、原さくら、秋貞朝
          dt 無鄰菴庭園3Dスキャン
          dd
            | 井上智博（京都工芸繊維大学 KYOTO Design Lab）<br>
            | 孫夢（京都工芸繊維大学 KYOTO Design Lab）<br>
          dt サウンド・システム開発
          dd
            | 安齋励應（慶應義塾大学SFC徳井直生研究室 B4）<br>
            | 岡崎圭佑（慶應義塾大学SFC徳井直生研究室 B2）
        dl.narrow
          dt 制作協力：
          dd 公益財団法人 山口市文化振興財団（山口情報芸術センター）

        p
          | 謝辞：<br>
          | 宗教法人 常栄寺<br>
          | 山口市文化財保護課<br>
          | <br>
          | 京都市<br>
          | 無鄰菴管理事務所<br>
          | 植彌加藤造園株式会社
    article(data-fuwa)
      footer
        | 科学研究費 基盤研究 (B)<br>
        | 「日本庭園の総合的アーカイヴの開発をめぐる研究」<br>
        | （課題番号：19H01225、研究代表者：原瑠璃彦）<br>
        | contact: <MailLink to="niwaarchive@rurihikohara.com">niwaarchive@rurihikohara.com</MailLink>

  template(v-else)

    article#about(data-fuwa)

      h2 About

      h3 Incomplete Niwa Archives

      p Launched in April 2019, the Garden Archives Project aims to study and develop a new kind of comprehensive archives that digitally survey Japanese gardens’ diverse aspects.
      p Gardens, niwa in Japanese, change with time. In contact to architecture and artworks in the conventional sense, gardens’ physical completion does not mean their realization. It  merely marks the beginning of a long process in which the garden slowly goes on “maturing.” Gardens understood as such—as constant metamorphosis—have always been part of human life. It is a space in which a wide range of activities unfold and human memories accumulate.
      p A variety of methods have been employed to record gardens, including text, architectural drawing, painting, photography and video. Recent years saw the emergence of high-definition photography, 3D scanning and audio recording of physical space and DNA analysis of living organisms. The equipment, too, has become much more affordable. The time thus seems ripe for us to exploit these technologies to build novel, contemporary archives of Japanese gardens.
      p Archiving gardens is a paradoxical effort. Such archives remain necessarily insufficient, for there is always a limit to the time, space and number of cases of which data can be collected. Just as a garden is never complete and has no “end,” its archives, too, will know no completion and be endless.                Pursuing such a seemingly impossible goal, this project seeks to interrogate anew what gardens are.
      p In the fall of 2021, the result of our work so far will be available on a dedicated website, accompanied by a physical presentation of related contents.


    article#report

      h2(data-fuwa) Report

      h4(data-fuwa)
        | Toward “Incomplete Niwa Archives” <br>
        | Garden Archives Project Activity Report 2020


      section(data-fuwa)
        p As to the general background and aims of the Garden Archives Project, inaugurated in 2019, kindly refer to
        a(href="#" v-scroll-to="'#about'") the Mission Statement
        |  as well as
        a(href="/doc/Towards_a_New_Archive_of_Gardens.pdf" target="_blank")  Hara Rurihiko’s “Towards New Archives of Gardens.”
        |  We devoted our first year to different experimentations on our selected subject, Jōei-ji temple near our base, the Yamaguchi Center of Arts and Media (YCAM). Building on these trials and errors, we intended to spend the academic year 2020 expanding our scope to include a new garden and commencing the construction of an actual user interface for our archives. These plans were deeply affected by COVID-19. Based respectively in Tokyo, Yamaguchi and Kyoto, we had trouble travelling to see each other in person and had to continue our research on a remote basis.
        p All in all, however, we believe that the project has achieved good progress. In fact, these hindrances often opened up new possibilities for us. If with the declaration of the state of emergency even the simplest garden visit became a complicated affair, the same situation can also be understood as conferring a new relevance on our attempt to publish and share our archival effort on the internet.
        p Our activities in 2020 can be summarized as follows:
        ul
          li The Garden Archives Project workshops at YCAM
          li Research on Murin-an Garden in Kyoto begins
          li Continued research on the Sesshū Garden in Jōei-ji and Development of the archives’ user interface.
          li Further conceptualization of “Incomplete Niwa Archives”
        p In contrast to the previous year, when we conducted our research primarily on our own, we were fortunate in 2020 to welcome many collaborators. What follows is a chronological overview of our activities.

      section(data-fuwa)

        h4 The Garden Archives Project Workshops at YCAM

        p
          | The unexpected benefit of the imposed shift online was particularly palpable with these workshops. Originally three meetings, each with an invited speaker, had been planned to be held at YCAM during 2020. We chose not to cancel the first session, scheduled for April, but to hold it online. As this proved even more successful than anticipated, it was decided to hold the entire series online on a monthly basis from this point forward, resulting in eight meetings in total.<br>
          | Our invitees were as follows: Yamauchi Tomoki (gardener and associate professor of aesthetics, Kyoto University of Education), Kondō Ryōsuke (assistant professor of aesthetics and landscape history, the University of Tokyo), Emmanuel Marès (associate professor of history of Japanese garden and architecture, Kyoto Sangyo University), Inoue Tomohiro (technological staff, KYOTO Design Lab, Kyoto Institute of Technology), Shimamura Yukitada (4th young master, Sankiteibaisaryū school of tea, scholar of senchadō and PhD student at the University of Kyoto), Tsugawa Eri (architect and CEO at ALTEMY, teaching/research fellow at the Tokyo University of Arts) and Aida Daiya (artistic director, YCAM).<Footnote num="1" /><br>
          | Although the meetings were not open to the public, we encouraged participation from the YCAM community beyond those directly affiliated with this project. This issued at each session in productive presentation and vigorous discussion. A very broad range of viewpoints were thus offered to examine issues such as the nature of gardens and parks, and how they are constructed, used and recorded/archived. We are projecting to publish the outcome of these workshops in some suitable form.<br>
          | On a separate occasion, Takahara and Hara gave a presentation on our project under the title “Fieldwork and Design seen from the perspectives of Gardens and Archives” at the 6th session of “Designing ‘with’ Fieldwork,” an online lecture series organized by Shin Toshiya Hotta, followed by a fruitful discussion. As such, this event went a long way toward bringing in focus what kind of archives our project should work toward.
      section.footnotes(data-fuwa)
        ol.footnotes-list
          li#fn1.footnote-item
            p
              | First session (April 18, 2020): Hara Rurihiko, “Ishi o taten koto kara ishi o fusen koto e—nihon teien no paradaimu shifuto[From Placing Stones Up To Placing Stones Prone: Paradigm Shift in Japanese Garden],” Kondō Ryōsuke, “Hokō no fūkei: zenpen [Peripatetic Landscape, Part 1],” and Yamauchi Tomoki, “Sakutei genba ni okeru kōzō no hassei 1 [Emergence of Structure in the Garden-Making Site 1]”<br>
              | Second session (May 30, 2020): Kondō Ryōsuke, “Hokō no fūkei: kōhen” and Yamauchi Tomoki, “Sakutei genba ni okeru kōzō no hassei 2”<br>
              | Third session (July 4, 2020): Emmanuel Marès, “Mori Osamu no nihon teien-shi kenkyū [Mori Osamu’s Studies on the History of Japanese Garden]”<br>
              | Fourth session (August 1, 2020): Yamauchi Tomoki, “Sakutei genba ni okeru kōzō no hassei 3”<br>
              | Fifth session (August 31, 2020): Inoue Tomohiro, “Digital Heritage Workflow: teien, kenchiku, bunkazai no 3D sukyaningu chōsa [Digital Heritage Workflow: 3D Scanning and Survey of Garden, Architecture, Cultural Property]”<br>
              | Sixth session (October 10, 2020): Shimamura Yukitada, “Kindai no sencha kūkan ni taisuru kinsei kōki bunjin bunka no eikyō [Late Early Modern Literati Culture’s Influence on the Modern Sencha Space]”<br>
              | Seventh session (January 16, 2021): Tsugawa Eri, “Ko no hyōgen kara umareru engekiteki paburikku supēsu [Theatrical Public Space Born from Expression of Personality]”<br>
              | Eighth session (February 20, 2021): Aida Daiya, “Korogaru kōen shirīzu ni tsuite [On the KOROGARU Park Series]”<br>
              FootnoteBackref(num="1")

      section(data-fuwa)
        h4 Research on Murin-an Garden in Kyoto Begins

        p We had originally planned to commence our research on Murin-an Garden in Kyoto in 2020. Murin-an was built between Meiji 27 and 29 (1894–96) by politician Yamagata Aritomo as a villa in Kyoto. Its garden was designed by Ogawa Jihei VII (alias Ueji, 1860–1933), a celebrated modernizer of Japanese gardening. This was the first concretization of Ueji’s vision of a new, contemporary garden-making. His innovation, often characterized as “from symbolism to naturalism,” consisted in replacing the traditional pond, made to symbolically stand for the ocean, by a stream of water drawn from the nearby canal, placing stones not upright but prone, and “borrowing” the scenery of the surrounding Higashiyama.<Footnote num="2" /> In recent years Murin-an frequently plays host to a variety of cultural events, becoming one of the most dynamic Japanese gardens in the country.<Footnote num="3" />
        p As their structure takes full account of the specificities of their respective sites, not two Japanese gardens are exactly alike. Jōei-ji and Murin-an Gardens already show a number of contrasts with each other.<Footnote num="4" /> While Jōei-ji garden is attached to a Buddhist temple, Murin-an’s belongs to what was originally the private residence of a powerful figure. Jōei-ji is structured around a pond, whereas Murin-an has only a shallow stream. The former is built on a slope; the latter’s site is almost entirely flat. Jōei-ji is at the foot of a mountain, in an extremely quiet area; Murin-an is situated on flat terrain and adjacent to a street, with the drone of the traffic constantly audible inside the garden. The sound of running water from the aforementioned stream is another sonic constant in the latter.
        p In June and December 2020, we carried out 3D scanning of the entire Garden.<Footnote num="5" /> These were followed in October by a water quality survey and interviews with Deguchi Kenta, the gardener in charge, and Hirano Tomoaki, a staff member (both Ueya Katō Zōen, Inc.), about maintenance of and birdlife at Murin-an. Also in October, we trialed fixed-point long-time video recording as well as Ambisonics.
        p Murin-an exhibits a striking series of changes from one season to another. In June we were able to 3D scan in lush greenery. When we went back in December, hoping to capture the radical transformation of scenery brought on by dead lawns in winter, we were blessed with snowfall from our second day onward. This gave us the unexpected opportunity to produce three different versions of scanning. We are working to publish these materials on Murin-an in the course of the next academic year.
        figure(data-fuwa)
          Img2X#murin-an-fig1(src="murin-an-1.jpg" alt="Murin-an Garden, June 20 2020")
          Img2X#murin-an-fig2(src="murin-an-2.jpg" alt="Murin-an Garden, December 16 2020")
          Img2X#murin-an-fig3(src="murin-an-3.jpg" alt="Murin-an Garden, December 17 2020")
          figcaption Murin-an Garden, June 20 (top), December 16 (left) and December 17 (right) 2020

      section.footnotes(data-fuwa)
        ol.footnotes-list(start="2")
          li#fn2.footnote-item
            p
              | See Amasaki Hiromasa, “Kindai teien no ranshō,” in Nanadaime Ogawa Jihei—sanshi suimei no miyako ni kaesaneba (Mineruba Shobō, 2012), 38–55; Suzuki Hiroyuki, “Hajimari to shiteno Yamagata Aritomo,” in Niwashi Ogawa Jihei to sono jidai (University of Tokyo Press, 2013), 53–98. Ueji’s garden-making at Murin-an is said to have taken significant cue from Yamagata Aritomo.
              FootnoteBackref(num="2")
          li#fn3.footnote-item
            p
              | See <ExternalLink href="https://murin-an.jp">Murin-an’s website</ExternalLink> for details.
              FootnoteBackref(num="3")
          li#fn4.footnote-item
            p
              | One commentator maintains that the garden at Murin-an is a “utsushi [emulation]” of Jōei-ji’s (Nomura Kanji, Tabi ni detara yotte mitai niwa 30 [Shōgaku-kan, 1997], 88).
              FootnoteBackref(num="4")
          li#fn5.footnote-item
            p
              | Inoue Tomohiro (KYOTO Design Lab, Kyoto Institute of Technology) was of great assistance in our 3D scanning campaigns.
              FootnoteBackref(num="5")

      section(data-fuwa)
        h4 Developing the Archives User Interface

        p Our research on Jōei-ji Garden continues. In addition to rescanning of the site for higher resolution 3D data, we produced repeated fixed-point long-time video recording and Ambisonics. While performing 3D scanning, Takahara Fumie also shot wildlife in the Garden. Additionally, we conducted interviews with Itō Shōgo, in charge of the Garden (CEO, Itō Zōen Ltd.), mineralogist Kanō Takashi (professor emeritus, Yamaguchi University), and zoologist Tanaka Hiroshi (curator, Yamaguchi Prefectural Yamaguchi Museum) while taking a walk together in the actual Garden. Not only did each of these experts bring his own perspective, the peripatetic form allowed us to record their thoughts emerge on the spot. To compile this diverse collection of data into a single user interface, we began to collaborate with KARAPPO Inc., a design office active in a variety of fields.<Footnote num="6" />
        p So far we have collected the following categories of data on the Gardens:
        ul
          li Textual information including preexisting literature
          li Architectural plans and painted or drawn images
          li 3D scans
          li Still images (old photographs and photographs of the current state)
          li Video recordings: fixed-point continuous shots
          li Ambisonics
          li Close-up photographs and video recordings of stones, plants and animals
          li DNA analysis of the plants and water in the Gardens
          li Video interviews shot in the Gardens
        p At this time we are working to divide this diverse collection into three principal registers, OUTLINE, VIEW and ELEMENT. OUTLINE is the basic information about the Gardens, as well as various data that allow to take an overview of the sites including architectural plans and 3D scans. VIEW designates chiefly images and videos based on the human experience of the Gardens. Finally, ELEMENT consists of close-ups of the individual details of the Gardens and micro-level information invisible to naked human eye.
        p The UI currently under development plots the VIEW and ELEMENT data onto the 3D scans of the Gardens, making the whole available for users’ free exploration. Each data is tagged and has its own network of relations.
        p As for surround audio recordings, a team led by Itō Takayuki is currently editing them with human hearing in mind. A deep learning-based sound identification system is also being developed and trialed by Jō Kazuhiro in collaboration with Anzai Reo and Okazaki Keisuke, M2 and B3 students respectively at Tokui Nao lab, Graduate School of Media and Governance, Keio University. This involves classifying diverse sounds in Japanese gardens to categories and having computers learn these categories to produce models. These models will then be used to identify different bird and animal species by their “voices” captured in the surround audio recordings.
        figure(data-fuwa)
          Img2X(src="ui.png" alt="Sample of the archive web")
          figcaption Sample of the archive web
      section.footnotes(data-fuwa)
        ol.footnotes-list(start="6")
          li#fn6.footnote-item
            p
              | KARAPPO Inc., has designed the website of Mori no DNA zukan, an important precedent for our project.
              FootnoteBackref(num="6")

      section(data-fuwa)
        h4 Digitizing the Gardens

        p These trials and errors gradually brought into focus the shape of archives for this project to work toward. The experience of producing a large amount of video and audio recordings on the ground was especially instructive. In particular, the almost one-hour-and-a-half long <a @click="openSound()">Ambisonics at Jōei-ji Garden</a>, made early in the morning of June 11, was a true revelation to the entire team. Countless wild birds and insects as well as forest green tree frogs keep singing everywhere in what might be called a morning garden symphony. As though each group were assigned a part in advance, sometimes brown-eared bulbuls dominate the entire scene, sometimes forest green tree frogs begin singing all at once, sometimes they sing to each other. Similarly, when rain starts to fall later in the recording, the sound varies depending on whether rain hits leaves, water surface or the ground, indexing the fluctuation in the intensity of the rainfall. “It’s exactly like a movie!” was our unanimous, spontaneous response. The soundscape in a garden changes minute by minute, with no two sounds ever similar. If that is a common knowledge, isolating sound from its environment, thereby reducing the information as to things happening there, makes that knowledge even more evident than when one is in the Garden, spending time in it.
        figure(data-fuwa)
          Img2X(src="sessyu-tei-photo.jpg" alt="Jôei-ji Garden in the early morning, September 21, 2020")
          figcaption Jôei-ji Garden in the early morning, September 21, 2020
        p Takahara for her part shot a few hundred video footages of animals found at various spots in the Garden. There is an overwhelming amount of things happening in a garden. What is coming into being right here and now alone is too diverse for a human or even a computer to grasp in its entirety. Furthermore, such now accumulates infinitely in a garden. Isolating this overwhelming amount of information by means of video and audio recording makes it relatively easier to comprehend what is occurring in that space.
        p Let us recall here the oft-quoted passage from Walter Benjamin’s “Little History of Photography” (1931):
        blockquote
          | It is another nature which speaks to the camera rather than to the eye…. A space informed by human consciousness gives way to a space informed by the unconscious…. It is through photography that we first discover the existence of this optical unconscious, just as we discover the instinctual unconscious through psychoanalysis.<Footnote num="7" />
          p Perhaps what our project seeks is to make a garden’s “unconscious” visible. That said, the technologies mobilized here include not only photography but video and sound recordings and 3D scans as well.<Footnote num="8" /> To isolate a garden’s “unconscious” that the technologies reveal in the form of separate pieces of information, and then to put them back together into a synthesis—that seems to be the purpose of our archives.
        figure(data-fuwa)
          Img2X(src="kanabun.jpg" alt="A drone beetle in Jôei-ji Garden")
          figcaption A drone beetle in Jôei-ji Garden

      section.footnotes(data-fuwa)
        ol.footnotes-list(start="7")
          li#fn7.footnote-item
            p
              | Walter Benjamin, “Little History of Photography,” trans. Edmund Jephcott and Kingsley Shorter, in Selected Writings 2, pt. 2, 1931–1934, ed. Michael W. Jennings, Howard Eiland, and Gary Smith (Cambridge, MA: Belknap, 1999), 510, 512.
              FootnoteBackref(num="7")
          li#fn8.footnote-item
            p
              | Abe Kazunao develops the concept of “the optical unconscious” into “mediated unconscious.” See “Parks as a Visionary Device: Extensive Readings and Reminiscence in Contemporary Art History,” Promise Park (Seoul: Workroom Press, 2017), 188-189.
              FootnoteBackref(num="8")

      section(data-fuwa)
        h4 Archives to Be Experienced Absentmindedly

        p What, then, is the ideal shape for such recombined and synthesized archives to take? From the beginning our conviction was that the “synthetic archives” we develop here need to be open to various possibilities, just like Japanese gardens are not limited to specific usages. Reflecting on this particular point now, it warrants attention that gardens do not exist solely for utility and reason. They are certainly open to numerous uses and possibilities, but gardens’ essence resides in the fact that they are also used to create a situation that has nothing to do with use. That is, one can look at gardens absentmindedly, walk around in them having no particular purpose, no clear goal yet.
        p It is especially vexing to try to decode and understand Japanese gardens. One can certainly read symbolic or functional meanings into them. And yet, they are only a small fraction of the experience gardens offer. For gardens are also something you do not quite understand, or something you cannot seize on. Looking at or listening to the garden spread in front of you with no particular intention, or absentmindedly—those semi-rational, or semi-conscious acts seem to be unique to the experience of garden.
        p If a new kind of archives of gardens seeks to be open to many possibilities as gardens themselves, it means that those archives will be like a garden, that is, something one can look at and listen to absentmindedly. Such an archive system will not merely provide information according to users’ needs but can also be employed aimlessly and played around with like a game. If users so wished, the sound and video recordings could serve as an unobtrusive accompaniment to some other activities they are engaged in. Such seems to be the most lasting kind of archive system.

    section.visual(data-fuwa)
      Img2X(src='plan-view.jpg')

    article
      section(data-fuwa)
        h4 Toward “Incomplete Niwa Archives”

        p Thus we have come to name the archives this project aims at “Incomplete Niwa Archives.” At the back of our mind was the phrase “never-ending garden,” employed by the writer Mishima Yukio in an essay he penned after visiting the garden at Kyoto Sentō Imperial Palace. In this text Mishima compares the Western formal garden, exemplified by the Versailles, and the Japanese garden. Whereas the former is oriented toward “completion,” seeking to purge itself of temporality, Mishima argues that the singularity of the latter consists exactly in incorporating temporal elements. For this reason he dabs the Japanese kind “garden of time.” If the French gardens are hostile to the passage of time, “aging” is given a positive meaning in their Japanese counterparts. Mishima writes:
        blockquote
          | Perhaps the secret of Japanese gardens resides in its invention of “never-ending” and “infinite” gardens, thereby introducing the flow of time into gardens. … We can experience a Japanese garden just like music or life itself. Or we can be deceived by a Japanese garden just like we are deceived by life.<Footnote num="9" />
        p The “garden-like” archives this project is working toward, too, will be similarly “never-ending” and “infinite.” These “archives of never-ending gardens” are not only of “never-ending gardens,” in Japan, but like Japanese gardens, thus themselves “never-ending.” Here is the conflict between gardens and archives. With these in mind, we will launch the full version of “Incomplete Niwa Archives” on the internet in the fall of this final year of our project, as well as mount an exhibit specific to the YCAM site.
      section.footnotes(data-fuwa)
        ol.footnotes-list(start="9")
          li#fn9.footnote-item
            p
              | Mishima Yukio, “‘Sentō Gosho’ jobun,” in Ketteiban Mishima Yukio zenshū 34 (Shinchō-sha, 2003), 467, 469.<br>
              | (Translation: Kondō Gaku)
              FootnoteBackref(num="9")

    article#credit

      h2(data-fuwa) Credit

      section(data-fuwa)

        p
          | Grant-in-Aid for Scientific Research (B) <br>
          | “Research and Development of Comprehensive Archives of Japanese Gardens”
        dl
          dt Principal Investigator:
          dd Rurihiko Hara (Lecturer at Shizuoka University)
          dt Co-Investigators:
          dd
            | Itō Takayuki (YCAM InterLab), <br>
            | Takahara Fumie (YCAM InterLab), <br>
            | Jō Kazuhiro (Associate Professor at Kyushu University, Expert Advisor of YCAM), <br>
            | Tsuda Kazutoshi (Junior Associate Professor at Kyoto Institute of Technology, Senior Research Fellow of YCAM)
        p Research Collaborators:<br>
        dl
          dt UI Design and Development
          dd KARAPPO Inc.
          dt Cooperation for the Development of 3D viewer
          dd Shiraki Ryō (Programmer)
          dt 3D Scanning of Jōei-ji Garden
          dd Ishii Eiichi, Nishimoto Fumihiro
          dt
            | Ambisonics Recording of Jōei-ji Garden
          dd Nakaue Junji (YCAM InterLab)
          dt Botanical Survey of Jōei-ji Garden
          dd Deguchi Kōta, Ōgane Madoka, Hirao Miki, Hara Sakura, Akisada Hajime
          dt 3D Scanning of Murin-an Garden
          dd
            | Inoue Tomohiro (KYOTO Design Lab, Kyoto Institute of Technology), <br>
            | Sun Meng (KYOTO Design Lab, Kyoto Institute of Technology)
          dt Development of Sound System
          dd
            | Anzai Reo (B4 student at Tokui Nao lab, Graduate School of Media and Governance, Keio University), <br>
            | Okazaki Keisuke (B2 student at Tokui Nao lab, Graduate School of Media and Governance, Keio University)
        p Developed in Cooperation with Public Interest Incorporated Foundation, Yamaguchi City Foundation for Cultural Promotion (Yamaguchi Center for Arts and Media)
        p Special thanks to Religious corporation, Jōei-ji temple, Cultural Properties Protection Department of Yamaguchi City, Kyoto City, Murin-an Management Office, UEYAKATO LANDSCAPE Co., LTD.
        p Special thanks to Religious corporation, Jōei-ji temple, Cultural Properties Protection Department of Yamaguchi City, Kyoto City, Murin-an Management Office, UEYAKATO LANDSCAPE Co., LTD.
    article(data-fuwa)
      footer
        | Grant-in-Aid for Scientific Research (B) <br>
        | “Research and Development of Comprehensive Archives of Japanese Gardens” <br>
        | (JSPS KAKENHI Grant Number JP19H01225, Principal Investigator: Rurihiko Hara) <br>
        | contact: <MailLink class="mail" to="niwaarchive@rurihikohara.com">niwaarchive[at]rurihikohara.com</MailLink>
</template>

<style lang="sass" scoped>
@import '~/assets/style/general/const'
@import '~/assets/style/const'
@keyframes scroll_guide_animation
  0%
    transform: translate3d(0, -100%, 0)
  15%
    transform: translate3d(0, -98%, 0)
  85%
    transform: translate3d(0, 98%, 0)
  100%
    transform: translate3d(0, 100%, 0)
main
  padding-top: 10px
  +sp
    padding-top: 4px
section.mv
  margin: 64px 50px 0
  display: flex
  flex-direction: column
  align-items: center
  position: relative
  +sp
    margin: 0
  .scrollGuide
    position: absolute
    right: 0
    bottom: 0
    z-index: 10
    display: flex
    flex-direction: column
    +pc
      display: none
    span
      font-size: 13px
      letter-spacing: 0.07em
      font-family: 'K2-v1-XLight', $helvetica
      transform: rotate(90deg) translate(-40px, -10px)
      transform-origin: left top
    i
      display: block
      width: 1px
      height: 45px
      margin-top: 45px
      background-color: #A9BCB6
      overflow: hidden
      position: relative
      &:before
        display: block
        content: ''
        width: 100%
        height: 100%
        background-color: #ffffff
        position: absolute
        top: 0
        left: 0
        animation: scroll_guide_animation 2s infinite normal
  > img.mv-text
    width: calc(100% - 5vw)
    margin: 0 auto -1vw
    +sp
      width: calc(100% - 12vw)
section.visual
  margin: 0 50px
  +sp
    margin: 0 25px
  > img
    width: 100%
    height: auto
article
  width: 690px
  margin: 0 65px 215px auto
  @extend %font_tsukuantique_l
  font-size: 15px
  letter-spacing: 0
  line-height: 2
  +sp
    width: calc(100% - 50px)
    margin: 0 25px 120px
    font-size: 13px
    line-height: 22px
    letter-spacing: -0.03em
  &:last-child
    margin-bottom: 56px
    +sp
      margin-bottom: 25px
main[data-lang='en']
 article
    font-family: 'K2-v1-Light', $helvetica
    +sp
      letter-spacing: 0
h2
  font-family: 'K2-v1-Light', $helvetica
  font-size: 15px
  font-weight: normal
  letter-spacing: 0.05em
  margin: 70px 0
  +sp
    font-size: 13px
    margin: 40px 0
h3
  font-size: 24px
  font-weight: normal
  letter-spacing: 0.032em
  line-height: 1.5
  margin: 88px 0
  main[data-lang=en] &
    font-size: 21px
    letter-spacing: .012em
    +sp
      font-size: 15px
  +sp
    font-size: 16px
    margin: 44px 0
h4
  font-size: 20px
  font-weight: normal
  letter-spacing: 0.032em
  line-height: 2
  margin: 70px 0
  main[data-lang=en] &
    font-size: 20px
    letter-spacing: .012em
    +sp
      font-size: 15px
  +sp
    font-size: 16px
    margin: 35px 0
p
  main[data-lang=en] &
    letter-spacing: .02em
p + p
  margin-top: 2em
sup
  font-size: 0.5em
ol
  padding-left: 1em
ul
  padding-left: 1.8em
.footnotes
  @extend %font_tsukuaold_r
  font-size: 12px
  line-height: 23px
  +sp
    font-size: 10px
    line-height: 2
main[data-lang='en']
 .footnotes
    font-family: 'K2-v1-Light', $helvetica
blockquote
  @extend %font_tsukuaold_r
  font-size: 14px
  line-height: 2
  margin: 34px 0 34px 51px
  +sp
    font-size: 13px
    line-height: 22px
    margin: 50px 0 50px 30px
main[data-lang='en']
 blockquote
    font-family: 'K2-v1-Light', $helvetica
section + section:not(.footnotes)
  margin-top: 200px
  +sp
    margin-top: 150px
figure
  margin: 32px 0 26px
  img
    +sp
      width: 100%
      height: auto
figcaption
  @extend %font_tsukuaold_r
  text-align: right
  font-size: 12px
  line-height: 23px
  margin-top: 7px
  opacity: 0.8
  +sp
    font-size: 10px
main[data-lang='en']
 figcaption
    font-family: 'K2-v1-Light', $helvetica
#murin-an-fig1
  vertical-align: bottom
  margin-bottom: 2px
  width: 100%
  height: auto
#murin-an-fig2
  margin-right: 2px
  width: calc(50% - 1px)
  height: auto
#murin-an-fig3
  width: calc(50% - 1px)
  height: auto
dl
  display: flex
  flex-wrap: wrap
  $width: 6em
  dt
    width: $width
    margin-bottom: 0.5em
    +sp
      width: 100% !important
      margin-bottom: 0 !important
  dd
    width: calc(100% - #{$width + 4em})
    margin-left: 2em
    margin-bottom: 0.5em
    +sp
      width: 100% !important
      margin-left: 0 !important
      margin-bottom: 1em !important
main[data-lang='en']
  #credit
    p,
    dl
      font-size: 13px
  dl
    $width: 15em
    dt
      width: $width
      margin-bottom: 1em
    dd
      width: calc(100% - #{$width + 4em})
      margin-left: 2em
      margin-bottom: 1em
dl.wide
  $width: 12em
  dt
    width: $width
  dd
    width: calc(100% - #{$width + 4em})
    margin-left: 2em
dl.narrow
  $width: 5em
  dt
    width: $width
  dd
    width: calc(100% - #{$width + 4em})
    margin-left: 2em
footer
  opacity: 0.5
main[data-lang='en']
  footer
    font-size: 13px
  .mail
    font-family: $helvetica
</style>

<script>
import { ExternalLink, MailLink } from '@karappo-inc/vue-components'

export default {
  components: {
    ExternalLink,
    MailLink
  },
  data() {
    return {
      fontPlusTimer: null
    }
  },
  mounted() {
    this.updateGoogleAnalyticsTitle()
    setTimeout(this.initFuwa, 1000)
    this.fontPlusTimer = setInterval(this.loadFont, 1000)
  },
  methods: {
    loadFont() {
      console.log('loadFont...')
      if (FONTPLUS) {
        console.log('FONTPLUS.reload() OK!')
        FONTPLUS.reload()
        clearInterval(this.fontPlusTimer)
      }
    },
    openSound() {
      window.open(
        'https://www.dropbox.com/s/fecknd6dxvk3uo4/J%C5%8Dei-ji_Garden_%28June_11_2020_stereo_ver%29..wav?dl=0',
        'DescriptiveWindowName',
        'resizable,scrollbars,status'
      )
    }
  }
}
</script>
