"use client";

import { Card } from "@/components/ui/Card";
import { DollarSign, Package, TrendingUp , Activity, History } from "lucide-react";
import { motion } from "framer-motion";

const summaryData = [
  {
    title: "مجموع محصولات",
    value: "1,245",
    icon: Package,
    gradient: "from-blue-400 to-blue-700",
    update: "07:40",
  },
  {
    title: "مجموع فروشات",
    value: "345",
    icon: DollarSign,
    gradient: "from-yellow-400 to-orange-600",
    update: "08:40",
  },
  {
    title: "مصارف این ماه",
    value: "2,750 افغانی",
    icon: Activity,
    gradient: "from-red-400 to-rose-600",
    update: "09:40",
  },
  {
    title: "سود این ماه",
    value: "9,300 افغانی",
    icon: TrendingUp ,
    gradient: "from-green-500 to-emerald-600",
    update: "10:40",
  },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            className={`bg-gradient-to-r ${item.gradient} text-white border-none shadow-none shadow-gray-300`}
          >
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <h1 className="text-base font-medium">{item.title}</h1>
                <div className="text-xl font-bold">{item.value}</div>
              </div>

              <item.icon className="h-10 w-10 p-2 bg-white/30 rounded-md" />

            </div>

            <div className="flex items-center gap-1 border-t border-white mt-2 pt-2 text-sm text-white/90">
              <History className="w-4 h-4" />
              <span>بروز رسانی شده در</span>
              <span className="font-semibold">{item.update}</span>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
