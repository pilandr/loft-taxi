import { fork, all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { paymentSaga } from "./paymentSaga";
import { registrationSaga } from "./registrationSaga";
import { addressListSaga } from "./addressListSaga";
import { routeSaga } from "./routeSaga";

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(paymentSaga),
    fork(registrationSaga),
    fork(addressListSaga),
    fork(routeSaga)
  ]);
}