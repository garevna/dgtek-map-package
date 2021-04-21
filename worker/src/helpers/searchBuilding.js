import { getRecordByKey } from './db'
import { statusNames } from '../configs'

export const searchBuilding = async (address) => {
  const [action, key] = ['search', address]

  for (const statusName in statusNames) {
    const { status, result } = await getRecordByKey(statusName, address)

    // self.postMessage({ status: 300, action, result: { status, store: statusName, key, ...result } })

    if (status === 200) return { status, action, store: statusName, key, result }
  }

  return { status: 404, action, key, result: `Building ${address} not found` }
}
