export interface ProductItemType {
  id: number;
  name: string;
  code?: string;
  size?: string;
  color?: string;
  quality?: string;
  material?: string;
  salePrice: number;
  quantity: number;
}

export interface CustomerType {
  name: string;
  phone: string;
  address?: string;
}

export interface SaleInfoType {
  quantity: number;
  totalPrice: number;
  discount?: number;
  finalPrice: number;
  paymentMethod?: "cash" | "card" | "check" | "installment";
  deliveryMethod?: "pickup" | "delivery";
  saleDate: string;
  notes?: string;
  unitPrice?: number;
}

export interface SaleDataType {
  invoiceNumber?: string;
  customer: CustomerType;
  products: ProductItemType[];
  saleInfo: SaleInfoType;
}
