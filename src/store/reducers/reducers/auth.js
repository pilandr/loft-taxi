import { LOG_IN, LOG_OUT, ERROR_PASSWORD, ERROR_REGISTER } from '../../actions';
const token = localStorage.getItem('token');

const initialState = {
  isLoggedIn: token ? true : false,
  errorPassword: false,
  errorRegister: ''
};

export default function foo(state = initialState, action) {
  switch (action.type) {
  case LOG_IN: {
    return { 
      ...state,
      isLoggedIn: true,
      errorPassword: false,
      errorRegister: ''
    };
  }
  case LOG_OUT: {
    return { 
      ...state,
      isLoggedIn: false, 
      errorRegister: ''
    };
  }
  case ERROR_PASSWORD: {
    return { 
      ...state,
      errorPassword: true, 
      errorRegister: ''
    };
  }
  case ERROR_REGISTER: {
    return { 
      ...state,
      errorPassword: true, 
      errorRegister: action.payload
    };
  }
  default: {
    return state;
  }
  }
}