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