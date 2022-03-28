import React from "react";
import { MapStore } from "./Map";
import { render, screen } from "@testing-library/react";
import mapbox from "mapbox-gl";
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

jest.mock("mapbox-gl", () => ({
  Map: jest.fn(() => ({ remove: () => {} })),
}));

describe("Map", () => {
  it("renders correctly map", () => {

    const mockStore = {
      getState: () => ({ auth: { 
                                isLoggedIn: true,
                                card: {},
                                addresses: [],
                                routes: []
                              } }),
      subscribe: () => { },
      dispatch: () => { }
    }

    const history = createMemoryHistory();

    const { getByTestId } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <MapStore />
        </Provider>
      </Router>
    );

    expect(mapbox.Map).toHaveBeenCalledWith({
      center: [30.3056504, 59.9429126],
      container: getByTestId('map'),
      style: "mapbox://styles/mapbox/light-v10",
      zoom: 10,
    });
  });

  it("render correctly window without card data", () => {
    const mockStore = {
      getState: () => ({ auth: { 
                                isLoggedIn: true,
                                card: {},
                                addresses: [],
                                routes: []
                              } }),
      subscribe: () => { },
      dispatch: () => { }
    }

    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <MapStore />
        </Provider>
      </Router>
    );
      expect(getByText("Платежные данные не заполнены")).toBeInTheDocument()
  });

  it("render correctly window with card data but not ordered", () => {
    const mockStore = {
      getState: () => ({ auth: { 
                                isLoggedIn: true,
                                card: {
                                  cardName: "",
                                  cardNumber: "",
                                  expiryDate: "",
                                  cvc: "",
                                updated: false},
                                addresses: [],
                              } }),
      subscribe: () => { },
      dispatch: () => { }
    }

    const history = createMemoryHistory();

    const { getByDisplayValue } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <MapStore />
        </Provider>
      </Router>
    );
      expect(getByDisplayValue("Заказать")).toBeInTheDocument()
  });

  it("render correctly window with card data and ordered", () => {
    const mockStore = {
      getState: () => ({ auth: { 
                                isLoggedIn: true,
                                card: {
                                  cardName: "",
                                  cardNumber: "",
                                  expiryDate: "",
                                  cvc: "",
                                updated: false},
                                addresses: [],
                                routes: []
                              } }),
      subscribe: () => { },
      dispatch: () => { }
    }

    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <MapStore />
        </Provider>
      </Router>
    );
      expect(getByText("Сделать новый заказ")).toBeInTheDocument()
  });
});

