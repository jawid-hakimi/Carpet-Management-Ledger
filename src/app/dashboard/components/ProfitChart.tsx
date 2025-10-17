
"use client";

import { Card} from "@/components/ui/Card";
import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";

const profitData = [
  { month: "فروردین", profit: 1200 },
  { month: "اردیبهشت", profit: 1500 },
  { month: "خرداد", profit: 1800 },
  { month: "تیر", profit: 2000 },
  { month: "مرداد", profit: 2300 },
];

export default function ProfitChart() {
  return (
    <Card>
      <div>
        <h1>نمودار سود</h1>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={profitData}>
            <Bar dataKey="profit" fill="#22c55e" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}