// src/types/sales.ts

// تایپ پایه برای محصول
export interface ProductItemType {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  salePrice: number;
  purchasePrice: number;
  stock: number;
  size: string;
  color: string;
  quality: string;
  material: string;
  code: string;
}

// تایپ پایه برای مشتری
export interface CustomerType {
  name: string;
  phone: string;
  address?: string;
}

// تایپ پایه برای اطلاعات فروش
export interface SaleInfoType {
  quantity: number;
  totalPrice: number;
  discount?: number;
  finalPrice: number;
  paymentMethod?: string;
  deliveryMethod?: string;
  saleDate: string;
  notes?: string;
  unitPrice?: number;
}

// تایپ اصلی برای داده‌های فروش - برای نمایش و گزارشات
export interface SaleDataType {
  invoiceNumber?: string;
  customer: CustomerType;
  products: ProductItemType[];
  saleInfo: SaleInfoType;
}

// تایپ برای داده‌های فرم - برای ارسال
export interface SaleFormData {
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: string;
  deliveryMethod: string;
  notes: string;
  saleDate: string;
}

// تایپ برای داده‌های ارسالی از فرم
export interface SaleSubmitData extends SaleFormData {
  id?: string;
  products: ProductItemType[];
  finalPrice: number;
  invoiceNumber: string;
}

export type SaleData = SaleDataType | LegacySaleData;

// تایپ union برای داده‌های قدیمی
export interface LegacySaleData {
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  products?: ProductItemType[];
  finalPrice?: number;
  paymentMethod?: string;
  deliveryMethod?: string;
  saleDate: string;
  notes?: string;
  invoiceNumber?: string;
}

// تابع helper برای تبدیل SaleSubmitData به SaleDataType
export const convertToSaleDataType = (submitData: SaleSubmitData): SaleDataType => {
  return {
    invoiceNumber: submitData.invoiceNumber,
    customer: {
      name: submitData.customerName,
      phone: submitData.customerPhone,
      address: submitData.customerAddress
    },
    products: submitData.products,
    saleInfo: {
      quantity: submitData.products.reduce((total, product) => total + product.quantity, 0),
      totalPrice: submitData.finalPrice,
      finalPrice: submitData.finalPrice,
      paymentMethod: submitData.paymentMethod,
      deliveryMethod: submitData.deliveryMethod,
      saleDate: submitData.saleDate,
      notes: submitData.notes
    }
  };
};

// تایپ برای props کامپوننت‌ها
export interface SaleFormProps {
  onSubmit: (data: SaleSubmitData) => void;
  onCancel: () => void;
  initialData?: SaleSubmitData;
}

export interface InvoicePreviewProps {
  saleData: SaleDataType;
  onBack: () => void;
}

// تایپ برای handleInputChange
export type FormField = keyof SaleFormData;