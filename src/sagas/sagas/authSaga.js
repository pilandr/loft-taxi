import { takeEvery, call, put } from 'redux-saga/effects'
import { AUTHENTICATE, logIn, addressList, errorPassword } from '../../store/actions'
import { serverLogin } from '../../Api';

export function* authenticateSaga(action) {
  const { email, password} = action.payload;
  const { success, token } = yield call(serverLogin, email, password)
  if (success) {
    yield put(logIn())
    localStorage.setItem("token", token);
    yield call(addressList);
  } else {
    yield put(errorPassword());
  }
}

export function* authSaga() {
  yield takeEvery(AUTHENTICATE, authenticateSaga)
}