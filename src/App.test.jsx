import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

jest.mock("./Login", () => ({ LoginWithAuth: () => <div>Login content</div> }));
jest.mock("./Map", () => ({ Map: () => <div>Map content</div> }));
jest.mock("./Profile", () => ({ ProfileWithAuth: () => <div>Profile content</div> }));
jest.mock("./Register", () => ({ Register: () => <div>Register content</div> }));

describe("App", () => {
  it("renders correctly", () => {

    const mockStore = {
      getState: () => ({ auth: { isLoggedIn: false } }),
      subscribe: () => { },
      dispatch: () => { }
    }

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <App />
        </Provider>
      </Router>
    );
    expect(container.innerHTML).toMatch("Login content");
  });
});