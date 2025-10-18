"use client";

import { useEffect, useState } from "react";

interface Colors {
    [key: string]: string; // کلید: نام رنگ، مقدار: RGB جدا شده با فاصله
}

export default function DynamicColors() {
    const [colors, setColors] = useState<Colors | null>(null);

    useEffect(() => {
        // 🔹 شبیه‌سازی fetch از API
        const fetchColorsFromAPI = async () => {
            try {
                const apiColors: Colors = {
                    primary: "194 28 200",
                    secondary: "200 28 150",
                };

                setColors(apiColors);
            } catch (error) {
                console.error("خطا در دریافت رنگ‌ها:", error);
            }
        };

        fetchColorsFromAPI();
    }, []);

    useEffect(() => {
        if (!colors) return;

        Object.keys(colors).forEach((key) => {
            document.documentElement.style.setProperty(`--color-${key}`, colors[key]);
        });
    }, [colors]);

    return null; // هیچ المانی رندر نمی‌کند
}
