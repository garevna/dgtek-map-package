import {
  mapConfig,
  polygonTypes,
  options
} from '../configs'

import { getPolygons, loadGoogleMapsScript } from './'

export const createMap = async function () {
  if (!await loadGoogleMapsScript()) return { status: 500, result: 'Error accessing Google Maps API' }

  const center = options.center && options.center.lat && options.center.lng
    ? new window.google.maps.LatLng(options.center.lat, options.center.lng)
    : new window.google.maps.LatLng(-37.87013628, 144.963058)

  window[Symbol.for('map.instance')].map = new window.google.maps.Map(window[Symbol.for('map.container')], {
    center,
    zoom: 13,
    styles: mapConfig,
    disableDefaultUI: true
  })

  const marker = new window.google.maps.Marker({
    position: center,
    map: window[Symbol.for('map.instance')].map,
    title: 'DGtek provisioning portal',
    icon: null
  })

  marker.visible = false

  window[Symbol.for('map.marker')] = marker

  const { status, result: polygons } = await getPolygons()

  if (status !== 200) return { status, result: polygons }

  Object.keys(polygonTypes).forEach((type) => {
    polygons[type].forEach(polygon => polygon.setMap(window[Symbol.for('map.instance')].map))
  })

  return { status: 200, result: polygons }
}
