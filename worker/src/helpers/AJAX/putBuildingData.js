import { getRecordByKey, putRecordByKey } from '../db'
import { searchBuilding } from '../'
import { host, apiKey } from '../../configs'
import { getBuildingDataById, storeBuildings } from '../AJAX'

const getError = (status, key) => ({
  status,
  action: 'put',
  key,
  error: true,
  errorType: 'Save building details',
  errorMessage: 'Operation failed'
})

export const putBuildingData = async function (buildingId, data) {
  const [action, key] = ['put', buildingId]

  let response = await getBuildingDataById(buildingId)
  if (response.status !== 200) return getError(response.status, buildingId)

  Object.assign(response.result, { ...data })
  self.postMessage( { status: 300, action, key, result: response.result })

  if (!navigator.onLine) return { status: 0, action, result: 'Offline mode: Data has not been saved. Try later' }

  response = await fetch(`${host()}/building/${buildingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey()
    },
    body: JSON.stringify(response.result)
  })

  if (response.status !== 200) return getError(response.status, buildingId)

  self.postMessage( { status: 300, action, key, result: await response.json() })

  const result = await storeBuildings()

  return { action, key, status: response.status, result }
}
