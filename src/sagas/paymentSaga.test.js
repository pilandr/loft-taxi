import { saveCardSaga, getCardSaga, cardUpdatedToFalseSaga } from "./paymentSaga";
import { saveCard, getCard, cardUpdatedToFalse } from "../actions";
import { recordSaga } from "./recordSaga";

jest.mock("../api", () => {
  const original = jest.requireActual("../api"); 
  return {
      ...original,
      updateCard:() => ( true ),
      getCard: () => ({
        cardNumber: "getcard",
        expiryDate: "dataGet",
        cardName: "nameGet",
        cvc: "get",
        success: true
      })
  };
});


describe("paymentSaga", () => {
    it("#SAVE_CARD", async () => {
      
      const dispatched = await recordSaga(
        saveCardSaga,
        saveCard({
          cardNumber: "1111",
          expiryDate: "data",
          cardName: "name",
          cvc: "222"
        })
      );
      expect(dispatched).toEqual([
        { 
          type: "SAVE_TO_STORE_CARD", payload: { cardNumber: "1111", expiryDate: "data", cardName: "name", cvc: "222" } 
        }
      ]);
    });

    it("#GET_CARD", async () => {
      
      const dispatched = await recordSaga(
        getCardSaga,
        getCard()
      );
      expect(dispatched).toEqual([
        { 
          type: "SAVE_TO_STORE_CARD", payload: {
            cardNumber: "getcard",
            expiryDate: "dataGet",
            cardName: "nameGet",
            cvc: "get"
          } 
        }
      ]);
    });

    it("#CARD_UPDATED_TO_FALSE", async () => {
      
      const dispatched = await recordSaga(
        cardUpdatedToFalseSaga,
        cardUpdatedToFalse()
      );
      expect(dispatched).toEqual([
        { 
          type: "CARD_UPDATED_TO_FALSE_STORE"
        }
      ]);
    });
});
