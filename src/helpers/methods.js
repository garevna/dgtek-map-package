export const setHost = function (data) {
  window[Symbol.for('map.worker')].postMessage({ action: 'host', data })
}

export const setApiKey = function (data) {
  window[Symbol.for('map.worker')].postMessage({ action: 'key', data })
}

export const getLIT = function () {
  window[Symbol.for('map.worker')].postMessage({
    action: 'list',
    key: 'lit'
  })
}

export const getFootprint = function () {
  window[Symbol.for('map.worker')].postMessage({
    action: 'list',
    key: 'footprint'
  })
}

export const getBuildingDataById = function (buildingId) {
  window[Symbol.for('map.worker')].postMessage({
    action: 'getById',
    key: buildingId
  })
}
export const getBuildingDataByAddress = function (address) {
  window[Symbol.for('map.worker')].postMessage({
    action: 'getByAddress',
    key: address
  })
}

export const postBuildingData = function (buildingData) {
  window[Symbol.for('map.worker')].postMessage({
    action: 'post',
    data: buildingData
  })
}

export const putBuildingData = function (buildingId, data) {
  window[Symbol.for('map.worker')].postMessage({
    action: 'put',
    key: buildingId,
    data
  })
}
