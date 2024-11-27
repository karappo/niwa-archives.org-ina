export default {
  title: 'House of Hosoo',
  pointcloud: '20241126_Hosoo_PotreeConverted/metadata.json',
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(30.522, -46.124, 4.345)
    window.viewer.scene.view.lookAt(new THREE.Vector3(27.713, -45.114, 4.641))
  },
  guidedTour: [],
  tours: []
}
