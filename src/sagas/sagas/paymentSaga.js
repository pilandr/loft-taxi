import { takeEvery, call, put } from 'redux-saga/effects'
import { SAVE_CARD, GET_CARD, saveToStoreCard,CARD_UPDATED_TO_FALSE, cardUpdatedToFalseStore } from '../../store/actions'
import { updateCard, getCard } from '../../Api';

export function* saveCardSaga(action) {
  const token = localStorage.getItem("token");
    const { cardName, cardNumber, expiryDate, cvc } = action.payload;
    const success = yield call(updateCard,
      cardNumber,
      expiryDate,
      cardName,
      cvc,
      token
    );
    if (success) {
      yield put(saveToStoreCard({
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cardName: cardName,
        cvc: cvc,
      }))
    }
}

export function* getCardSaga(action) {
  const token = localStorage.getItem("token");
    const { cardNumber, expiryDate, cardName, cvc, success } = yield call(getCard, token);
    if (success) {
      yield put(saveToStoreCard({
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cardName: cardName,
        cvc: cvc,
      }))
    }
}

export function* cardUpdatedToFalseSaga(action) {
      yield put(cardUpdatedToFalseStore())
}


export function* paymentSaga() {
  yield takeEvery(SAVE_CARD, saveCardSaga);
  yield takeEvery(GET_CARD, getCardSaga);
  yield takeEvery(CARD_UPDATED_TO_FALSE, cardUpdatedToFalseSaga);
}