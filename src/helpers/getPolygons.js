import { polygonTypes } from '../configs'

const types = Object.keys(polygonTypes)

const getType = name => types.find(item => polygonTypes[item].name === name)
const getColor = (type) => polygonTypes[type] ? polygonTypes[type].color : null

export async function getPolygons () {
  const response = await fetch('https://dka.dgtek.net/api/frontend/polygons')
  if (response.status !== 200) return { status: response.status, result: 'Error reading polygons data' }

  let features = []
  try {
    features = (await response.json()).features
  } catch (err) {
    return { status: 422, result: 'Invalid polygons data structure' }
  }

  const polygons = Object.assign({}, ...types.map(type => ({ [type]: [] })))

  features.forEach((feature) => {
    const type = feature.properties.typeOf
    const coordinates = feature.geometry.coordinates[0].map(point => ({ lat: point[1], lng: point[0] }))
    const polygon = new window.google.maps.Polygon({
      paths: coordinates,
      fillColor: getColor(type),
      strokeColor: getColor(type),
      strokeWeight: 0.5,
      clickable: false,
    })
    polygons[type].push(polygon)
  })
  return { status: 200, result: polygons }
}
