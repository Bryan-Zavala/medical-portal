import React from "react";

type InputProps = {
    id?: string;
    type?: string;
    placeholder?: string;
    className?: string;
};

export function Input({
    id,
    type = "text",
    placeholder = "",
    className = "",
}: InputProps) {
    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            className={`
                w-full
                rounded-lg
                border border-border
                bg-surface
                px-4
                py-2
                text-sm
                outline-none
                transition-all
                duration-200
                focus:border-primary
                focus:ring-2
                focus:ring-primary
                ${className}
        `}
        />
    );
}