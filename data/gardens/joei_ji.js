export default {
  title: 'Jōei-ji Garden',
  pointcloud: '/pointclouds/Sesshutei.las_converted/metadata.json',
  async addImages() {
    const images = await Potree.OrientedImageLoader.load(
      '/orientedImage/cameraParams.xml',
      '/orientedImage/imageParams.txt',
      window.viewer
    )
    window.viewer.scene.addOrientedImages(images)
  },
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(46.97, 75.066, 25.272)
    window.viewer.scene.view.lookAt(new THREE.Vector3(38.742, 83.399, 24.068))
  },
  guidedTour: [
    '6t5oku',
    'ieagdj',
    'j1p8ce',
    'zfdjlo',
    '4bmhwg',
    '74wek8',
    '6n2t47',
    '8bzmha'
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
