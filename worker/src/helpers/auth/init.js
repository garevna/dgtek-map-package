import { secretHandler, hostHandler, apiKeyHandler } from './env'

export const init = (request) => {
  const action = 'init'
  if (!request.host || !request.key || !request.secret) return { status: 422, action, result: 'Invalid request: Insufficient data' }
  secretHandler(request.secret)
  hostHandler(request.host)
  apiKeyHandler(request.key)
  return { status: 200, action, result: 'Success' }
}
