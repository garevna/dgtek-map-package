import { host, apiKey } from '../../configs'
import { putRecordByKey } from '../db'

export const getBuildingDataById = async (buildingId) => {
  if (!navigator.onLine) return { status: 0, result: 'Offline mode: Data has not been saved. Try later' }

  const [action, key] = ['getById', buildingId]

  const response = await fetch(`${host()}/building/${buildingId}`)

  if (response.status !== 200) return { status: response.status, action, key, result: `Error reading building ${buildingId} data` }

  const result = (await response.json()).data

  await putRecordByKey('current', 'data', result)

  return { status: response.status, action, store: result.status, key, result }
}
