import { getAllKeys } from './db'
import { statusNames } from '../configs'

export const getBuildingsList = async (type) => {
  const [action, store] = ['list', type]
  if (Object.keys(statusNames).indexOf(type) === -1) return { status: 422, action, store, result: `Invalid request: type ${type} not found` }

  const { status, result } = await getAllKeys(type)
  return { status, store, action, result }
}
