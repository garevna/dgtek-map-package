import { buildingTypes, polygonTypes, notAvailableMarker } from '../configs'
import { emitEvent } from './'

const types = Object.keys(polygonTypes)
const getEvent = type => polygonTypes[type] ? polygonTypes[type].event : null
const getMarker = (type) => polygonTypes[type] ? polygonTypes[type].marker : null

export const polygonSearch = function () {
  const [instance, place, marker, result] = [
    window[Symbol.for('map.instance')],
    window[Symbol.for('map.place')],
    window[Symbol.for('map.marker')],
    window[Symbol.for('map.searchResult')]
  ]

  const [lng, lat] = window[Symbol.for('map.searchResult')].coordinates

  const latLng = new google.maps.LatLng(lat, lng)

  marker.visible = true

  for (const type of types) {
    for (const polygon of instance[type]) {
      if (window.google.maps.geometry.poly.containsLocation(latLng, polygon)) {
        marker.setIcon(getMarker(type))
        result.status = polygonTypes[type].status
        emitEvent (polygonTypes[type].event, result)
        break
      }
    }
  }
  if (result.status) return emitEvent (result.status, result)
  marker.setIcon(notAvailableMarker)
  result.status = 'Other'
  window[Symbol.for('map.searchResult')].status = 'Other'
  emitEvent ('not-available', result)
}
