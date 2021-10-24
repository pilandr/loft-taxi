import { LOG_IN, LOG_OUT } from "../actions"

const token = localStorage.getItem("token");

const initialState = {
  isLoggedIn: token ? true : false
}

export default function foo(state = initialState, action) {
  switch (action.type) {
    case LOG_IN: {
      return { isLoggedIn: true }
    }
    case LOG_OUT: {
      return { isLoggedIn: false }
    }
    default: {
      return state
    }
  }
}