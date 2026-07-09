import {Login} from '../Login/Login.tsx';
import styles from './AppBar.module.css';
import {useState} from 'react';
import {Modal} from '../Modal/Modal.tsx';
import {SquareButton} from "../SquareButton/SquareButton.tsx";

const infoContent =
    <div className={styles.infoContainer}>
        <div className={styles.info}>
            <div className={styles.infoTitle}>Frontend</div>
            <div className={styles.infoItem}>Version: {APP_VERSION}</div>
            <div className={styles.infoItem}>GitHash: {COMMIT_HASH}</div>
        </div>
    </div>

export function AppBar() {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <>
            <div className={styles.root}>
                <SquareButton onClick={() => {
                    setShowInfo(true);
                }}>
                    <div className={styles.label}>
                        <h1>Flashcards</h1>
                    </div>
                </SquareButton>
                <div>
                    <Login/>
                </div>
            </div>
            {showInfo && (
                <Modal onClick={() => setShowInfo(false)} size={"medium"}> {
                    infoContent
                }
                </Modal>
            )}
        </>
    );
}
