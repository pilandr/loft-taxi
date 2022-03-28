import { GET_ROUTE, NOT_ROUTE } from "../../actions"

const initialState = {
  routes: false
}

export default function foo(state = initialState, action) {
  switch (action.type) {
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