import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_ROUTE_SAGA, getRoute } from '../../store/actions';
import { getRouteServer } from '../../Api';



export function* routeDrawSaga(action) {
  const routesServer = yield call(getRouteServer, action.payload.address1, action.payload.address2);
  if (routesServer.success) {
    yield call(action.payload.draw, routesServer.route);
    yield put(getRoute());
  }
}

export function* routeSaga() {
  yield takeEvery(GET_ROUTE_SAGA, routeDrawSaga);
}