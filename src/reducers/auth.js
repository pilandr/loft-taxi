import { LOG_IN, LOG_OUT, SAVE_TO_STORE_CARD, CARD_UPDATED_TO_FALSE_STORE, SAVE_ADDRESS_LIST, GET_ROUTE, NOT_ROUTE } from "../actions"

const token = localStorage.getItem("token");

const initialState = {
  isLoggedIn: token ? true : false,
  card: {
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    updated: false
  },
  routes: false,
  addresses: []
}

export default function foo(state = initialState, action) {
  switch (action.type) {
    case LOG_IN: {
      return { 
        ...state,
        isLoggedIn: true 
      }
    }
    case LOG_OUT: {
      return { 
        ...state,
        isLoggedIn: false 
      }
    }
    case SAVE_TO_STORE_CARD: {
      return { 
        ...state,
        card: {
          cardName: action.payload.cardName,
          cardNumber: action.payload.cardNumber,
          expiryDate: action.payload.expiryDate,
          cvc: action.payload.cvc,
          updated: true
      } }
    }
    case CARD_UPDATED_TO_FALSE_STORE: {
      return {
        ...state,
        card: {
          ...state.card,
          updated: false
        }
      }
    }
    case SAVE_ADDRESS_LIST: {
      return {
        ...state,
        addresses: action.payload
      }
    }
    case GET_ROUTE: {
      return {
        ...state,
        routes: true
      }
    }
    case NOT_ROUTE: {
      return {
        ...state,
        routes: false
      }
    }
    default: {
      return state
    }
  }
}