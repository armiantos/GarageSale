"use server";

import { DEFAULT_PAGE_SIZE } from "@/config";
import prisma from "@/db";

export async function getTransactions(page: number, search?: string) {
  const totalRecordCount = await prisma.item.count();

  const transactions = await prisma.transaction.findMany({
    skip: page * DEFAULT_PAGE_SIZE,
    take: DEFAULT_PAGE_SIZE,
    include: {
      TransactionItem: {
        include: {
          item: true,
        },
      },
    },
  });

  const values = transactions.map((transaction) => ({
    id: transaction.id.toString(),
    totalPrice: transaction.totalPrice.toNumber(),
    itemsSerialized: transaction.TransactionItem.map(
      (transactionItem) =>
        `${transactionItem.itemId} - ${transactionItem.item.description} (${transactionItem.quantity})`
    ),
  }));

  return {
    values,
    totalRecordCount,
  };
}
