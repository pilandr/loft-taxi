import React from "react";
import { LoginWithAuth } from "./Login";
import { render } from "@testing-library/react";
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

describe("Login", () => {
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
          <LoginWithAuth />
          </Provider>
        </Router>
      );
      expect(getByLabelText("Email")).toHaveAttribute("name", "email");
      expect(getByLabelText("Пароль")).toHaveAttribute("name", "password");
    });
});
