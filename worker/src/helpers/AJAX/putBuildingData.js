import { getRecordByKey, putRecordByKey } from '../db'
import { searchBuilding } from '../'
import { host, apiKey } from '../../configs'
import { getBuildingDataById } from '../AJAX'

export const putBuildingData = async function (buildingId, data) {
  const response = await getBuildingDataById(buildingId)
  if (response.status !== 200) return response

  Object.assign(response.result, { ...data })
  self.postMessage( { status: 300, store: 'test', key: buildingId, result: response.result })

  if (!navigator.onLine) return { status: 0, result: 'Offline mode: Data has not been saved. Try later' }

  await (await fetch(`${host()}/building/${buildingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey()
    },
    body: JSON.stringify(response.result)
  })).json()

  await getBuildingDataById(buildingId)

  return { status: response.status, result: response.status === 200 ? response.result : 'Operation failed' }
}
