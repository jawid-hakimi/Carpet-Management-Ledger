// src/app/products/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { EditButton } from "@/components/ui/Button";
import {
    Package,
    Ruler,
    Hash,
    Calendar,
    MapPin,
    Star,
    DollarSign,
    TrendingUp,
    Weight,
    Layers,
    Palette,
    Ruler as RulerIcon,
    Zap
} from "lucide-react";

// داده نمونه با مشخصات فنی کامل
const mockProduct = {
    id: "1",
    name: "قالین کاشان دست‌باف",
    code: "CAR001",
    type: "handmade",
    size: "3x4",
    quality: "premium",
    origin: "iranian",
    purchasePrice: 15000,
    salePrice: 22000,
    stock: 5,
    status: "available",
    description: "قالین دست‌باف کاشان با طرح لچک ترنج و رنگ‌بندی سنتی. جنس از پنبه مرغوب و پشم طبیعی. این قالین با دقت و ظرافت بالا بافته شده و مناسب برای استفاده در اتاق پذیرایی و سالن‌های مجلل می‌باشد.",
    createdAt: "2024-01-15",
    images: [
        "https://picsum.photos/500/300?random=1",
        "https://picsum.photos/500/300?random=2",
        "https://picsum.photos/500/300?random=3"
    ],
    // مشخصات فنی جدید
    weight: 12.5,
    thickness: 15.5,
    material: "wool_cotton",
    knotDensity: "high",
    pileHeight: 8.5,
    primaryColor: "قرمز",
    secondaryColor: "آبی",
    pattern: "لچک ترنج",
    age: 2,
    condition: "new"
};

const getTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
        handmade: "دست‌باف",
        machine_made: "ماشینی",
        kilim: "کلیم",
        gabbeh: "گبه",
        namad: "نمد",
        tapestry: "تابلوفرش",
        silk: "ابریشمی",
        wool: "پشمی"
    };
    return types[type] || type;
};

const getOriginLabel = (origin: string) => {
    const origins: { [key: string]: string } = {
        afghan: "افغانی",
        iranian: "ایرانی",
        turkish: "ترکی",
        pakistani: "پاکستانی",
        indian: "هندی",
        turkmen: "ترکمنی",
        azerbaijani: "آذربایجانی",
        arabic: "عربی",
        other: "سایر"
    };
    return origins[origin] || origin;
};

const getQualityLabel = (quality: string) => {
    const qualities: { [key: string]: string } = {
        economy: "اقتصادی",
        standard: "استاندارد",
        premium: "پریمیوم",
        luxury: "لوکس"
    };
    return qualities[quality] || quality;
};

const getMaterialLabel = (material: string) => {
    const materials: { [key: string]: string } = {
        wool: "پشم طبیعی",
        silk: "ابریشم",
        cotton: "پنبه",
        synthetic: "الیاف مصنوعی",
        mixed: "مخلوط",
        wool_cotton: "پشم و پنبه",
        silk_wool: "ابریشم و پشم"
    };
    return materials[material] || material;
};

const getKnotDensityLabel = (density: string) => {
    const densities: { [key: string]: string } = {
        low: "کم (کمتر از ۵۰۰ گره)",
        medium: "متوسط (۵۰۰-۸۰۰ گره)",
        high: "بالا (۸۰۰-۱۲۰۰ گره)",
        very_high: "بسیار بالا (بیشتر از ۱۲۰۰ گره)"
    };
    return densities[density] || density;
};

