export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const AUTHENTICATE = 'AUTHENTICATE'

export const SAVE_CARD = "SAVE_CARD"; // action for middleware
export const GET_CARD = "GET_CARD"; // action for middleware
export const SAVE_TO_STORE_CARD = "SAVE_TO_STORE_CARD"; 
// export const GET_FROMCARD_DATA = "GET_CARD_DATA";

export const logIn = () => ({ type: LOG_IN })
export const logOut = () => ({ type: LOG_OUT })
export const authenticate = (email, password) => ({ type: AUTHENTICATE, payload: { email, password} })


export const saveCard = (card) => ({ type: SAVE_CARD, payload: { cardNumber: card.cardNumber, expiryDate: card.expiryDate, cardName: card.cardName, cvc: card.cvc }  })
export const getCard = () => ({ type: GET_CARD })
export const saveToStoreCard = (card) => ({ type: SAVE_TO_STORE_CARD, payload: { cardNumber: card.cardNumber, expiryDate: card.expiryDate, cardName: card.cardName, cvc: card.cvc } })
// export const getCardData = () => ({ type: GET_CARD_DATA })

