const { buildingsController } = require('../controllers')

export const routes = {
  host: buildingsController.setBuildingsHostURL, /* host url in body */
  key: buildingsController.setBuildingsApiKey, /* api key in body */
  init: buildingsController.storeBuildings,
  list: buildingsController.getBuildingsList, /* by type */
  search: buildingsController.searchBuilding, /* by address */
  getById: buildingsController.getBuildingDataById,
  getByAddress: buildingsController.getBuildingDataByAddress,
  put: buildingsController.putBuildingData, /* by id only */
  post: buildingsController.postBuildingData
}
