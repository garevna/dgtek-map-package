import {
  // mapConfig,
  mapContainerStyle,
  polygonTypes,
  litMarker,
  footprintMarker,
  buildMarker,
  soonMarker,
  notAvailableMarker,
  options
} from './configs'

import {
  createMap,
  // createAutocomplit,
  createInput,
  workerCallback,
  getBuildingDataByAddress,
  getBuildingDataById,
  geocodeAddress
} from './helpers'

const types = Object.keys(polygonTypes)

class DgtekMap {
  constructor (options) {
    window[Symbol.for('map.worker')].postMessage({ action: 'init' })
    window[Symbol.for('map.instance')] = this

    window[Symbol.for('map.searchResult')] = {
      buildingId: null,
      address: null,
      status: null,
      addressComponents: null
    }

    this.options = {}
    if (options.container) {
      for (const option in options) {
        if (option === 'container') {
          this.container = options.container.nodeType === 1 ? options.container : this.options.container
        } else this.options[option] = options[option]
      }
    }

    window[Symbol.for('map.container')] = this.container

    this.worker = window[Symbol.for('map.worker')]
    this.worker.addEventListener('message', workerCallback)

    this.mapContainer = this.container.appendChild(document.createElement('div'))
    this.mapContainer.style = mapContainerStyle

    types.forEach((type) => { this[type] = [] })

    const { status, result } = this.createMapInstance()
  }

  async createMapInstance () {
    const { status, result } = await createMap()
    if (status !== 200) return { status, result }

    Object.keys(result).forEach(polygonType => { this[polygonType] = result[polygonType] })

    createInput(this.container)

    this.container.addEventListener('address-selected', function (event) {
      geocodeAddress(event.data.id)
    })

    return { status: 200, result: 'Success' }
  }
}

const methods = require('./helpers/methods')
Object.keys(methods).forEach(method => { DgtekMap.prototype[method] = methods[method] })

DgtekMap.prototype.options = options

export default DgtekMap
