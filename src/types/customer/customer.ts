// src/types/customer.ts

export interface CustomerType {
  id: string;
  name: string;
  phone: string;
  address: string;
}

export interface CustomerInfoForm {
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}

export interface CustomerInfoProps {
  formData: CustomerInfoForm;
  onFormDataChange: (field: keyof CustomerInfoForm, value: string) => void;
}
