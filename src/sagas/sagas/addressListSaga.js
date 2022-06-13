import { takeEvery, call, put } from 'redux-saga/effects';
import { ADDRESS_LIST, saveAddressList } from '../../store/actions';
import { getAddresses } from '../../Api';

export function* addressesSaga(action) {
  const { success, addresses } = yield call(getAddresses);
  if (success) {
    yield put(saveAddressList(addresses));
  }
}

export function* addressListSaga() {
  yield takeEvery(ADDRESS_LIST, addressesSaga);
}