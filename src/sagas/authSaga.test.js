import { authenticateSaga } from "./authSaga";
import { authenticate } from "../actions";
import { recordSaga } from "./recordSaga";

jest.mock("../api", () => {
  const original = jest.requireActual("../api"); 
  return {
      ...original,
      serverLogin:() => ({ success: true, token: "token1" }),
  };
});

describe("authSaga", () => {
  describe("#AUTHENTICATE", () => {
    it("authenticate through api", async () => {
      const dispatched = await recordSaga(
        authenticateSaga,
        authenticate("test@test.com", "123123")
      );
      expect(dispatched).toEqual([
        {
          type: "LOG_IN"
        }
      ]);
    });
  });
});
