// src/resources/product/product.service.ts
import { PrismaClient, Product } from '@prisma/client';
import { ProdCreateDto, ProdUpdateDto } from './product.types';

const prisma = new PrismaClient();

export async function getAllProducts(): Promise<Product[]> {
  return await prisma.product.findMany();
}

export async function createProduct(product: ProdCreateDto): Promise<Product | null> {
  try {
    return await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        stockQuantity: product.stockQuantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  return await prisma.product.findUnique({ where: { id } });
}

export async function updateProduct(id: string, product: ProdUpdateDto): Promise<Product | null> {
  try {
    return await prisma.product.update({ where: { id }, data: product });
  } catch {
    return null;
  }
}

export async function removeProduct(id: string): Promise<boolean> {
  try {
    await prisma.product.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
