import {Product } from "@prisma/client";

export type createProductDto = Pick<Product, "name" | "price" | "stockQuantity">;
