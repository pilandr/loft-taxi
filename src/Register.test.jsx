import React from "react";
import { RegisterWithAuth } from "./Register";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

describe("Register", () => {
  it("renders form", () => {

    const mockStore = {
      getState: () => ({ auth: { isLoggedIn: false } }),
      subscribe: () => { },
      dispatch: () => { }
    }

    const history = createMemoryHistory();

    const { getByLabelText } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <RegisterWithAuth />
        </Provider>
      </Router>
    );
    expect(getByLabelText("Email*")).toHaveAttribute("name", "email");
    expect(getByLabelText("Как вас зовут?*")).toHaveAttribute("name", "username");
    expect(getByLabelText("Придумайте пароль*")).toHaveAttribute("name", "password");
  });
});
