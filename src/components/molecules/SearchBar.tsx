import React from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";

type SearchBarProps = {
    placeholder?: string;
    buttonText?: string;
};

export function SearchBar({
    placeholder = "Buscar...",
    buttonText = "Buscar",
}: SearchBarProps) {
    return (
        <div className="flex gap-2">
            <Input
                type="search"
                placeholder={placeholder}
            />

            <Button>
                {buttonText}
            </Button>
        </div>
    );
}