import {type ReactNode, useRef} from "react";
import * as React from "react";

type Props = {
    isOpen: boolean,
    title?: string,
    children?: ReactNode;
    onClose: () => void;
}

export const Popup = ( { isOpen, title, children, onClose }: Props) => {
    const backdropRef = useRef<HTMLDivElement>(null);
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === backdropRef.current) {
            onClose();
        }
    };

    if (!isOpen) return null;


    return (
        <div
            ref={backdropRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <div className="relative bg-white p-6 rounded-lg shadow-xl">
                {title && <h3 className="text-md font-medium mb-4">{title}</h3>}
                <div className="flex justify-end space-x-3">
                    {children}
                </div>
            </div>
        </div>
    );
}
