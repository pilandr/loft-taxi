import { SAVE_TO_STORE_CARD, CARD_UPDATED_TO_FALSE_STORE } from '../../actions';

const initialState = {
  card: {
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    updated: false
  }
};

export default function foo(state = initialState, action) {
  switch (action.type) {
  case SAVE_TO_STORE_CARD: {
    return { 
      ...state,
      card: {
        cardName: action.payload.cardName,
        cardNumber: action.payload.cardNumber,
        expiryDate: action.payload.expiryDate,
        cvc: action.payload.cvc,
        updated: true
      } };
  }
  case CARD_UPDATED_TO_FALSE_STORE: {
    return {
      ...state,
      card: {
        ...state.card,
        updated: false
      }
    };
  }
  default: {
    return state;
  }
  }
}