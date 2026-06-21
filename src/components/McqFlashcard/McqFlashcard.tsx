import styles from './McqFlashcard.module.css';
import {useEffect, useState} from "react";
import type {Flashcard, FlashcardProps, Option} from "../Flashcard/Flashcard.types.ts";
import type {Summary} from "../Board/Board.types.ts";
import Markdown from 'react-markdown';

const calcValidState = (card: Flashcard) => {
    const valid: string[] = [];
    card.answer.options.forEach(o => o.id && valid.push(o.id));
    return valid;
}

const isActive = (state: string[], id: string) => state.find(s => s === id);

const isValid = (validState: string[], id: string) => validState.find(s => s === id);

export function McqFlashcard(props: Readonly<FlashcardProps>) {

    const {
        card,
        index,
        size,
        title,
        onNext,
        onCancel,
        onRate
    } = props;

    const [state, setState] = useState<string[]>([]);
    const [finished, setFinished] = useState(false);
    const [result, setResult] = useState<undefined | boolean>();

    useEffect(() => {
        setFinished(false);
    }, [card])

    useEffect(() => {
        setState([]);
    }, [card])

    useEffect(() => {
        setResult(undefined);
    }, [card])

    const validState = calcValidState(card);
    const options = card.query.options;

    const checkAnswer = () => {
        setResult(JSON.stringify(state.toSorted()) === JSON.stringify(validState.toSorted()));
        setFinished(true);
    }

    const evaluate = (uuid: string, r: keyof Summary) => {
        onRate(uuid, r);
        onNext();
    }

    const toggle = (id: string) => {
        if (finished) {
            return;
        }

        const active = isActive(state, id);
        const newState = active ? state.filter(s => s !== id) : [...state, id];
        setState(newState);
    }

    const evaluateAnswer = (id: string) => {
        const answer = state.find(s => s === id);
        const pattern = validState.find(s => s === id);

        if (answer && pattern) {
            return styles.correct;
        }

        if (answer && !pattern) {
            return styles.error;
        }

        if (!answer && pattern) {
            return styles.error;
        }

        return styles.normal;
    }

    const reload = () => {
        setFinished(false);
        setState([]);
        setResult(undefined);
    }

    const calcClassNameForButton = (id: string) => [
        styles.button,
        isActive(state, id) ? styles.active : '',
        finished && evaluateAnswer(id)
    ].join(' ')

    const calcClassNameForIndicator = (id: string) => [
        finished && isValid(validState, id) ? styles.correctState : styles.normalState
    ].join(' ')

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
                <div className={styles.container}>
                    <div className={styles.top} style={{backgroundColor: 'white'}}>
                        <div className={styles.card}>
                            <Markdown>{card.query.main}</Markdown>
                            {
                                options.map((o: Option) =>
                                    <div key={o.id} className={styles.option}>
                                        <span className={styles.id}>{o.id}.</span>
                                        <Markdown>{o.content.join(' ')}</Markdown>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={styles.mid}>
                    </div>
                    <div className={styles.bottom} style={{backgroundColor: 'white', zIndex: 10}}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "center",
                            width: '100%',
                            backgroundColor: result === true ? '#E1FFD6' : result === false ? '#FFDFDD' : ''
                        }}>
                            {
                                options.map((o: Option) =>
                                    <div key={o.id} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        paddingBottom: "0.5rem"
                                    }}>
                                        <button
                                            className={calcClassNameForButton(o.id)}
                                            onClick={() => toggle(o.id)}
                                        >{
                                            o.id
                                        }
                                        </button>
                                        <div className={calcClassNameForIndicator(o.id)}
                                             style={{width: '75px', height: '10px'}}></div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div>
                    {
                        !finished &&
                        <button className={styles.button} onClick={() => checkAnswer()}>Pokaż</button>
                    }
                </div>
                <div>
                    {
                        finished &&
                        <>
                            <button className={styles.button} onClick={() => evaluate(card.uuid, 'failed')}>FAILED
                            </button>
                            <button className={styles.button} onClick={() => evaluate(card.uuid, 'again')}>AGAIN
                            </button>
                            <button className={styles.button} onClick={() => evaluate(card.uuid, 'ok')}>OK</button>
                            <button className={styles.button} onClick={() => evaluate(card.uuid, 'good')}>GOOD</button>
                            <button className={styles.button} onClick={() => evaluate(card.uuid, 'perfect')}>PERFECT
                            </button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}