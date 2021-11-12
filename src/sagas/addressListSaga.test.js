import { addressesSaga } from "./addressListSaga";
import { addressList } from "../actions";
import { recordSaga } from "./recordSaga";

jest.mock("../api", () => ({ getAddresses: () => ({ success: true, addresses: [1, 2] }) }));

describe("addressesSaga", () => {
  describe("#ADDRESS_LIST", () => {
    it("addresses through api", async () => {
      const dispatched = await recordSaga(
        addressesSaga,
        addressList()
      );
      expect(dispatched).toEqual([
        {
          type: "SAVE_ADDRESS_LIST", payload: [1, 2]
        }
      ]);
    });
  });
});
