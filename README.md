# DGTek-map
__________________
## How to install

```
yarn add dgtek-map && mv node_modules/dgtek-map/dist/map.worker.js public
```
or
```
npm install dgtek-map && mv node_modules/dgtek-map/dist/map.worker.js public
```

## How to use
__________________________

#### Import package:
```js
import DgtekMap from 'dgtek-map'
```

#### Start web-worker

###### `initWorker.js`:
```js
window[Symbol.for('map.worker')] = new Worker('dgtek-map/dist/map.worker.js')
```


#### Create container for map with id "container-for-map" and stylize it as you need:

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
> This container will receive events

| event type | description |
|-|-|
| Selected address events | Selected building is: |
| **on-net** | on-net |
| **footprint** | in the footprint |
| **construction-commenced** | under construction |
| **coming-soon** | coming soon |
| **not-available** | N/A |
| Other events | |
| **list** | Get the list of addresses from buildings DB |
|  **submit-address**  | User pressed the button SUBMIT |
|  **get-by-id**  | Get building description by id |
|  **get-by-address**  | Get building description by address |

#### Set event handler:

```js
const events = [
  'on-net',
  'footprint',
  'construction-commenced',
  'coming-soon',
  'not-available',
  'list',
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

> You should write your own code for `catchEvent`

#### Now you are ready to get started

```
const map = new DGtekMap({
  container,
  center: { lat: -37.8357725, lng: 144.9738764 }
})
```

#### Methods

```
setHost (data)  // change default host url

setApiKey (data) // change default api key

getLIT () // get list of 'on-net' buildings

getFootprint () // get list of 'footprint' buildings

getBuildingDataById (buildingId) // get full description of building by it's id

getBuildingDataByAddress (address) // get full description of building by it's address

postBuildingData (buildingData) // save new building

putBuildingData (buildingId, buildingData) // update existing building data
```

_________________________________________

> ...
> Additional (not important)

> You are able to catch the messages from the worker directly as an alternative to event handling:

```js
window[Symbol.for('map.worker')].onmessage = function (event) {
  console.log('Out of package:\n', event.data)
}
```
>> `but you don't need this`

> You can send requests directly to the worker

>> Search for address:

```js
window[Symbol.for('map.worker')].postMessage({
  action: 'search',
  store: 'lit',
  key: '81 Cecil St, South Melbourne VIC 3205, Australia'
})
```

>> `but we don't recomend to do this`
