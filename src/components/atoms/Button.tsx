import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
};

export function Button({
    children,
    variant = "primary",
    size = "md",
}: ButtonProps) {
    const baseStyles =
        "rounded-lg font-medium transition-all duration-200";

    const variantStyles = {
        primary:
            "bg-primary text-white hover:opacity-90",

        secondary:
            "bg-secondary text-secondary-foreground hover:opacity-90",

        danger:
            "bg-danger text-white hover:opacity-90",
    };

    const sizeStyles = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            className={`
                ${baseStyles}
                ${variantStyles[variant]}
                ${sizeStyles[size]}
            `}
        >
            {children}
        </button>
    );
}