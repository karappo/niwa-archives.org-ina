export default {
  title: 'Fugetsuro - February',
  pointcloud:
    '/assets/pointclouds/fugeturou-20220626-0.01.las_converted/metadata.json',
  variations: ['february'],
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(-2.559, 1.421, 1.763)
    window.viewer.scene.view.lookAt(new THREE.Vector3(-0.828, 3.569, 0.584))
  },
  guidedTour: [],
  tours: []
}
