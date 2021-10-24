import { logIn } from "./actions";
import { serverLogin } from "./api";
import { AUTHENTICATE} from "./actions";

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

// export const cardMiddleware = (store) => (next) => async (action) => {
//   if (action.type === SAVE_CARD) {
//     const { cardNumber, expiryDate, cardName, cvc, token } = action.payload;
//     const success = await updateCard(
//       cardNumber.value,
//       expiryDate.value,
//       cardName.value,
//       cvc.value,
//       token
//     );
//     if (success) {
//       store.dispatch(showUpdatedCard());
//     }
//   } else if (action.type === GET_CARD) {
//     const token = localStorage.getItem("token");
//     const { cardNumber, expiryDate, cardName, cvc, success } = await getCard(
//       token
//     );
//     if (success) {
//       store.dispatch(
//         getCardData({
//           cardNumber: cardNumber,
//           expiryDate: expiryDate,
//           cardName: cardName,
//           cvc: cvc,
//         })
//       );
//     }
//   } else {
//     next(action);
//   }
// };