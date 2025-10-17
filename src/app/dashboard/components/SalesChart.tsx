"use client";

import { Card } from "@/components/ui/Card";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";

const salesData = [
  { month: "فروردین", sales: 4000 },
  { month: "اردیبهشت", sales: 3000 },
  { month: "خرداد", sales: 5000 },
  { month: "تیر", sales: 7000 },
  { month: "مرداد", sales: 9000 },
];

export default function SalesChart() {
  return (
    <Card>
      <div>
        <h1>نمودار فروشات</h1>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salesData}>
            <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
