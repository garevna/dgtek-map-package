import { host, apiKey, buildingSchema } from '../../configs'

import { getBuildingDataById, storeBuildings } from './'

export const postBuildingData = async (data) => {
  if (!navigator.onLine) return { status: 0, result: 'Offline mode: Data has not been saved. Try later' }

  const newBuilding = Object.assign(buildingSchema, data)

  const response = await fetch(`${host()}/building`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: apiKey()
    },
    body: JSON.stringify(newBuilding)
  })

  const newBuildingId = (await response.json()).data

  if (response.status === 200) {
    self.postMessage({ status: 300, action: 'post', key: 'new building id', result: newBuildingId })

    await storeBuildings()
    const { result } = await getBuildingDataById(newBuildingId)

    return { status: 200, action: 'post', key: newBuildingId, result }
  }
  return { status: response.status, action: 'post', result: 'Operation failed' }
}
