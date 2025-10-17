"use client";

import { Card } from "@/components/ui/Card";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

const expenseData = [
  { month: "فروردین", expense: 800 },
  { month: "اردیبهشت", expense: 1200 },
  { month: "خرداد", expense: 900 },
  { month: "تیر", expense: 1100 },
  { month: "مرداد", expense: 1300 },
];

export default function ExpenseChart() {
  return (
    <Card>
      <div>
        <h1>نمودار مصارف</h1>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={expenseData}>
            <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="#fecaca" />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}