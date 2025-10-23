// src/app/reports/page.tsx
"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import {
  Button,
  DownloadButton,
  ViewButton,
  PrintButton
} from "@/components/ui/Button";
import {
  BarChart3,
  Package,
  DollarSign,
  Calendar,
  Filter,
  Receipt,
  Archive,
  Eye,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// داده‌های نمونه برای سیستم MIS
const mockReportsData = {
  dailySales: [
    { date: "1402-12-01", salesCount: 8, totalAmount: 45000000, cash: 30000000, card: 15000000 },
    { date: "1402-12-02", salesCount: 12, totalAmount: 68000000, cash: 45000000, card: 23000000 },
    { date: "1402-12-03", salesCount: 6, totalAmount: 32000000, cash: 20000000, card: 12000000 },
    { date: "1402-12-04", salesCount: 15, totalAmount: 89000000, cash: 60000000, card: 29000000 },
    { date: "1402-12-05", salesCount: 9, totalAmount: 52000000, cash: 35000000, card: 17000000 },
    { date: "1402-12-06", salesCount: 11, totalAmount: 61000000, cash: 40000000, card: 21000000 },
    { date: "1402-12-07", salesCount: 7, totalAmount: 38000000, cash: 25000000, card: 13000000 },
  ],
  productCategories: [
    { name: "قالین دستباف", count: 45, value: 450000000 },
    { name: "قالین ماشینی", count: 78, value: 312000000 },
    { name: "قالین پشمی", count: 32, value: 192000000 },
    { name: "قالین ابریشمی", count: 18, value: 216000000 },
  ],
  paymentMethods: [
    { method: "نقد", count: 45, amount: 255000000, percentage: 62 },
    { method: "کارت به کارت", count: 18, amount: 98000000, percentage: 24 },
    { method: "چک", count: 8, amount: 42000000, percentage: 10 },
    { method: "باقی", count: 3, amount: 15000000, percentage: 4 },
  ],
  topProducts: [
    { id: 1, name: "قالین دستباف اصفهان 6 متری", sold: 28, revenue: 700000000, stock: 12 },
    { id: 2, name: "قالین ماشینی ترک 4 متری", sold: 45, revenue: 360000000, stock: 25 },
    { id: 3, name: "قالین پشمی کابل 5 متری", sold: 22, revenue: 330000000, stock: 8 },
    { id: 4, name: "قالین ابریشم هرات 3 متری", sold: 15, revenue: 450000000, stock: 5 },
  ],
  inventory: [
    { category: "قالین دستباف", total: 45, sold: 28, remaining: 17 },
    { category: "قالین ماشینی", total: 78, sold: 45, remaining: 33 },
    { category: "قالین پشمی", total: 32, sold: 22, remaining: 10 },
    { category: "قالین ابریشمی", total: 18, sold: 15, remaining: 3 },
  ]
};

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("7days");
  const [reportType, setReportType] = useState("sales");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState("overview");

  // محاسبات آماری
  const stats = useMemo(() => {
    const salesData = mockReportsData.dailySales;
    const totalRevenue = salesData.reduce((sum, item) => sum + item.totalAmount, 0);
    const totalSales = salesData.reduce((sum, item) => sum + item.salesCount, 0);
    const averageSale = totalRevenue / totalSales;
    const cashPercentage = (salesData.reduce((sum, item) => sum + item.cash, 0) / totalRevenue) * 100;

    const totalInventory = mockReportsData.inventory.reduce((sum, item) => sum + item.total, 0);
    const soldInventory = mockReportsData.inventory.reduce((sum, item) => sum + item.sold, 0);
    const inventoryValue = mockReportsData.productCategories.reduce((sum, item) => sum + item.value, 0);

    return {
      totalRevenue,
      totalSales,
      averageSale,
      cashPercentage,
      totalInventory,
      soldInventory,
      inventoryValue,
      growthRate: 12.5
    };
  }, []);

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleExportReport = (type: string) => {
    alert(`گزارش ${type} با موفقیت صادر شد!`);
  };


  // کامپوننت‌های داخلی
  const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    color = "blue"
  }: {
    title: string;
    value: string;
    subtitle?: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    trend?: number;
    color?: "blue" | "green" | "purple" | "orange";
  }) => {
    const colorClasses = {
      blue: "from-blue-500 to-cyan-500",
      green: "from-emerald-500 to-green-500",
      purple: "from-purple-500 to-pink-500",
      orange: "from-orange-500 to-red-500"
    };

    const isPositive = trend && trend >= 0;

    return (
      <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 p-6 border-0 bg-gradient-to-br from-white to-gray-50/50">
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
          {subtitle && <p className="text-sm text-gray-600 mb-2">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
              {isPositive ?
                <ArrowUpRight className="w-4 h-4 ml-1" /> :
                <ArrowDownRight className="w-4 h-4 ml-1" />
              }
              {Math.abs(trend).toFixed(1)}% نسبت به دوره قبل
            </div>
          )}
        </div>
        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${colorClasses[color]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
      </Card>
    );
  };

  const SectionCard = ({ title, children, icon: Icon, action }: {
    title: string;
    children: React.ReactNode;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    action?: React.ReactNode;
  }) => (
    <Card className="p-6 border-0 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 items-center">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white mr-3">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </Card>
  );

  const ViewToggle = () => (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {[
        { id: "overview", label: "نمایه کلی", icon: Eye },
        { id: "details", label: "جزئیات", icon: Activity },
      ].map((item) => (
        <Button
          key={item.id}
          onClick={() => setActiveView(item.id)}
          variant={activeView === item.id ? "primary" : "ghost"}
          size="sm"
          icon={<item.icon className="w-5 h-5" />}
          className="flex items-center"
        >
          {item.label}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="w-full space-y-6">
      <PageHeader
        title="داشبورد مدیریتی"
        showHomeIcon={true}
        description="گزارشات جامع عملکرد شرکت قالین فروشی امید"
      />

      {/* هدر با فیلترها */}
      <Card className="p-6 border-0 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg lg:text-xl font-bold text-gray-900 text-nowrap">گزارشات تجارتي</h2>
            <ViewToggle />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-3">
              <Select
                label="نوع گزارش"
                options={[
                  { value: "sales", label: "گزارش فروش" },
                  { value: "inventory", label: "گزارش گدام" },
                  { value: "financial", label: "گزارش مالی" },
                  { value: "customers", label: "گزارش مشتریان" },
                ]}
                value={reportType}
                onChange={setReportType}
                className="min-w-[150px]"
              />

              <Select
                label="دوره زمانی"
                options={[
                  { value: "7days", label: "۷ روز گذشته" },
                  { value: "30days", label: "۳۰ روز گذشته" },
                  { value: "90days", label: "۳ ماه گذشته" },
                  { value: "year", label: "امسال" },
                  { value: "custom", label: "انتخاب تاریخ" },
                ]}
                value={dateRange}
                onChange={setDateRange}
                className="min-w-[150px]"
              />
            </div>

            <div className="flex gap-2 items-end">
              <Button
                onClick={handleGenerateReport}
                loading={isLoading}
                loadingText="در جریان بارگذاری..."
                icon={<Filter className="w-4 h-4" />}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 border-0"
              >
                اعمال فیلتر
              </Button>

              <DownloadButton
                onClick={() => handleExportReport("Excel")}
                variant="outline"
              >
                خروجی
              </DownloadButton>

              <PrintButton
                onClick={() => handleExportReport("PDF")}
                variant="outline"
              >
                پرنت
              </PrintButton>
            </div>
          </div>
        </div>

        {dateRange === "custom" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
            <Input
              label="از تاریخ"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              label="تا تاریخ"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        )}
      </Card>

      {/* کارت‌های آماری اصلی */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="فروش کل"
          value={`${(stats.totalRevenue / 1000000).toFixed(0)}M`}
          subtitle="افغانی"
          icon={DollarSign}
          trend={stats.growthRate}
          color="green"
        />

        <StatCard
          title="تعداد بل‌ها"
          value={stats.totalSales.toString()}
          subtitle="بل فروش"
          icon={Receipt}
          trend={8.3}
          color="blue"
        />

        <StatCard
          title="میانگین بل"
          value={`${(stats.averageSale / 1000000).toFixed(1)}M`}
          subtitle="افغانی"
          icon={BarChart3}
          trend={5.2}
          color="purple"
        />

        <StatCard
          title="موجودی گدام"
          value={stats.totalInventory.toString()}
          subtitle="عدد قالین"
          icon={Archive}
          color="orange"
        />
      </div>

      {/* چارت‌ها و جداول */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* گزارش روزانه فروش */}
        <div className="xl:col-span-2">
          <SectionCard
            title="گزارش روزانه فروش"
            icon={Calendar}
            action={
              <div className="flex gap-2">
                <DownloadButton size="sm" variant="outline" />
                <ViewButton size="sm" variant="outline" />
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right py-4 px-4 font-bold text-gray-900">تاریخ</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">تعداد بل</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">مبلغ کل</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">عملکرد</th>
                  </tr>
                </thead>
                <tbody>
                  {mockReportsData.dailySales.map((sale, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                      <td className="py-4 px-4 text-right font-semibold text-gray-900">{sale.date}</td>
                      <td className="py-4 px-4 text-center text-gray-700">{sale.salesCount}</td>
                      <td className="py-4 px-4 text-center font-bold text-gray-900">
                        {(sale.totalAmount / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${sale.totalAmount > 60000000 ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                          sale.totalAmount > 40000000 ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            'bg-orange-100 text-orange-800 border border-orange-200'
                          }`}>
                          {sale.totalAmount > 60000000 ? 'عالی' : sale.totalAmount > 40000000 ? 'خوب' : 'متوسط'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* محصولات پرفروش */}
        <SectionCard
          title="محصولات پرفروش"
          icon={Package}
          action={<ViewButton size="sm" variant="outline">مشاهده همه</ViewButton>}
        >
          <div className="space-y-4">
            {mockReportsData.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200">
                <div className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${index === 0 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                    index === 1 ? 'bg-gradient-to-br from-gray-500 to-gray-700' :
                      index === 2 ? 'bg-gradient-to-br from-orange-500 to-red-500' :
                        'bg-gradient-to-br from-blue-500 to-cyan-500'
                    }`}>
                    {index + 1}
                  </div>
                  <div className="mr-3 flex-1">
                    <p className="font-semibold text-gray-900 text-sm leading-tight">{product.name}</p>
                    <div className="flex gap-3 mt-1">
                      <span className="text-xs text-gray-600">فروش: {product.sold}</span>
                      <span className="text-xs text-gray-600">موجودی: {product.stock}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-emerald-600 text-sm">
                    {(product.revenue / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* روش‌های پرداخت */}
        <SectionCard title="طریقه‌های پرداخت" icon={DollarSign}>
          <div className="space-y-4">
            {mockReportsData.paymentMethods.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
                    {payment.percentage}%
                  </div>
                  <div className="mr-3">
                    <p className="font-semibold text-gray-900">{payment.method}</p>
                    <p className="text-sm text-gray-600">{payment.count} معامله</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">
                    {(payment.amount / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* وضعیت گدام */}
        <SectionCard title="وضعیت گدام" icon={Archive}>
          <div className="space-y-4">
            {mockReportsData.inventory.map((item, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-900">{item.category}</span>
                  <span className="text-sm text-gray-600 font-medium">
                    {item.sold} از {item.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-1000"
                    style={{ width: `${(item.sold / item.total) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>فروش: {item.sold}</span>
                  <span>باقی: {item.remaining}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* خلاصه عملکرد */}
        <SectionCard title="خلاصه عملکرد" icon={Activity}>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="font-semibold text-emerald-800">بلترین روز</span>
              <span className="font-bold text-emerald-900">۸۹M افغانی</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="font-semibold text-blue-800">میانگین روزانه</span>
              <span className="font-bold text-blue-900">۵۴M افغانی</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
              <span className="font-semibold text-purple-800">مشتریان فعال</span>
              <span className="font-bold text-purple-900">۶۸ نفر</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
              <span className="font-semibold text-orange-800">نسبت فروش</span>
              <span className="font-bold text-orange-900">۷۲٪</span>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}