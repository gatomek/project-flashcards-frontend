import styles from './SquareButton.module.css';
import type {ReactNode} from 'react';

export interface SquareButtonProps {
    children: ReactNode;
    onClick: () => void;
    size?: 'M' | 'L';
    disabled?: boolean;
    className?: string;
}

export function SquareButton(props: Readonly<SquareButtonProps>) {
    const cn = [styles.button, props.className ?? '', props.size === 'L' ? styles.large : ''].join(' ');
    return (
        <button disabled={props.disabled} className={cn} onClick={props.onClick}>
            {props.children}
        </button>
    );
}
