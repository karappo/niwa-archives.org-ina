export default {
  title: 'Fugetsuro - February',
  pointcloud:
    '/assets/pointclouds/fugeturou-20220626-0.01.las_converted/metadata.json',
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(-26.135, 13.611, 8.896)
    window.viewer.scene.view.lookAt(new THREE.Vector3(-23.466, 12.252, 8.728))
  },
  guidedTour: [],
  tours: []
}
