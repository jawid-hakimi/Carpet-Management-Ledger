"use client";

import { Card } from "@/components/ui/Card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  TooltipProps
} from "recharts";
import { TrendingUp, Wallet, MoreHorizontal } from "lucide-react";
import { ExpenseChartType } from "@/types/dashborad/expenseChart";

const expenseData: ExpenseChartType[] = [
  { month: "حمل", expense: 800, color: "#ef4444" },
  { month: "ثور", expense: 1200, color: "#f97316" },
  { month: "جوزا", expense: 900, color: "#eab308" },
  { month: "سرطا", expense: 1100, color: "#22c55e" },
  { month: "اسد", expense: 1300, color: "#3b82f6" },
  { month: "سنبله", expense: 1400, color: "#8b5cf6" },
];

const totalExpense = expenseData.reduce((sum, item) => sum + item.expense, 0);

// تعریف انواع دقیق برای Tooltip
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ExpenseChartType;
  }>;
}

// تعریف انواع برای Legend
interface LegendPayload {
  value: string;
  color: string;
  payload?: ExpenseChartType;
}

interface CustomLegendProps {
  payload?: LegendPayload[];
}

export default function ExpenseDonutChart() {
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.expense / totalExpense) * 100).toFixed(1);
      
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: data.color as string }}
            />
            <span className="font-medium text-gray-900">{data.month}</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-gray-900">
              {data.expense.toLocaleString()}
              <span className="text-sm font-normal text-gray-600 mr-1">افغانی</span>
            </div>
            <div className="text-sm text-gray-600">
              {percentage}% از کل مصارف
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: CustomLegendProps) => {
    if (!payload) return null;

    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {payload.map((entry: LegendPayload, index: number) => {
          const expenseItem = expenseData[index];
          const percentage = expenseItem ? ((expenseItem.expense / totalExpense) * 100).toFixed(0) : "0";
          
          return (
            <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color as string }}
              />
              <span className="text-sm text-gray-700 font-medium">{entry.value}</span>
              <span className="text-sm text-gray-500">
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-white to-red-50/20 backdrop-blur-sm border border-gray-200/60 shadow-xs hover:shadow-md transition-all duration-300">
      <div className="p-6">
        {/* سربرگ */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl shadow-lg">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">مصارف شش ماه اخیر</h2>
              <p className="text-sm text-gray-600 mt-1">توزیع مصارف بر اساس ماه‌های شمسی</p>
            </div>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* آمار کلی */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-rose-50 rounded-2xl border border-rose-200">
            <div className="text-2xl font-bold text-rose-600">
              {totalExpense.toLocaleString()}
            </div>
            <div className="text-xs text-rose-600 mt-1">مجموع مصارف</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-2xl border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(totalExpense / 6).toLocaleString()}
            </div>
            <div className="text-xs text-blue-600 mt-1">میانگین ماهانه</div>
          </div>
        </div>

        {/* نمودار */}
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="expense"
                nameKey="month"
                cx="50%"
                cy="50%"
                innerRadius="65%"
                outerRadius="85%"
                paddingAngle={2}
                cornerRadius={8}
                startAngle={90}
                endAngle={450}
              >
                {expenseData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color as string}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              
              {/* متن مرکزی */}
              <text
                x="50%"
                y="30%"
                textAnchor="middle"
                className="text-2xl font-bold fill-gray-900"
              >
                {totalExpense.toLocaleString()}
              </text>
              <text
                x="50%"
                y="40%"
                textAnchor="middle"
                className="text-sm fill-gray-500"
              >
                افغانی
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* اطلاعات اضافی */}
        <div className="mt-6 pt-6 border-t border-gray-200/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>روند صعودی در ماه‌های اخیر</span>
            </div>
            <div className="text-sm font-medium text-rose-600">
              +۲۵٪ نسبت به سال قبل
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}