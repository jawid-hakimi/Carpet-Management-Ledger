// src/components/ui/PageHeader.tsx
"use client";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
    title: string;
    description?: string;
    showBackButton?: boolean;
    showNextButton?: boolean;
    showHomeIcon?: boolean;
    backUrl?: string;
}

export function PageHeader({
    title,
    description,
    showBackButton = true,
    showNextButton = true,
    showHomeIcon = false,
    backUrl
}: PageHeaderProps) {
    const router = useRouter();

    const handleBack = () => {
        if (backUrl) {
            router.push(backUrl);
        } else {
            router.back();
        }
    };

    const handleNext = () => {
        router.forward();
    };

    const handleHome = () => {
        router.push('/');
    };

    return (
        <div className="relative mb-6">
            {/* Background decoration */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-teal-300 to-cyan-300 rounded-full opacity-60 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-tr from-teal-300 to-cyan-300 rounded-full opacity-40 blur-lg"></div>

            <div className="relative flex items-center gap-4">
                {/* Navigation buttons */}
                <div className="flex items-center gap-2">
                    {showBackButton && (
                        <button
                            onClick={handleBack}
                            className="group flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-teal-300 hover:scale-105"
                            title="بازگشت"
                        >
                            <ArrowLeft
                                size={20}
                                className="text-gray-600 group-hover:text-teal-600 transform rotate-180 transition-transform duration-300 group-hover:scale-110"
                            />
                        </button>
                    )}

                    {showHomeIcon && (
                        <button
                            onClick={handleHome}
                            className="group flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-teal-300 hover:scale-105"
                            title="صفحه اصلی"
                        >
                            <Home
                                size={20}
                                className="text-gray-600 group-hover:text-teal-600 transition-transform duration-300 group-hover:scale-110"
                            />
                        </button>
                    )}

                    {showNextButton && (
                        <button
                            onClick={handleNext}
                            className="group flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-teal-300 hover:scale-105"
                            title="بازگشت"
                        >
                            <ArrowRight
                                size={20}
                                className="text-gray-600 group-hover:text-teal-600 transform rotate-180 transition-transform duration-300 group-hover:scale-110"
                            />
                        </button>
                    )}
                </div>

                {/* Title section */}
                <div className="flex-1">

                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            {title}
                        </h1>
                    </div>

                    {description && (
                        <p className="text-gray-600 text-sm pr-4 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Bottom border gradient */}
            <div className="relative mt-6">
                <div className="h-px bg-gradient-to-r from-transparent via-teal-600 to-transparent"></div>
                {/* <div className="absolute top-0 left-1/4 w-2/12 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div> */}
            </div>
        </div>
    );
}