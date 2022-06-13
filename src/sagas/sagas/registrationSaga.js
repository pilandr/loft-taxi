import { takeEvery, call, put } from 'redux-saga/effects';
import { REGISTER, logIn, errorRegister } from '../../store/actions';
import { serverRegister } from '../../Api';

export function* registerSaga(action) {
  const { email, password, name, surname } = action.payload;
  const { success, token, error } = yield call(serverRegister, email, password, name, surname);
  if (success) {
    yield put(logIn());
    localStorage.setItem('token', token);
  } else {
    yield put(errorRegister(error));
  }
}

export function* registrationSaga() {
  yield takeEvery(REGISTER, registerSaga);
}