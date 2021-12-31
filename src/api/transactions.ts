import config from "../config";

export async function createTransaction(
  amount: number,
  categoryId: string,
  date: Date
): Promise<any> {
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
    }),
  }).then((response) => response.json());
  return transactionCreated;
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
