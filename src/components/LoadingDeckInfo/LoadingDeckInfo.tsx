import styles from './LoadingDeckInfo.module.css';
import {RotateLoader} from 'react-spinners';

export function LoadingDeckInfo() {
    return (
        <div className={styles.root}>
            <RotateLoader color={'gray'} size={10} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    );
}
