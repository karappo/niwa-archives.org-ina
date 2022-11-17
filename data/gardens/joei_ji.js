export default {
  title: 'Jōei-ji Garden',
  pointcloud:
    '/niwa/assets/pointclouds/Sessyutei_20211004_0.005.las_converted/metadata.json',
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(48.27, 81.57, 26.026)
    window.viewer.scene.view.lookAt(new THREE.Vector3(45.402, 82.278, 26.55))
  },
  guidedTour: [
    'rq8xn8',
    'q6gt88',
    'zcgy44',
    'qlba4t',
    'o6vc2r',
    'vzos66',
    'zwctzm',
    'wlu42x',
    'vvxnpn',
    '7ggb5p',
    '1t4owv',
    '0asjx2'
  ],
  tours: [
    {
      positions: [
        [-45.509, 48.096, 26.978],
        [-45.705, 13.655, -1.111],
        [-43.002, 7.955, -1.188],
        [5.121, -6.388, 10.691]
      ],
      targets: [
        [-34.27, 25.369, -2.105],
        [-44.209, 10.512, -2.616],
        [-41.335, 7.212, -1.703],
        [-23.185, 22.343, -13.972]
      ]
    },
    {
      positions: [
        [1.815, 6.278, 3.947],
        [2.702, 24.751, 1.87],
        [-1.243, 35.463, 4.325],
        [-19.15, 26.003, 1.441],
        [-30.24, 12.747, -1.112]
      ],
      targets: [
        [-16.065, 14.824, -1.693],
        [-15.38, 19.475, 3.352],
        [-17.681, 23.136, 1.38],
        [-23.223, 24.71, -0.927],
        [-28.402, 22.346, -0.679]
      ]
    }
  ]
}
