import { takeEvery, call, put } from 'redux-saga/effects'
import { GET_ROUTE_SAGA, getRoute } from '../actions'
import { getRouteServer } from '../api';

export const drawRoute = (map, coordinates) => {
  console.log(map);
  console.log(coordinates);
  try {
    if (map.getLayer("route")) {
      map.removeLayer("route");
    }
    if (map.getSource("route")) {
      map.removeSource("route");
    }
  }
  catch(err) {
    console.log("Error!");
  }
  map.flyTo({
    center: coordinates[0],
    zoom: 15
  });
  map.addLayer({
    id: "route",
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates
        }
      }
    },
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": "#ffc617",
      "line-width": 8
    }
  });
};

export function* getRouteSaga(action) {
  const routesServer = yield call(getRouteServer, action.payload.address1, action.payload.address2)
  if (routesServer.success) {
    yield call(drawRoute, action.payload.map, routesServer.route)
    if (0) yield put(getRoute(routesServer.route))
  }
}

export function* routeSaga() {
  yield takeEvery(GET_ROUTE_SAGA, getRouteSaga)
}