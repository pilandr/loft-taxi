import { SAVE_ADDRESS_LIST } from "../../actions"


const initialState = {
  addresses: []
}

export default function foo(state = initialState, action) {
  switch (action.type) {
    case SAVE_ADDRESS_LIST: {
      return {
        ...state,
        addresses: action.payload
      }
    }
    default: {
      return state
    }
  }
}