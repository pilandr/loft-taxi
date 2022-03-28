export const updateCard = async (
  cardNumber,
  expiryDate,
  cardName,
  cvc,
  token
) => {
  const body = {
    cardNumber: cardNumber,
    expiryDate: expiryDate,
    cardName: cardName,
    cvc: cvc,
    token: token,
  };

  return fetch("https://loft-taxi.glitch.me/card", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => data.success);
};