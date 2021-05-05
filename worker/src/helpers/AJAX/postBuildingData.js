import { host, apiKey, buildingSchema, statusNames } from '../../configs'

import { getBuildingDataById, storeBuildings } from './'

const getError = (status, errorMessage = 'Operation failed') => ({
  status,
  action: 'post',
  error: true,
  errorType: 'Create new building',
  errorMessage
})

export const postBuildingData = async (data) => {
  const action = 'post'
  if (!navigator.onLine) return { action, status: 0, result: 'Offline mode: Data has not been saved. Try later' }

  // self.postMessage({ status: 300, action, store: data.status, result: data })

  if (!data.status) return getError(422, 'Building status not defined')

  const store = Object.keys(statusNames).find(storeName => statusNames[storeName] === data.status)

  // self.postMessage({ status: 300, action, store })

  if (!store) return getError(422, `Invalid building status ${data.status}`)

  const newBuilding = Object.assign(buildingSchema, data)

  // self.postMessage({ status: 300, action, store, result: newBuilding })

  const response = await fetch(`${host()}/building`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: apiKey()
    },
    body: JSON.stringify(newBuilding)
  })

  if (response.status !== 200) return getError(response.status)

  const newBuildingId = (await response.json()).data

  // self.postMessage({ status: 300, action, store, key: newBuildingId })

  return { status: 200, action: 'post', store, key: newBuildingId, result: newBuildingId }
}
