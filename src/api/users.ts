import config from "../config";

export async function createUser(
  username: string,
  email: string,
  password: string
  // eslint-disable-next-line
): Promise<any> {
  const userCreated = await fetch(`${config.api.baseurl}/user`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  }).then((response) => response.json());
  return userCreated;
}

export async function getAllUsers() {
  const allUsers = await fetch(`${config.api.baseurl}/user`, {
    method: "GET",
  }).then((response) => response.json());
  return allUsers;
}
