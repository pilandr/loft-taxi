import { takeEvery, call, put } from 'redux-saga/effects'
import { REGISTER, logIn } from '../actions'
import { serverRegister } from '../api';

export function* registerSaga(action) {
  const { email, password, name, surname } = action.payload;
  const { success, token } = yield call(serverRegister, email, password, name, surname)
  if (success) {
    yield put(logIn())
    localStorage.setItem("token", token);
  }
}

export function* registrationSaga() {
  yield takeEvery(REGISTER, registerSaga)
}