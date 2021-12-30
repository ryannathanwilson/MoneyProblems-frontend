import config from "../config";

export async function createCategory(category: string): Promise<any> {
  const categoryCreated = await fetch(`${config.api.baseurl}/category`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      category,
    }),
  }).then((response) => response.json());
  return categoryCreated;
}

export async function getCategories() {
  const allUsers = await fetch(`${config.api.baseurl}/category`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }).then((response) => response.json());
  return allUsers;
}
