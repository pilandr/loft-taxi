export const serverRegister = async (email, password, name, surname) => {
  const body = {
    email: email,
    password: password,
    name: name,
    surname: surname,
  };

  return fetch("https://loft-taxi.glitch.me/register", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => ({ success: data.success, token: data.token }));
};