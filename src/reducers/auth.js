import { LOG_IN, LOG_OUT, SAVE_TO_STORE_CARD } from "../actions"

const token = localStorage.getItem("token");

const initialState = {
  isLoggedIn: token ? true : false,
  card: {
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: ""
  }
}

export default function foo(state = initialState, action) {
  switch (action.type) {
    case LOG_IN: {
      return { isLoggedIn: true }
    }
    case LOG_OUT: {
      return { isLoggedIn: false }
    }
    case SAVE_TO_STORE_CARD: {
      return { 
        ...state,
        card: {
          cardName: action.payload.cardName,
          cardNumber: action.payload.cardNumber,
          expiryDate: action.payload.expiryDate,
          cvc: action.payload.cvc
      } }
    }
    default: {
      return state
    }
  }
}