
import { routeDrawSaga} from "./routeSaga";
import { getRouteSaga } from "../actions";
import { recordSaga } from "./recordSaga";

jest.mock("../api", () => {
  const original = jest.requireActual("../api"); 
  return {
      ...original,
      getRouteServer:() => ({ success: true, route: "routeFromServer" }),
  };
});

const mockMap = {
  flyTo : () => {},
  addSource: () => {},
  addLayer: () => {},
}

describe("routeSaga", () => {
    it("#GET_ROUTE_SAGA", async () => {
      const dispatched = await recordSaga(
        routeDrawSaga,
        getRouteSaga("address1Server", "address1Server", mockMap)
      );
      expect(dispatched).toEqual([
        {
          type: "GET_ROUTE"
        }
      ]);
    });
});
