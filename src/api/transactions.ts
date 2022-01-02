import config from "../config";

export async function createTransaction(
  amount: number,
  categoryId: string,
  date: Date
): Promise<any> {
  const year = date.getFullYear();
  const transactionCreated = await fetch(`${config.api.baseurl}/transaction`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      amount,
      categoryId,
      date,
      year,
    }),
  }).then((response) => response.json());
  return transactionCreated;
}

export async function getTransactionsYearToDate(year: number) {
  const allTransactions = await fetch(
    `${config.api.baseurl}/transaction/by-year/${year}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  ).then((response) => response.json());
  return allTransactions;
}
export async function getTransactionsByUser() {
  const allTransactions = await fetch(`${config.api.baseurl}/transaction`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }).then((response) => response.json());
  return allTransactions;
}
