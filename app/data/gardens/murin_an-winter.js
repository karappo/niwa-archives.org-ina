import { murinAnHistoryContent } from './murin_an-history.js'

export default {
  title: 'Murin-an Garden - Winter',
  pointcloud: 'MurinanW_0.01.las_converted/metadata.json',
  variations: ['summer', 'winter', 'snow'],
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(169.884, -45.892, -3.278)
    window.viewer.scene.view.lookAt(new THREE.Vector3(168.611, -48.579, -3.678))
  },
  guidedTour: [],
  tours: [
    {
      positions: [
        [-17.371, 14.113, 6.617],
        [-21.396, 6.723, 7.492],
        [-16.811, -0.786, 7.492],
        [-8.041, -1.491, 7.492],
        [-2.316, 5.19, 7.492]
      ],
      targets: [
        [-11.611, 7.547, -0.679],
        [-12.019, 6.813, -0.533],
        [-11.56, 6.062, -0.533],
        [-10.683, 5.991, -0.533],
        [-10.111, 6.659, -0.533]
      ]
    }
  ],
  historyContent: murinAnHistoryContent,
  threeDDataContent: `撮影日：2020年12月16日、18日、24日<br />
<br />
撮影者：<br />
井上智博（京都工芸繊維大学 KYOTO Design Lab）<br />
孫夢（京都工芸繊維大学 KYOTO Design Lab）<br />
津田和俊（山口情報芸術センター［YCAM］、京都工芸繊維大学）<br />
<br />
編集者：<br />
井上智博（京都工芸繊維大学 KYOTO Design Lab）<br />
<br />
撮影機材：FARO FocusS 350 / FocusX 130<br />
精度：3x<br />
解像度：1/4<br />
測点数：102<br />
<br />
編集ソフトウェア：<br />
FARO Scene<br />
CloudCompare<br />
<br />
点群数：<br />
76,621,130`
}
