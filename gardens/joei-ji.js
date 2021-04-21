export default {
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
    window.viewer.scene.view.position.set(-45.509, 48.096, 26.978)
    window.viewer.scene.view.lookAt(new THREE.Vector3(-34.27, 25.369, -2.105))
  },
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
}
