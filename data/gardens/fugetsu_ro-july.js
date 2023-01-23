export default {
  title: 'Fugetsuro - July',
  pointcloud:
    '/assets/pointclouds/Fugetsuro_Summer_WithTeahouse_1mm_cleaned_nonormal_small_noduplicates.laz_converted/metadata.json',
  variations: ['february', 'july'],
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(-2.559, 1.421, 1.763)
    window.viewer.scene.view.lookAt(new THREE.Vector3(-0.828, 3.569, 0.584))
  },
  guidedTour: [],
  tours: []
}
