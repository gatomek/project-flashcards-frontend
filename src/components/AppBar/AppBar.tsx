import {Login} from '../Login/Login.tsx';
import styles from './AppBar.module.css';

export function AppBar() {
    return (
        <div className={styles.root}>
            <div className={styles.label}>
                <h1>
                    Flashcards {APP_VERSION} [{COMMIT_HASH}]
                </h1>
            </div>
            <div>
                <Login />
            </div>
        </div>
    );
}
