"use client";

import { Card } from "@/components/ui/Card";

const transactions = [
  { id: "#1001", type: "فروش", amount: "$250", date: "1404-07-01" },
  { id: "#1002", type: "مصرف", amount: "$120", date: "1404-07-02" },
  { id: "#1003", type: "فروش", amount: "$300", date: "1404-07-03" },
];

export default function RecentTransactions() {
  return (
    <Card>
      <div>
        <h1>تراکنش‌های اخیر</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">شناسه</th>
                <th className="text-left py-2">نوع</th>
                <th className="text-left py-2">مقدار</th>
                <th className="text-left py-2">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b hover:bg-muted/50">
                  <td className="py-2">{t.id}</td>
                  <td className="py-2">{t.type}</td>
                  <td className="py-2">{t.amount}</td>
                  <td className="py-2">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
