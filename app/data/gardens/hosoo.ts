import type { GardenData } from '~/types/garden'

const gardenData: GardenData = {
  title: 'House of Hosoo',
  pointcloud: '20241126_Hosoo_PotreeConverted/metadata.json',
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(1.868, -41.441, 90.144)
    window.viewer.scene.view.lookAt(new THREE.Vector3(1.868, -41.441, 87.144))
  },
  guidedTour: [],
  tours: []
}

export default gardenData
