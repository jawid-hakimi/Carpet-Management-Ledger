// types/consumption.ts
export interface Consumption {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface ConsumptionFormData {
  title: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  paymentMethod: string;
}