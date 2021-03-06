export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_SAGA = 'LOG_OUT_SAGA';
export const AUTHENTICATE = 'AUTHENTICATE';

export const SAVE_CARD = 'SAVE_CARD';
export const GET_CARD = 'GET_CARD';
export const SAVE_TO_STORE_CARD = 'SAVE_TO_STORE_CARD';
export const CARD_UPDATED_TO_FALSE = 'CARD_UPDATED_TO_FALSE';
export const CARD_UPDATED_TO_FALSE_STORE = 'CARD_UPDATED_TO_FALSE_STORE';


export const REGISTER = 'REGISTER'; 
export const ADDRESS_LIST = 'ADDRESS_LIST'; 
export const SAVE_ADDRESS_LIST = 'SAVE_ADDRESS_LIST'; 
export const GET_ROUTE_SAGA = ' GET_ROUTE_SAGA'; 
export const GET_ROUTE = 'GET_ROUTE'; 
export const NOT_ROUTE = 'NOT_ROUTE'; 
export const ERROR_PASSWORD = 'ERROR_PASSWORD'; 
export const ERROR_REGISTER = 'ERROR_REGISTER'; 

export const logIn = () => ({ type: LOG_IN });
export const errorRegister = (error) => ({ type: ERROR_REGISTER, payload: error });
export const logOut = () => ({ type: LOG_OUT });
export const logOutSaga = () => ({ type: LOG_OUT_SAGA });
export const authenticate = (email, password) => ({ type: AUTHENTICATE, payload: { email, password} });
export const errorPassword = () => ({ type: ERROR_PASSWORD });


export const saveCard = (card) => ({ 
  type: SAVE_CARD, 
  payload: { cardNumber: card.cardNumber, expiryDate: card.expiryDate, cardName: card.cardName, cvc: card.cvc }  
});
export const getCard = () => ({ type: GET_CARD });
export const saveToStoreCard = (card) => ({
  type: SAVE_TO_STORE_CARD, 
  payload: { 
    cardNumber: card.cardNumber, 
    expiryDate: card.expiryDate, 
    cardName: card.cardName, 
    cvc: card.cvc 
  } 
});
export const cardUpdatedToFalse = () => ({ type: CARD_UPDATED_TO_FALSE });
export const cardUpdatedToFalseStore = () => ({ type: CARD_UPDATED_TO_FALSE_STORE });

export const register = (email, password, name) => ({ type: REGISTER, payload: { email, password, name, surname: ' '} });
export const addressList = () => ({ type: ADDRESS_LIST});
export const saveAddressList = (list) => ({ type: SAVE_ADDRESS_LIST, payload: list});

export const getRouteSaga = (address1, address2, draw) => ({ type: GET_ROUTE_SAGA, payload: { address1, address2, draw } });
export const getRoute = () => ({ type: GET_ROUTE });
export const notRoute = () => ({ type: NOT_ROUTE });



