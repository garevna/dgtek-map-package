import {
  litMarker,
  footprintMarker,
  buildMarker,
  soonMarker,
  notAvailableMarker
} from './markers'

export const buildingTypes = {
  lit: {
    status: 'LIT',
    event: 'on-net',
    marker: litMarker
  },
  footprint: {
    status: 'Footprint',
    event: 'footprint',
    marker: footprintMarker
  },
  build: {
    status: 'UnderConstruction',
    event: 'construction-commenced',
    marker: buildMarker
  },
  soon: {
    status: 'ComingSoon',
    event: 'coming-soon',
    marker: soonMarker
  },
  other: {
    status: 'Other',
    event: 'not-available',
    marker: notAvailableMarker
  }
}

export const polygonTypes = {
  ServiceAvailable: {
    status: 'Footprint',
    event: 'footprint',
    color: '#A00E0D',
    marker: footprintMarker
  },
  BuildCommenced: {
    status: 'UnderConstruction',
    event: 'construction-commenced',
    color: '#000000',
    marker: buildMarker
  },
  ComingSoon: {
    status: 'ComingSoon',
    event: 'coming-soon',
    color: '#ffff9990',
    marker: soonMarker
  }
}

// export const polygonTypes = {
//   available: {
//     name: 'ServiceAvailable',
//     color: '#A00E0D',
//     marker: footprintMarker
//   },
//   build: {
//     name: 'BuildCommenced',
//     color: '#000000',
//     marker: buildMarker
//   },
//   soon: {
//     name: 'ComingSoon',
//     color: '#ffff9990',
//     marker: soonMarker
//   }
// }
