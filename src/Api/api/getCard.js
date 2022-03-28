export const getCard = async (token) => {
  return fetch(`https://loft-taxi.glitch.me/card?token=${token}`)
    .then((response) => response.json())
    .then((data) => ({...data, success: true}));
};