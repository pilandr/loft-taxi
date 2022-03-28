import { LOG_IN, LOG_OUT, ERROR_PASSWORD } from "../../actions"
const token = localStorage.getItem("token");

const initialState = {
  isLoggedIn: token ? true : false,
  errorPassword: false
}

export default function foo(state = initialState, action) {
  switch (action.type) {
    case LOG_IN: {
      return { 
        ...state,
        isLoggedIn: true,
        errorPassword: false
      }
    }
    case LOG_OUT: {
      return { 
        ...state,
        isLoggedIn: false 
      }
    }
    case ERROR_PASSWORD: {
      return { 
        ...state,
        errorPassword: true 
      }
    }
    default: {
      return state
    }
  }
}