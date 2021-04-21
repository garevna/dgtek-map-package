import { routes, host, apiKey } from './configs'

import { BUILDINGS_API_URL, BUILDINGS_API_KEY } from '../env'

host(BUILDINGS_API_URL)
apiKey(BUILDINGS_API_KEY)

self.onmessage = (event) => {
  const { action } = event.data
  if (!routes[action] || typeof routes[action] !== 'function') return self.postMessage({ status: 422, action, result: 'Invalid request' })
  routes[action](event.data)
}
