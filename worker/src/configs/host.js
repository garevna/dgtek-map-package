export const host = (function () {
  let hostURL = 'https://dgtek-staging.herokuapp.com'
  return function (url) {
    if (url) {
      hostURL = url
    } else return hostURL
  }
})()
