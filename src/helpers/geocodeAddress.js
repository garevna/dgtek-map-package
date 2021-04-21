import { GEOSCAPE_API_KEY } from '../../env'

export const geocodeAddress = async function (addressId) {
  const response = await (await fetch(`https://api.psma.com.au/v1/addresses/${addressId}?include=geo,addressDetails`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: GEOSCAPE_API_KEY
    }
  })).json()

  console.log(response)

  const result = {
    coordinates: response.geo.geometry.coordinates,
    address: response.addressDetails.formattedAddress,
    addressComponents: {
      city: response.addressDetails.localityName,
      number: response.addressDetails.streetNumber1,
      postCode: response.addressDetails.postcode,
      state: response.addressDetails.stateTerritory,
      street: response.addressDetails.streetName,
      streetType: response.addressDetails.streetType,
      siteName: response.addressDetails.siteName,
      cadastralIdentifier: response.addressDetails.cadastralIdentifier
    }
  }

  console.log(result)

  Object.assign(window[Symbol.for('map.searchResult')], {
    address: result.address,
    coordinates: result.coordinates,
    addressComponents: Object.assign({}, result.addressComponents)
  })

  window[Symbol.for('map.worker')].postMessage({
    action: 'search',
    key: response.addressDetails.formattedAddress
  })

  window[Symbol.for('map.marker')].setPosition({ lat: result.coordinates[1], lng: result.coordinates[0] })
  window[Symbol.for('map.marker')].visible = true
  window[Symbol.for('map.instance')].map.panTo({ lat: result.coordinates[1], lng: result.coordinates[0] })
  window[Symbol.for('map.instance')].map.setZoom(15)

  return {
    status: 200,
    result
  }
}
