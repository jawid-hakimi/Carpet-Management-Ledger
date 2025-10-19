"use client";

import { Card } from "@/components/ui/Card";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const profitData = [
  { month: "حمل", profit: 1200 },
  { month: "ثور", profit: 1500 },
  { month: "جوزا", profit: 1800 },
  { month: "سرطان", profit: 2000 },
  { month: "اسد", profit: 2300 },
  { month: "سنبله", profit: 3300 },
];

export default function ProfitChart() {
  return (
    <Card className="p-4">
      <h1 className="text-lg font-semibold text-teal-500 mb-4">
         مفاد شش ماه اخیر
      </h1>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={profitData}
          margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
        >
          <defs>
            {/* Gradient میله‌ها */}
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.3} />
            </linearGradient>

            {/* Gradient خط */}
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* شبکه پس‌زمینه */}
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
          <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />

          {/* Tooltip فقط برای Bar */}
          <Tooltip
            cursor={{ fill: "rgba(16,185,129,0.1)" }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              direction: "rtl",
              fontFamily: "Vazirmatn, sans-serif",
            }}
            labelStyle={{ color: "#374151", fontWeight: 500 }}
            formatter={(value: number, name, props) => {
              if (props?.dataKey === "profit") {
                return [`${value.toLocaleString()} افغانی`, "مفاد"];
              }
              return null;
            }}
          />

          {/* میله‌ها */}
          <Bar
            dataKey="profit"
            barSize={24}
            radius={[6, 6, 0, 0]}
            fill="url(#barGradient)"
          />

          {/* خط روند بدون تاثیر روی Tooltip */}
          <Line
            type="monotone"
            dataKey="profit"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={{ r: 5, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{
              r: 7,
              stroke: "#10b981",
              strokeWidth: 3,
              fill: "#fff",
            }}
            tooltipType="none"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
}
