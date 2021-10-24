export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const AUTHENTICATE = 'AUTHENTICATE'

// export const SAVE_CARD = "SAVE_CARD";
// export const GET_CARD = "GET_CARD";
// export const SHOW_UPDATED_CARD = "SHOW_UPDATED_CARD";
// export const GET_CARD_DATA = "GET_CARD_DATA";

export const logIn = () => ({ type: LOG_IN })
export const logOut = () => ({ type: LOG_OUT })
export const authenticate = (email, password) => ({ type: AUTHENTICATE, payload: { email, password} })

// export const showUpdatedCard = () => ({ type: SHOW_UPDATED_CARD })
// export const saveCard = () => ({ type: SAVE_CARD })
// export const getCard = () => ({ type: GET_CARD })
// export const getCardData = () => ({ type: GET_CARD_DATA })

