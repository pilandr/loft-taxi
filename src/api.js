export const serverLogin = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };

  return fetch("https://loft-taxi.glitch.me/auth", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => ({ success: data.success, token: data.token }));
};

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

export const getCard = async (token) => {
  return fetch(`https://loft-taxi.glitch.me/card?token=${token}`)
    .then((response) => response.json())
    .then((data) => ({...data, success: true}));
};
