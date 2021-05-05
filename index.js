import { GOOGLE_MAPS_API_KEY, BUILDINGS_API_URL, GEOSCAPE_API_KEY } from './env.js'

import DgtekMap from './dist/dgtek-map'

const events = [
  'on-net',
  'footprint',
  'construction-commenced',
  'coming-soon',
  'not-available',
  'buildings-address-list',
  'buildings-data-list',
  'submit-address',
  'get-by-id',
  'get-by-address',
  'post',
  'put'
]

const container = document.getElementById('container-for-map')

const catchEvent = function (event) {
  console.group('Event handler outside package')
  console.log(event.target === window[Symbol.for('map.worker')] ? 'WORKER EVENT' : 'INSTANCE EVENT')
  console.log('Event type: ', event.type)
  console.log('Event data:\n', event.data)
  console.groupEnd('Event handler outside package')
  // if (event.type === 'building-data-list' || event.type === 'building-address-list') {
  //   console.log(event.data.result.map(item => item))
  //   console.log(event.data.result.event)
  //   console.log(event.data.result.buildingStatus)
  //   console.log(event.data.result.polygonStatus)
  // }
  // if (event.type === 'get-by-id') {
  //   const { key, result: data } = event.data
  //   Object.assign(data, { estimatedServiceDeliveryTime: '1-3 days' })
  //   console.log(data)
  //   window[Symbol.for('map.worker')].postMessage({ action: 'put', store: 'lit', key, data })
  // }
}

events.forEach(event => container.addEventListener(event, catchEvent))

const mapComponent = new DgtekMap({
  container: document.getElementById('container-for-map')
})

// events.forEach(event => window[Symbol.for('map.worker')].addEventListener(event, catchEvent))

// mapComponent.getLIT()
// mapComponent.getFootprint()

mapComponent.getBuildingsList('other')

mapComponent.getBuildingsData('soon')

mapComponent.getBuildingDataById('5faffb5a227ca1003434e184')

// window[Symbol.for('map.worker')].addEventListener('building-data-list', function (event) {
//   console.log('WORKER EVENT:\n', event)
// })

window[Symbol.for('map.worker')].postMessage({ action: 'data', key: 'build' })

// mapComponent.getBuildingDataByAddress('105 COLLINS ST, MELBOURNE VIC 3000')
