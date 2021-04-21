import { hostHandler, apiKeyHandler } from './env'
import { encrypt, hash } from './'

export const registration = async (payload) => {
  const { action, ...body } = payload

  if (!navigator.onLine) return { status: 0, action, result: 'Offline mode: registration is impossible' }

  // self.postMessage({ status: 300, action, result: body })

  const { login, password } = body.auth
  const { status: hashStatus, result: hashResult } = hash(password)

  if (hashStatus !== 200) return { status: 500, action, result: 'Hash error' }

  const { status, result } = encrypt(JSON.stringify({ login, password: hashResult }))

  if (status !== 200) return { status, action, result }

  body.auth = result

  const response = await fetch(`${hostHandler()}/ticket/registration/v1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authentification: apiKeyHandler()
    },
    body: JSON.stringify(body)
  })
  return { status: response.status, action, result: Object.assign({}, await response.json(), { message: 'Response from server' }) }
}