const getConditionLabel = (condition: string) => {
    const conditions: { [key: string]: string } = {
        new: "نو",
        like_new: "در حد نو",
        used: "دست دوم",
        antique: "عتیقه"
    };
    return conditions[condition] || condition;
};

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(mockProduct);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        console.log("Loading product:", params.id);
    }, [params.id]);

    const handleEdit = () => {
        router.push(`/products/${product.id}/edit`);
    };

    const profit = product.salePrice - product.purchasePrice;
    const profitPercentage = ((profit / product.purchasePrice) * 100).toFixed(1);

    return (
        <div className="w-full">
            <PageHeader
                title="جزئیات محصول"
                description="مشاهده اطلاعات کامل قالین"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* بخش تصاویر */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-900">تصاویر محصول</h3>
                        </div>

                        {/* تصویر اصلی */}
                        <div className="mb-4">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-80 object-cover rounded-lg border border-gray-200"
                            />
                        </div>

                        {/* تصاویر کوچک */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 ${selectedImage === index ? 'border-teal-500' : 'border-gray-200'
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* اطلاعات مالی */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <h3 className="font-semibold mb-4 text-gray-900">اطلاعات مالی</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <DollarSign size={24} className="mx-auto mb-2 text-gray-600" />
                                <div className="text-sm text-gray-600 mb-1">قیمت خرید</div>
                                <div className="text-lg font-bold text-gray-900">
                                    {product.purchasePrice.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">افغانی</div>
                            </div>

                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <TrendingUp size={24} className="mx-auto mb-2 text-green-600" />
                                <div className="text-sm text-gray-600 mb-1">قیمت فروش</div>
                                <div className="text-lg font-bold text-green-600">
                                    {product.salePrice.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">افغانی</div>
                            </div>

                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <Star size={24} className="mx-auto mb-2 text-blue-600" />
                                <div className="text-sm text-gray-600 mb-1">فایده خالص</div>
                                <div className="text-lg font-bold text-blue-600">
                                    {profit.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">افغانی</div>
                            </div>

                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                                <Hash size={24} className="mx-auto mb-2 text-purple-600" />
                                <div className="text-sm text-gray-600 mb-1">درصد فایده</div>
                                <div className="text-lg font-bold text-purple-600">
                                    {profitPercentage}%
                                </div>
                                <div className="text-xs text-gray-500">فایده‌مندی</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* بخش اطلاعات */}
                <div className="space-y-6">
                    {/* اطلاعات اصلی */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Hash size={16} />
                                    <span>کد: {product.code}</span>
                                </div>
                            </div>
                            <EditButton
                            
                                size="md"
                                onClick={handleEdit}
                            >
                                ویرایش
                            </EditButton>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Package size={20} className="text-gray-500" />
                                <div>
                                    <div className="text-sm text-gray-600">نوع قالین</div>
                                    <div className="font-medium">{getTypeLabel(product.type)}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Ruler size={20} className="text-gray-500" />
                                <div>
                                    <div className="text-sm text-gray-600">سایز</div>
                                    <div className="font-medium">{product.size} متر</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Star size={20} className="text-gray-500" />
                                <div>
                                    <div className="text-sm text-gray-600">کیفیت</div>
                                    <div className="font-medium">{getQualityLabel(product.quality)}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <MapPin size={20} className="text-gray-500" />
                                <div>
                                    <div className="text-sm text-gray-600">مبدأ</div>
                                    <div className="font-medium">{getOriginLabel(product.origin)}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Calendar size={20} className="text-gray-500" />
                                <div>
                                    <div className="text-sm text-gray-600">تاریخ ثبت</div>
                                    <div className="font-medium">
                                        {new Date(product.createdAt).toLocaleDateString('fa-IR')}
                                    </div>
                                </div>
                            </div>

                            <div className={`flex items-center gap-3 p-3 rounded-lg ${product.stock === 0 ? 'bg-red-50' :
                                    product.stock < 3 ? 'bg-amber-50' : 'bg-green-50'
                                }`}>
                                <Package size={20} className={
                                    product.stock === 0 ? 'text-red-500' :
                                        product.stock < 3 ? 'text-amber-500' : 'text-green-500'
                                } />
                                <div>
                                    <div className="text-sm text-gray-600">موجودی</div>
                                    <div className={`font-medium ${product.stock === 0 ? 'text-red-600' :
                                            product.stock < 3 ? 'text-amber-600' : 'text-green-600'
                                        }`}>
                                        {product.stock} عدد
                                    </div>
                                    {product.stock === 0 && (
                                        <div className="text-xs text-red-500">ناموجود</div>
                                    )}
                                    {product.stock > 0 && product.stock < 3 && (
                                        <div className="text-xs text-amber-500">موجودی کم</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* مشخصات فنی */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <h3 className="font-semibold mb-4 text-gray-900">مشخصات فنی</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                <Weight size={20} className="text-blue-500" />
                                <div>
                                    <div className="text-sm text-gray-600">وزن</div>
                                    <div className="font-medium">{product.weight} کیلوگرم</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                <Layers size={20} className="text-blue-500" />
                                <div>
                                    <div className="text-sm text-gray-600">ضخامت</div>
                                    <div className="font-medium">{product.thickness} میلی‌متر</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                <Zap size={20} className="text-green-500" />
                                <div>
                                    <div className="text-sm text-gray-600">جنس مواد</div>
                                    <div className="font-medium">{getMaterialLabel(product.material)}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                <RulerIcon size={20} className="text-green-500" />
                                <div>
                                    <div className="text-sm text-gray-600">ارتفاع پرز</div>
                                    <div className="font-medium">{product.pileHeight} میلی‌متر</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                <Palette size={20} className="text-purple-500" />
                                <div>
                                    <div className="text-sm text-gray-600">رنگ اصلی</div>
                                    <div className="font-medium">{product.primaryColor}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                <Palette size={20} className="text-purple-500" />
                                <div>
                                    <div className="text-sm text-gray-600">رنگ فرعی</div>
                                    <div className="font-medium">{product.secondaryColor}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg col-span-2">
                                <Star size={20} className="text-amber-500" />
                                <div>
                                    <div className="text-sm text-gray-600">تراکم گره</div>
                                    <div className="font-medium">{getKnotDensityLabel(product.knotDensity)}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="text-sm text-gray-600">طرح</div>
                                    <div className="font-medium">{product.pattern}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="text-sm text-gray-600">وضعیت</div>
                                    <div className="font-medium">{getConditionLabel(product.condition)}</div>
                                </div>
                            </div>

                            {product.age && (
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg col-span-2">
                                    <Calendar size={20} className="text-gray-500" />
                                    <div>
                                        <div className="text-sm text-gray-600">قدمت</div>
                                        <div className="font-medium">{product.age} سال</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* توضیحات */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <h3 className="font-semibold mb-4 text-gray-900">توضیحات محصول</h3>
                        <p className="text-gray-700 leading-relaxed text-justify">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}