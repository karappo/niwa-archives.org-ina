export default {
  title: 'House of Hosoo',
  pointcloud: '20241126_Hosoo_PotreeConverted/metadata.json',
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(1.238, -43.205, 63.257)
    window.viewer.scene.view.lookAt(new THREE.Vector3(1.238, -43.205, 60.257))
  },
  guidedTour: [],
  tours: []
}
