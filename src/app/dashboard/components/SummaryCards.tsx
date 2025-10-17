"use client";

import { Card } from "@/components/ui/Card";
import { DollarSign, Package, Users, Activity } from "lucide-react";
import { motion } from "framer-motion";

const summaryData = [
  { title: "مجموع محصولات", value: "1,245", icon: Package, color: "bg-blue-100 text-blue-700" },
  { title: "مجموع فروشات", value: "345", icon: DollarSign, color: "bg-green-100 text-green-700" },
  { title: "مصارف این ماه", value: "$2,750", icon: Activity, color: "bg-red-100 text-red-700" },
  { title: "سود این ماه", value: "$9,300", icon: Users, color: "bg-yellow-100 text-yellow-700" },
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
          <Card>
            <div className="flex flex-row items-center justify-between pb-2">
              <h1 className="text-sm font-medium text-primary">{item.title}</h1>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold">{item.value}</div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}