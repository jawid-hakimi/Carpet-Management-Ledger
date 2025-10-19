"use client";

import { Card } from "@/components/ui/Card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// نمونه داده‌ها بر اساس روزهای یک هفته
const salesData = [
  { day: "شنبه", sales: 500 },
  { day: "یک‌‌ شنبه", sales: 1200 },
  { day: "دو شنبه", sales: 900 },
  { day: "سه شنبه", sales: 1500 },
  { day: "چهار شنبه", sales: 2000 },
  { day: "پنج شنبه", sales: 1800 },
  { day: "جمعه", sales: 2200 },
];

export default function SalesChart() {
  return (
    <Card className="p-6">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-teal-600">فروشات روزانه</h2>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#0f766e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0f766e" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="day"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toLocaleString()} افغانی`, "فروش"]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
              labelStyle={{ color: "#475569", fontWeight: "600" }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#0f766e"
              strokeWidth={2.5}
              fill="url(#colorSales)"
              dot={{ r: 3, fill: "#0f766e", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#0f766e" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
