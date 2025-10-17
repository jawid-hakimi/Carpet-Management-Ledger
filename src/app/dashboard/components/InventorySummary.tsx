"use client";

import { Card } from "@/components/ui/Card";
import Progress  from "@/components/ui/Progress";

const inventoryItems = [
  { name: "فرش A", quantity: 20, total: 100 },
  { name: "پرده B", quantity: 5, total: 50 },
  { name: "کفش C", quantity: 15, total: 30 },
];

export default function InventorySummary() {
  return (
    <Card>
      {/* عنوان کارت */}
      <div className="mb-3 text-lg font-semibold text-primary">وضعیت انبار</div>

      {/* محتوای اصلی */}
      <div className="space-y-4">
        {inventoryItems.map((item, i) => {
          const percentage = Math.floor((item.quantity / item.total) * 100);
          return (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-sm font-medium">
                <span>{item.name}</span>
                <span>{item.quantity}/{item.total}</span>
              </div>
              <Progress value={percentage} />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
