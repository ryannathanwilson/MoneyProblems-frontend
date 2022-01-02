import config from "../config";

export async function createBudget(
  amount: number,
  month: number,
  year: number,
  categoryId: string
): Promise<any> {
  const budgetCreated = await fetch(`${config.api.baseurl}/budget`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      amount,
      month,
      year,
      categoryId,
    }),
  }).then((response) => response.json());
  return budgetCreated;
}

export async function getBudgetYearToDate(year: number) {
  const allBudgetItems = await fetch(
    `${config.api.baseurl}/budget/by-year/${year}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  ).then((response) => response.json());
  return allBudgetItems;
}

export async function getBudgetsByUser() {
  const allBudgetItems = await fetch(`${config.api.baseurl}/budget`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }).then((response) => response.json());
  return allBudgetItems;
}
