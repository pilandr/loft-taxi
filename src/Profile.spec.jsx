import React from "react";
import { ProfileWithAuth } from "./Profile";
import { render } from "@testing-library/react";
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

describe("Profile", () => {

  it("renders correctly", () => {

    const mockStore = {
      getState: () => ({
        auth: {
          isLoggedIn: true,
          card: {
            cardName: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            updated: false
          }
        }
      }),
      subscribe: () => { },
      dispatch: () => { }
    }

    const history = createMemoryHistory();

    const { getByLabelText } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <ProfileWithAuth />
        </Provider>
      </Router>
    );
    expect(getByLabelText("Имя владельца")).toHaveAttribute("name", "name");
    expect(getByLabelText("Номер карты")).toHaveAttribute("name", "number");
    expect(getByLabelText("MM/YY")).toHaveAttribute("name", "date");
    expect(getByLabelText("CVC")).toHaveAttribute("name", "cvc");
  });
});