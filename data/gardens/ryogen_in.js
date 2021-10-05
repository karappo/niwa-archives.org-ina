export default {
  title: 'Ryōgen-in Garden',
  pointcloud:
    '/assets/pointclouds/ryogen-in_210903_0.005.las_converted/metadata.json',
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(-7.155, 0.893, 82.685)
    window.viewer.scene.view.lookAt(new THREE.Vector3(-7.481, 0.39, 82.691))
  },
  guidedTour: [],
  tours: []
}
