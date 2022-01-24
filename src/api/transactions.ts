import config from "../config";

interface TransactionModel {
  transactionId: string;
  userId: string;
  categoryId?: string;
  amount: string;
  note: string;
  date: Date;
  year: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TransactionResponse extends TransactionModel {
  category: {
    categoryId: string;
    category: string;
  };
}

export async function createTransaction(
  amount: number,
  categoryId: string,
  note: string,
  date: Date
  // eslint-disable-next-line
): Promise<TransactionModel> {
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
      note,
      date,
      year,
    }),
  }).then((response) => response.json());
  return transactionCreated;
}

export async function getTransactionsYearToDate(
  year: number
): Promise<TransactionResponse[]> {
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

export async function deleteTransaction(
  transactionId: string
): Promise<TransactionModel> {
  const transaction = await fetch(
    `${config.api.baseurl}/transaction/${transactionId}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  ).then((response) => response.json());
  return transaction;
}

export async function updateTransaction(
  transaction: TransactionModel
): Promise<TransactionModel> {
  const updatedTransaction = await fetch(
    `${config.api.baseurl}/transaction/update/${transaction.transactionId}`,
    {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(transaction),
    }
  ).then((response) => response.json());
  return updatedTransaction;
}
