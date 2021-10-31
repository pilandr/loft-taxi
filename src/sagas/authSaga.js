import { takeEvery, call, put } from 'redux-saga/effects'
import { AUTHENTICATE, logIn } from '../actions'
import { serverLogin } from '../api';

export function* authenticateSaga(action) {
  const { email, password, name, surname } = action.payload;
  const { success, token } = yield call(serverLogin, email, password, name, surname)
  if (success) {
    yield put(logIn())
    localStorage.setItem("token", token);
  }
}

export function* authSaga() {
  yield takeEvery(AUTHENTICATE, authenticateSaga)
}