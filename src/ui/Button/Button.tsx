import type { ComponentProps, ReactNode } from "react";

type Props = {
    label: ReactNode;
} & ComponentProps<'button'>;

export const Button = ( { label, className, ...rest }: Props ) => {
    const baseClasses = "cursor-pointer transition-colors";
    const defaultStyle = "bg-blue-500 hover:bg-blue-600 text-white px-6 py-3";

    const combinedClassName = `${baseClasses} ${className || defaultStyle}`;

    return (
        <button {...rest} className={combinedClassName}>
            { label }
        </button>
    )
}
