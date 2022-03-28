export const getAddresses = async () => {
  return fetch("https://loft-taxi.glitch.me/addressList")
    .then((response) => response.json())
    .then((data) => ({...data, success: true}));
};