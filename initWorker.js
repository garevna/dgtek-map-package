// import { GOOGLE_MAPS_API_KEY, BUILDINGS_API_URL } from './env.js'

window[Symbol.for('map.worker')] = new Worker('dist/map.worker.js')

// const host = process.env.BUILDINGS_API_URL.toString()
// const key = process.env.GOOGLE_MAPS_API_KEY.toString()
