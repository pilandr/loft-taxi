import { fork, all } from "redux-saga/effects";
import { authSaga } from "./sagas/authSaga";
import { paymentSaga } from "./sagas/paymentSaga";
import { registrationSaga } from "./sagas/registrationSaga";
import { addressListSaga } from "./sagas/addressListSaga";
import { routeSaga } from "./sagas/routeSaga";
import { sagaLogOut } from "./sagas/logoutSaga";

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(paymentSaga),
    fork(registrationSaga),
    fork(addressListSaga),
    fork(routeSaga),
    fork(sagaLogOut)
  ]);
}