import { clearStore, putRecordByKey } from '../db'
import { host, collections, statusNames } from '../../configs'
import { addressTransform } from '../'

export const storeBuildings = async (key) => {
  if (!navigator.onLine) return { status: 0, result: 'Offline mode' }

  const action = 'store'

  const response = await fetch(`${host()}/building`)
  if (response.status !== 200) return { status: response.status, result: 'Error reading data from server' }

  const data = (await response.json()).data

  for (const collectionName in statusNames) {
    const { status, result } = await clearStore(collectionName)
    const collection = data.filter(record => record.status === statusNames[collectionName])
    for (const record of collection) {
      const { address, ...rest } = record

      const { status, result } = await putRecordByKey(collectionName, addressTransform(address), rest)

      if (status !== 200) self.postMessage({ status, action, store: collectionName, result: address })
    }
  }

  return { status: 200, action, result: 'Success' }
}
