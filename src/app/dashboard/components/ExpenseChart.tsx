"use client";

import { Card } from "@/components/ui/Card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const expenseData: { [key: string]: any }[] = [
  { month: "حمل", expense: 800 },
  { month: "ثور", expense: 1200 },
  { month: "جوزا", expense: 900 },
  { month: "سرطا", expense: 1100 },
  { month: "اسد", expense: 1300 },
  { month: "سنبله", expense: 1400 },
];

const COLORS = ["#ef4444", "#f87171", "#fca5a5", "#dc2626", "#b91c1c"];

export default function ExpenseDonutChart() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-red-700">مصارف شش ماه اخیر</h2>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              dataKey="expense"
              nameKey="month"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={5}
              cornerRadius={8}
            >
              {expenseData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value.toLocaleString()} افغانی`, "مصارف"]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
