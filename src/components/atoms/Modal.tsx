import React from "react";

type ModalProps = {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
};

export function Modal({
    isOpen,
    title,
    children,
    onClose,
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-black/50
                px-4
            "
        >
            <div
                className="
                    w-full max-w-lg
                    rounded-lg
                    bg-surface
                    p-6
                    shadow-md
                "
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Cerrar modal"
                        className="
                            rounded-lg
                            px-2 py-1
                            text-muted
                            hover:bg-secondary
                            focus:outline-none
                            focus:ring-2
                            focus:ring-primary
                        "
                    >
                        ×
                    </button>
                </div>

                <div>{children}</div>
            </div>
        </div>
    );
}