"use server";

import { DEFAULT_PAGE_SIZE } from "@/config";
import prisma from "@/db";

export async function getItems(page: number, search?: string) {
  const items = await prisma.item.findMany({
    skip: page * DEFAULT_PAGE_SIZE,
    take: DEFAULT_PAGE_SIZE,
    where:
      search != undefined
        ? {
            id: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {},
    include: {
      donator: {
        select: {
          name: true,
        },
      },
    },
  });

  return items.map((item) => ({
    id: item.id,
    description: item.description,
    donator: item.donator?.name,
    stock: item.stock,
    price: item.price?.toNumber(),
  }));
}
