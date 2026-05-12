"use client";

import React from "react";
import { Input } from "../atoms/Input";

type SearchBarProps = {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
};

export function SearchBar({
    value,
    onChange,
    placeholder = "Buscar...",
}: SearchBarProps) {
    return (
        <Input
            type="search"
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            placeholder={placeholder}
        />
    );
}
