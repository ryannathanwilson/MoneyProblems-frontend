import config from "../config";

interface LoginTokens {
  userLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
}

export async function loginUser(
  username: string,
  password: string
): Promise<LoginTokens> {
  const tokens = await fetch(`${config.api.baseurl}/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((response) => response.json());
  return tokens;
}

export async function refreshAccessToken(): Promise<LoginTokens> {
  const currentToken = localStorage.getItem("refreshToken");
  const newTokens = await fetch(`${config.api.baseurl}/auth/refresh-token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      refreshToken: currentToken,
    }),
  }).then((response) => response.json());
  return newTokens;
}
