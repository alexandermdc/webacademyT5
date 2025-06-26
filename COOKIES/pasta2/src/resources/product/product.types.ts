import { Product } from '@prisma/client';

type ProdCreateDto= Pick<Product,'name'|'price'|'stockQuantity'>;
type ProdUpdateDto= Pick<Product,'name'|'price'|'stockQuantity'>;

export type { ProdCreateDto, ProdUpdateDto };