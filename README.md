# dgtek-map
__________________

## :clipboard: Installation

```
yarn add dgtek-map && mv node_modules/dgtek-map/dist/map.worker.js public
```
or
```
npm install dgtek-map && mv node_modules/dgtek-map/dist/map.worker.js public
```

## :clipboard: How to use
__________________________

#### Import package:
```js
import DgtekMap from 'dgtek-map'
```

#### Start web-worker

###### `initWorker.js`:

If your app starts from root folder:

```js
window[Symbol.for('map.worker')] = new Worker('map.worker.js')
```

If your app starts from subfolder (for example `https://example.com/app/`):

```js
window[Symbol.for('map.worker')] = new Worker('/app/map.worker.js')
```

### :memo: Work with map

Create container for map with id "container-for-map" and stylize it as you need:

```html
<style>
  #container-for-map {
    position: relative;
    width: 70%;
    height: 70vh;
    margin: auto;
  }
</style>
<main>
  <figure id="container-for-map"></figure>
</main>

<script src="initWorker.js"></script>
<script src="dist/main.js"></script>
```

#### :clipboard: Get started

```js
const map = new DGtekMap({
  container,
  center: { lat: -37.8357725, lng: 144.9738764 }
})
```

> Map container will receive events

### :page_with_curl: Events

#### :point_right: Selected address events

| event type | description |
|-|-|
|  | Selected building is: |
| **`on-net`** | <sup>on-net</sup> |
| **`footprint`** | <sup>in the footprint</sup> |
| **`construction-commenced`** | <sup>under construction</sup> |
| **`coming-soon`** | <sup>coming soon</sup> |
| **`not-available`** | <sup>N/A</sup> |

#### :point_right: List events

The array of results from the collection of buildings DB received

| event type | description |
|-|-|
| **`buildings-address-list`** | <sup>The list of addresses</sup> |
| **`buildings-data-list`** | <sup>The list of base data (`{ id, address, addressComponents }`)</sup> |

#### :point_right: Search events

| event type | description |
|-|-|
|  **`get-by-id`**  | <sup>Get building description by id</sup> |
|  **`get-by-address`**  | <sup>Get building description by address</sup> |

#### :point_right: UI events

| event type | description |
|-|-|
|  **`submit-address`**  | <sup>User pressed the button SUBMIT</sup> |


#### Event handler example:

```js
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
  'get-by-address'
]

const container = document.getElementById('container-for-map')
events.forEach(eventName => container.addEventListener(eventName, catchEvent))

function catchEvent (event) {
  console.group('Event handler outside package')
  console.log('Event type: ', event.type)
  console.log('Event data:\n', event.data)
  console.groupEnd('Event handler outside package')
}
```

> <sup>You should write your own code for `catchEvent`</sup>

________________________________

### :page_with_curl: Methods

• change default host url

```js
setHost (data)
```

• change default api key

```js
setApiKey (data)
```

• get list of building's addresses from collection

```js
getBuildingsList (collectionName)
```

• get list of building's data from collection

```js
getBuildingsData (collectionName)
```
> <sup>Building data: `{ id, address, addressComponents }`</sup>

> <sup>Collections: 'lit', 'footprint', 'build', 'soon', 'other'</sup>

• get list of 'on-net' buildings

```js
getLIT ()
```

• get list of 'footprint' buildings

```js
getFootprint ()
```

• get full description of building by it's id

```js
getBuildingDataById (buildingId)
```

• get full description of building by it's address

```js
getBuildingDataByAddress (address)
```

• save new building

```js
postBuildingData (buildingData)
```

• update existing building data

```js
putBuildingData (buildingId, buildingData)
```

_________________________________________

### Additional

:pushpin: You can catch events listed above on the worker' instance directly:

```js
events.forEach(event => window[Symbol.for('map.worker')].addEventListener(event, catchEvent))
```

:pushpin: You can send requests directly to the worker

☕ Search for address:

```js
window[Symbol.for('map.worker')].postMessage({
  action: 'search',
  store: 'lit',
  key: '81 Cecil St, South Melbourne VIC 3205, Australia'
})
```

☕ Get list of addresses:

```js
window[Symbol.for('map.worker')].postMessage({ action: 'list', key: 'build' })
```

☕ Get list of addresses:

```js
window[Symbol.for('map.worker')].postMessage({ action: 'data', key: 'soon' })
```
