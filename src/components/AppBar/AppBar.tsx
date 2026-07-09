import {Login} from '../Login/Login.tsx';
import styles from './AppBar.module.css';
import {useState} from 'react';
import {Modal} from '../Modal/Modal.tsx';

const commitHash = COMMIT_HASH;
const appVersion = APP_VERSION;

export function AppBar() {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <>
            <div className={styles.root}>
                <button
                    className={styles.button}
                    onClick={() => {
                        setShowInfo(true);
                    }}
                >
                    <div className={styles.label}>
                        <h1>Flashcards</h1>
                    </div>
                </button>
                <div>
                    <Login />
                </div>
            </div>
            {showInfo && (
                <Modal
                    onClick={() => {
                        setShowInfo(false);
                    }}
                    size={'large'}
                >
                    <div className={styles.infoContainer}>
                        <div className={styles.info}>
                            <div className={styles.infoTitle}>Frontend</div>
                            <div className={styles.infoItem}>Version: {appVersion}</div>
                            <div>GitHash: {commitHash}</div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
