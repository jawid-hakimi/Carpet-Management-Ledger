"use client";

import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

const activities = [
  "Ali added a new carpet product",
  "Sara confirmed a back order",
  "Omid updated product prices",
  "Customer feedback received",
];

export default function RecentActivities() {
  return (
    <Card>
      <div>
        <h1>Recent Activities</h1>
      </div>
      <div>
        <ul className="space-y-3">
          {activities.map((activity, i) => (
            <motion.li
              key={i}
              className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {activity}
            </motion.li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
