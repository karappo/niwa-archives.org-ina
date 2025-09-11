export default {
  title: 'Fugetsuro - Spring',
  pointcloud:
    '20231016_20230403_Fugetsuro_RCEdit_10mm.las_converted/metadata.json',
  variations: ['spring', 'summer', 'autumn', 'winter'],
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(24.654, -1.195, 0.998)
    window.viewer.scene.view.lookAt(new THREE.Vector3(23.046, -3.701, 1.363))
  },
  guidedTour: [],
  tours: []
}
