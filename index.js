import { GOOGLE_MAPS_API_KEY, BUILDINGS_API_URL, GEOSCAPE_API_KEY } from './env.js'

import DgtekMap from './dist/dgtek-map'

const events = [
  'on-net',
  'footprint',
  'construction-commenced',
  'coming-soon',
  'not-available',
  'list',
  'submit-address',
  'get-by-id',
  'get-by-address',
  'post',
  'put'
]

const container = document.getElementById('container-for-map')

const catchEvent = function (event) {
  console.group('Event handler outside package')
  console.log('Event type: ', event.type)
  console.log('Event data:\n', event.data)
  console.groupEnd('Event handler outside package')
}

events.forEach(event => container.addEventListener(event, catchEvent))

const mapComponent = new DgtekMap({
  container: document.getElementById('container-for-map')
})

mapComponent.getLIT()
mapComponent.getFootprint()

// mapComponent.getByAddress('24 HOTHAM GROVE, ELSTERNWICK VIC 3185')

window[Symbol.for('map.worker')].postMessage({ action: 'getById', store: '*', key: '5fb007a8227ca1003434e19e' })

window[Symbol.for('map.worker')].postMessage({ action: 'getByAddress', store: '*', key: '24 HOTHAM GROVE, ELSTERNWICK VIC 3185' })

// mapComponent.getBuildingDataById('5faffb0b227ca1003434e182')
mapComponent.getBuildingDataByAddress('105 COLLINS ST, MELBOURNE VIC 3000')
