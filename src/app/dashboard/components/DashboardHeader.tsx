"use client";

import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardHeader() {
  return (
    <motion.div
      className="flex justify-between items-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-bold">داشبورد مدیریت</h1>
      <Button className="flex items-center gap-2">
        <ArrowUpRight className="h-4 w-4" /> عملیات سریع
      </Button>
    </motion.div>
  );
}