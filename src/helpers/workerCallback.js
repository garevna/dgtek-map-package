import { polygonSearch, emitEvent } from './'
import { buildingTypes } from '../configs'

const getMarker = (type) => buildingTypes[type] ? buildingTypes[type].marker : null

const responseEvents = {
  list: 'list',
  getById: 'get-by-id',
  getByAddress: 'get-by-address',
  put: 'put',
  post: 'post'
}

export const workerCallback = function (event) {
  const marker = window[Symbol.for('map.marker')]
  const { status, store, action, key, result } = event.data

  if (status === 300) return console.log(event.data)

  if (responseEvents[action]) return emitEvent (responseEvents[action], { status, store, key, result })

  if (action === 'search') {
    Object.assign(window[Symbol.for('map.searchResult')], {
      buildingId: null,
      status: null
    })
    if (status === 200) {
      marker.setIcon(getMarker(store))
      marker.visible = true
      Object.assign(window[Symbol.for('map.searchResult')], {
        buildingId: result._id,
        status: buildingTypes[store].status
      })
      emitEvent(buildingTypes[store].event, window[Symbol.for('map.searchResult')])
    } else polygonSearch.bind(this)()
  }
}
