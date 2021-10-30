import { logIn, saveToStoreCard } from "./actions";
import { serverLogin, updateCard, getCard } from "./api";
import { AUTHENTICATE, SAVE_CARD, GET_CARD} from "./actions";

export const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === AUTHENTICATE){
    const { email, password } = action.payload;
    const { success, token }  = await serverLogin(email, password);
    if (success){
      store.dispatch(logIn());
      localStorage.setItem("token", token);
    }
  } else{
    next(action)
  }
}

export const cardMiddleware = (store) => (next) => async (action) => {
  if (action.type === SAVE_CARD) {
    const token = localStorage.getItem("token");
    const { cardName, cardNumber, expiryDate, cvc } = action.payload;
    const success = await updateCard(
      cardNumber,
      expiryDate,
      cardName,
      cvc,
      token
    );
    if (success) {
      store.dispatch(saveToStoreCard({
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cardName: cardName,
        cvc: cvc,
      }));
    }
  } else if (action.type === GET_CARD) {
    const token = localStorage.getItem("token");
    const { cardNumber, expiryDate, cardName, cvc, success } = await getCard(
      token
    );
    if (success) {
      store.dispatch(
        saveToStoreCard({
          cardNumber: cardNumber,
          expiryDate: expiryDate,
          cardName: cardName,
          cvc: cvc,
        })
      );
    }
  } else {
    next(action);
  }
};