import { getAll } from './db'
import { statusNames } from '../configs'

import { types } from '../configs'

export const getBuildingsData = async (type) => {
  const [action, store] = ['data', type]
  if (Object.keys(statusNames).indexOf(type) === -1) return { status: 422, action, store, result: `Invalid request: type ${type} not found` }

  const { status, result } = await getAll(type)

  const data = result.map(item => ({
    id: item._id,
    address: item.address,
    addressComponents: item.addressComponents,
    estimatedServiceDeliveryTime: item.estimatedServiceDeliveryTime
  }))

  // self.postMessage({ status: 300, action, store, result: data })

  return {
    status,
    action,
    store,
    result: Object.assign(data, {
      event: types[store].event,
      buildingStatus: types[store].buildingStatus,
      polygonStatus: types[store].polygonStatus
    })
  }
}
