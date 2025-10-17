"use client";

import { cn } from "@/utils/utils";
import { Loader2 } from "lucide-react";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    loadingText?: string;
    icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            className,
            variant = "primary",
            size = "md",
            loading = false,
            loadingText = "در حال پردازش",
            icon,
            ...props
        },
        ref
    ) => {
        const base =
            "inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 ease-in-out-soft focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

        const variantsMap = {
            primary: "bg-primary text-white hover:bg-primary-hover focus:ring-primary",
            outline:
                "border border-primary text-primary hover:bg-primary/10 focus:ring-primary",
            ghost:
                "text-primary hover:bg-primary/10 focus:ring-primary focus:ring-offset-1",
            destructive:
                "bg-error text-white hover:bg-error/90 focus:ring-error focus:ring-offset-1",
        };

        const sizesMap = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-base",
            lg: "px-6 py-3 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.97 }}
                className={cn(base, variantsMap[variant], sizesMap[size], className)}
                disabled={props.disabled || loading}
                {...props}
            >
                <div className="flex items-center justify-center">
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>{loadingText}</span>

                        </>
                    ) : (
                        icon ? <span className="mr-2">{icon}</span> : null
                    )}
                    <span>{children as React.ReactNode}</span>
                </div>
            </motion.button>


        );
    }
);

Button.displayName = "Button";
