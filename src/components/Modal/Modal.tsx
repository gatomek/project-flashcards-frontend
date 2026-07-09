import {type ReactNode, useEffect} from 'react';
import styles from './Modal.module.css';
import {createPortal} from 'react-dom';
import {SquareButton} from "../SquareButton/SquareButton.tsx";

export interface ModalProps {
    children: ReactNode;
    size: 'small' | 'medium' | 'large';
    onClick: () => void;
}

export function Modal(props: Readonly<ModalProps>) {
    const {onClick, size, children} = props;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClick();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClick]);

    const className = `${styles.dialog} ${size}`;
    return createPortal(
        <div>
            <div onClick={onClick} className={styles.backdrop}></div>
            <div className={className}>
                <div className={styles.container}>
                    <div className={styles.top}></div>
                    <div className={styles.mid}>{children}</div>
                    <div className={styles.bottom}>
                        <SquareButton onClick={onClick}>
                            OK
                        </SquareButton>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
