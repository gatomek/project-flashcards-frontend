import styles from './StdFlashcard.module.css';
import {useState} from "react";
import type {FlashcardProps} from "../Flashcard/Flashcard.types.ts";
import type {Summary} from "../Board/Board.types.ts";
import Markdown from 'react-markdown';

export function StdFlashcard(props: Readonly<FlashcardProps>) {
    const {
        card,
        index,
        size,
        title,
        onNext,
        onCancel,
        onRate
    } = props;

    const [finished, setFinished] = useState(false);

    const evaluate = (uuid: string, r: keyof Summary) => {
        onRate(uuid, r);
        onNext();
    }

    const reload = () => {
        setFinished(false);
    }

    const showNotes = () => {
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div style={{display: 'flex'}}>
                    <button className={styles.button} disabled onClick={() => {
                    }}>{index + 1}/{size}</button>
                    <button className={styles.button} disabled={!finished} onClick={() => reload()}>⭮</button>
                    <button className={styles.button} disabled onClick={() => showNotes()}>𝒊</button>
                    <button className={styles.button} onClick={() => onCancel()}>Powrót do talii {title}</button>
                </div>
            </div>
            <div className={styles.mid}>
                <div className={styles.card}>

                    <div className={styles.middle}>
                        <h3>
                            <Markdown>{card.query.main}</Markdown>
                        </h3>
                    </div>
                    <hr className={styles.hr}/>
                    <div className={styles.middle}>{finished && <h3><Markdown>{card.answer.main}</Markdown></h3>}</div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div style={{display: 'flex'}}>
                    <div> {
                        !finished && <button className={styles.button} onClick={() => setFinished(true)}>Pokaż</button>
                    }
                    </div>
                    <div style={{display: 'flex'}}>
                        {
                            finished &&
                            <div>
                                <button className={styles.button} onClick={() => evaluate(card.uuid, 'failed')}>FAILED
                                </button>
                                <button className={styles.button} onClick={() => evaluate(card.uuid, 'again')}>AGAIN
                                </button>
                                <button className={styles.button} onClick={() => evaluate(card.uuid, 'ok')}>OK</button>
                                <button className={styles.button} onClick={() => evaluate(card.uuid, 'good')}>GOOD
                                </button>
                                <button className={styles.button}
                                        onClick={() => evaluate(card.uuid, 'perfect')}>PERFECT
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}