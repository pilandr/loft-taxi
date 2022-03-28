import { takeEvery, put } from 'redux-saga/effects'
import { LOG_OUT_SAGA, logOut} from '../../store/actions'

export function* sagaLogOutFunc(action) {
    yield put(logOut())
    localStorage.removeItem("token");
}

export function* sagaLogOut() {
  yield takeEvery(LOG_OUT_SAGA, sagaLogOutFunc)
}