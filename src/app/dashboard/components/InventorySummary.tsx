"use client";

import { Card } from "@/components/ui/Card";
import { Package, AlertTriangle, CheckCircle } from "lucide-react";

const inventoryItems = [
  { 
    name: "فرش A", 
    quantity: 20, 
    total: 100,
    status: "normal",
    color: "blue"
  },
  { 
    name: "پرده B", 
    quantity: 5, 
    total: 50,
    status: "warning",
    color: "amber"
  },
  { 
    name: "کفش C", 
    quantity: 15, 
    total: 30,
    status: "normal",
    color: "emerald"
  },
  { 
    name: "مبل D", 
    quantity: 2, 
    total: 25,
    status: "critical",
    color: "rose"
  },
];

export default function InventorySummary() {
  const getStatusColor = (status: string, color: string) => {
    const baseColors = {
      blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", progress: "bg-blue-500" },
      amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", progress: "bg-amber-500" },
      emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", progress: "bg-emerald-500" },
      rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", progress: "bg-rose-500" }
    };

    const colorSet = baseColors[color as keyof typeof baseColors] || baseColors.blue;
    
    if (status === "critical") {
      return {
        ...colorSet,
        bg: "bg-rose-50",
        border: "border-rose-200",
        text: "text-rose-700",
        progress: "bg-rose-500"
      };
    }
    
    if (status === "warning") {
      return {
        ...colorSet,
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
        progress: "bg-amber-500"
      };
    }
    
    return colorSet;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "critical":
        return "ضروری";
      case "warning":
        return "هشدار";
      default:
        return "نرمال";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm border border-gray-200/60 shadow-xs hover:shadow-md transition-all duration-300">
      <div className="p-6">
        {/* سربرگ */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">وضعیت گدام</h2>
              <p className="text-sm text-gray-600 mt-1">مشاهده موجودی محصولات</p>
            </div>
          </div>
        </div>

        {/* لیست محصولات */}
        <div className="space-y-4">
          {inventoryItems.map((item, index) => {
            const percentage = Math.floor((item.quantity / item.total) * 100);
            const colors = getStatusColor(item.status, item.color);
            const StatusIcon = getStatusIcon(item.status);
            
            return (
              <div
                key={index}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 hover:shadow-sm ${colors.bg} ${colors.border}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl border-2 ${colors.border} ${colors.text}`}>
                      {StatusIcon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors.border} ${colors.text}`}>
                          {getStatusText(item.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {item.quantity}
                      <span className="text-sm font-normal text-gray-500">/{item.total}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{percentage}%</div>
                  </div>
                </div>

                {/* نوار پیشرفت */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${colors.progress}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                {/* وضعیت موجودی */}
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span>موجودی فعلی</span>
                  <span>
                    {item.quantity} از {item.total} قطعه
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* پاورقی */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200/60">
          <div className="text-sm text-gray-600">
            خلاصه وضعیت گدام
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
            جزئیات کامل
            <Package className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}