import { TransactionInterface } from "../components/store";
import config from "../config";

export interface TransactionModel {
  transactionId: string;
  userId: string;
  categoryId: string;
  amount: string;
  note: string;
  date: Date;
  year: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function createTransaction(
  transaction: TransactionInterface
  // eslint-disable-next-line
): Promise<TransactionModel> {
  const year = transaction.date.getFullYear();
  const transactionCreated = await fetch(`${config.api.baseurl}/transaction`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      amount: transaction.amount,
      categoryId: transaction.categoryId,
      note: transaction.note,
      date: transaction.date,
      year,
    }),
  }).then((response) => response.json());
  return transactionCreated;
}

export async function getTransactionsYearToDate(
  year: number
): Promise<TransactionModel[]> {
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
  transaction: TransactionInterface
): Promise<TransactionModel> {
  const year = new Date(transaction.date).getFullYear();
  const updatedTransaction = await fetch(
    `${config.api.baseurl}/transaction/update/${transaction.transactionId}`,
    {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        transactionId: transaction.transactionId,
        amount: transaction.amount,
        categoryId: transaction.categoryId,
        note: transaction.note,
        date: transaction.date,
        year,
      }),
    }
  ).then((response) => response.json());
  return updatedTransaction;
}
