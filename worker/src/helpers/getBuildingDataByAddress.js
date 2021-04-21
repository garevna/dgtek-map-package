import { searchBuilding } from './'
import { getBuildingDataById } from './AJAX'

export const getBuildingDataByAddress = async (address) => {
  const [action, key] = ['getByAddress', address]

  const response = await searchBuilding(address)

  if (response.status !== 200) return { status: response.status, action, key, result }

  // self.postMessage({ status: 300, action, key, response: response.result._id })

  const { status: remoteStatus, store, result: buildingData } = await getBuildingDataById(response.result._id)

  return { status: remoteStatus, action, store: response.store, key, result: buildingData }
}
