import { registerSaga } from "./registrationSaga";
import { register } from "../actions";
import { recordSaga } from "./recordSaga";

jest.mock("../api", () => {
  const original = jest.requireActual("../api"); 
  return {
      ...original,
      serverRegister:() => ({ success: true, token: "token2" }),
  };
});

describe("registrationSaga", () => {
    it("#REGISTER", async () => {
      const dispatched = await recordSaga(
        registerSaga,
        register("test@test.com", "123123", "nameReg")
      );
      expect(dispatched).toEqual([
        {
          type: "LOG_IN"
        }
      ]);
    });
});
