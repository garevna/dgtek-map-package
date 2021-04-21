import {
  getBuildingsList,
  storeBuildings,
  getBuildingDataByAddress,
  searchBuilding
} from '../helpers'

import {
  getBuildingDataById,
  postBuildingData,
  putBuildingData
} from '../helpers/AJAX'

import { host, apiKey } from '../configs'

class BuildingsController {
  setBuildingsHostURL (request) {
    self.postMessage(host(request.data))
  }

  setBuildingsApiKey (request) {
    self.postMessage(apiKey(request.data))
  }

  async storeBuildings () {
    self.postMessage(await storeBuildings())
  }

  async getBuildingsList (request) {
    self.postMessage(await getBuildingsList(request.key))
  }

  async searchBuilding (request) {
    self.postMessage(await searchBuilding(request.key))
  }

  async getBuildingDataById (request) {
    self.postMessage(await getBuildingDataById(request.key))
  }

  async getBuildingDataByAddress (request) {
    self.postMessage(await getBuildingDataByAddress(request.key))
  }

  async putBuildingData (request) {
    self.postMessage(await putBuildingData(request.key, request.data))
  }

  async postBuildingData (request) {
    self.postMessage(await postBuildingData(request.data))
  }
}

export const buildingsController = new BuildingsController()
