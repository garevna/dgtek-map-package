import { encrypt, decrypt, hash } from './'
import { hostHandler, apiKeyHandler } from './env'

/* eslint-disable camelcase */

export const auth = async (login, password) => {
  const action = 'auth'
  if (!navigator.onLine) return { status: 0, action, result: 'Offline mode: authorization is impossible' }

  const host = hostHandler()
  const api_key = apiKeyHandler()

  const { status: hashStatus, result: hashResult } = hash(password)

  if (hashStatus !== 200) return { status: 500, action, result: 'Hash error' }

  const { status, result } = encrypt(JSON.stringify({ login, password: hashResult }))
  if (status !== 200) return { status, action, result }

  // self.postMessage({ status, action, result, message: 'Enscrypted' })
  const { status: descritionStatus, result: descritionResult } = decrypt(result)
  // self.postMessage({ status: descritionStatus, action, result: JSON.parse(descritionResult), message: 'Descrypted' })

  if (descritionStatus !== 200) return { status: descritionStatus, action, result: descritionResult }

  const response = await fetch(`${host}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authentification: api_key
    },
    body: JSON.stringify({ data: result })
  })
  return { status: response.status, action: 'redirect', result: await response.json() }
}
