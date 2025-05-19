import type { ComponentProps, ReactNode } from "react";

type Props = {
    label: ReactNode;
} & ComponentProps<'button'>;

export const Button = ( { label, className, ...rest }: Props ) => {
    return (
        <button {...rest} className={className ? className : 'bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 transition-colors'}>
            { label }
        </button>
    )
}
