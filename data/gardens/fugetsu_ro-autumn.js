export default {
  title: 'Fugetsuro - Autumn',
  pointcloud:
    '/assets/pointclouds/20231016_20221227_FugetsuroPhotoRaserEdit_10mm.las_converted/metadata.json',
  variations: ['spring', 'summer', 'autumn', 'winter'],
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(-2.559, 1.421, 1.763)
    window.viewer.scene.view.lookAt(new THREE.Vector3(-0.828, 3.569, 0.584))
  },
  guidedTour: [],
  tours: []
}
