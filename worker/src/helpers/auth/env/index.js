// import { secretHandler } from './secretHandler'
// import { hostHandler } from './hostHandler'
// import { apiKeyHandler } from './apiKeyHandler'

const apiKeyHandler = (function () {
  let apiKey = ''
  return function (value) {
    if (value) { apiKey = value } else return apiKey
  }
})()

const hostHandler = (function () {
  let host = ''
  return function (value) {
    if (value) { host = value } else return host
  }
})()

const secretHandler = (function () {
  let secret = ''
  return function (value) {
    if (!value) return secret
    secret = value
  }
})()

export {
  secretHandler,
  hostHandler,
  apiKeyHandler
}
