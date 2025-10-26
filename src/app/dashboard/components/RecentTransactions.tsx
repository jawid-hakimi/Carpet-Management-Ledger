"use client";

import { Card } from "@/components/ui/Card";
import { TrendingUp, TrendingDown, ArrowUpRight, MoreHorizontal } from "lucide-react";

const transactions = [
  { 
    id: "#1001", 
    type: "خرید", 
    amount: "۲۵۰,۰۰۰", 
    currency: "افغانی",
    date: "1404-07-01",
    status: "success",
    trend: "up"
  },
  { 
    id: "#1002", 
    type: "مصرف", 
    amount: "۱۲۰,۰۰۰", 
    currency: "افغانی",
    date: "1404-07-02",
    status: "expense",
    trend: "down"
  },
  { 
    id: "#1003", 
    type: "خرید", 
    amount: "۳۰۰,۰۰۰", 
    currency: "افغانی",
    date: "1404-07-03",
    status: "success",
    trend: "up"
  },
  { 
    id: "#1004", 
    type: "خرید", 
    amount: "۱۸۰,۰۰۰", 
    currency: "افغانی",
    date: "1404-07-04",
    status: "success",
    trend: "up"
  },
  { 
    id: "#1005", 
    type: "مصرف", 
    amount: "۸۵,۰۰۰", 
    currency: "افغانی",
    date: "1404-07-05",
    status: "expense",
    trend: "down"
  },
  { 
    id: "#1006", 
    type: "خرید", 
    amount: "۸۵,۰۰۰", 
    currency: "افغانی",
    date: "1404-07-05",
    status: "success",
    trend: "down"
  },
];

export default function RecentTransactions() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "expense":
        return "text-rose-600 bg-rose-50 border-rose-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (trend: string) => {
    if (trend === "up") {
      return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    }
    return <TrendingDown className="w-4 h-4 text-rose-500" />;
  };

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm border border-gray-200/60 shadow-xs hover:shadow-md transition-all duration-300">
      <div className="p-6">
        {/* سربرگ */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">معاملات اخیر</h2>
              <p className="text-sm text-gray-600 mt-1">آخرین فعالیت‌های مالی سیستم</p>
            </div>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* جدول */}
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200/60 hover:border-blue-300 hover:shadow-sm transition-all duration-200 group"
            >
              {/* معلومات معامله */}
              <div className="flex items-center gap-4 flex-1">
                {/* آیکون وضعیت */}
                <div className={`p-2 rounded-xl border-2 ${getStatusColor(transaction.status)}`}>
                  {getStatusIcon(transaction.trend)}
                </div>

                {/* جزئیات */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {transaction.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                      {transaction.status === "success" ? "مؤفق" : "مصرف"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{transaction.id}</span>
                    <span>•</span>
                    <span>{transaction.date}</span>
                  </div>
                </div>
              </div>

              {/* مقدار */}
              <div className="text-left ml-4">
                <div className={`text-lg font-bold ${
                  transaction.trend === "up" ? "text-emerald-600" : "text-rose-600"
                }`}>
                  {transaction.amount}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {transaction.currency}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* پاورقی */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200/60">
          <div className="text-sm text-gray-600">
            نمایش {transactions.length} معامله
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 group">
            دیدن همه معاملات
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </Card>
  );
}