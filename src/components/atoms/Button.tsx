import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger" | "success";
    size?: "sm" | "md" | "lg";
};

export function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
    const baseStyles =
        "rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

    const variantStyles = {
        primary:
            "bg-primary text-white hover:opacity-90",

        secondary:
            "bg-secondary text-secondary-foreground hover:opacity-90",

        danger:
            "bg-danger text-white hover:opacity-90",

        success:
            "bg-green-600 text-white hover:opacity-90",
    };

    const sizeStyles = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            type={type}
            className={`
                ${baseStyles}
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}
