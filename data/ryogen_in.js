export default {
  title: 'Ryogen In',
  pointcloud: '/pointclouds/ryogen-in_210903_0.005.las_converted/metadata.json',
  async addImages() {
    // do nothing
  },
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(-15.27, -1.775, 83.132)
    window.viewer.scene.view.lookAt(new THREE.Vector3(-15.11, -2.305, 82.901))
  },
  tours: []
}
