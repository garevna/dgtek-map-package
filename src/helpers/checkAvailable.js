import { polygonTypes } from '../configs'

const types = Object.keys(polygonTypes)

export const checkAvailable = function () {
  types.forEach((type) => { this[type] = this.pointType === type })
  this.failure = !types.filter(type => this[type]).length
}
