// src/types/product.ts
export interface ProductType {
  id: string;
  name: string;
  code: string;
  type: "handmade" | "machine" | "kilim" | "gabbeh";
  size: string;
  quality: "standard" | "premium" | "luxury";
  purchasePrice: number;
  salePrice: number;
  stock: number;
  status: "available" | "out_of_stock" | "discontinued";
  createdAt: string;
}
