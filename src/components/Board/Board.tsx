import styles from './Board.module.css'

import {useCallback, useReducer, useState} from "react";
import {StdFlashcard} from "../StdFlashcard/StdFlashcard.tsx";
import {McqFlashcard} from "../McqFlashcard/McqFlashcard.tsx";
import type {BoardProps, Summary} from "./Board.types.ts";
import type {Flashcard, FlashcardProps} from "../Flashcard/Flashcard.types.ts";

const initialSummary: Summary = {
    failed: 0,
    again: 0,
    ok: 0,
    good: 0,
    perfect: 0
}

interface SummaryAction {
    type: 'increment' | 'reset' | 'reset_all';
    payload: keyof Summary;
}

const summaryReducer = (state: Summary, action: SummaryAction) => {
    const {type, payload} = action;
    switch (type) {
        case 'increment':
            return {
                ...state,
                [payload]: state[payload] + 1
            };
        case 'reset':
            return {
                ...state,
                [payload]: 0
            };
        default:
            return state;
    }
}

const shuffle = (cards: Flashcard[]): Flashcard[] => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

export function Board(props: Readonly<BoardProps>) {
    const {
        flashcardDeck
    } = props;

    const size = flashcardDeck.cards.length;

    const [index, setIndex] = useState(0);
    const [run, setRun] = useState(false);
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

    const [summary, setSummary] = useReducer(summaryReducer, initialSummary);

    const onNext = useCallback(() => {
        setIndex(prev => prev + 1);
    }, []);

    const onCancel = useCallback(() => {
        setRun(false);
        setIndex(0);
    }, []);

    const onRate = useCallback((uuid: string, rate: keyof Summary) => {
        setSummary({type: 'increment', payload: rate});
        console.log(uuid + ': ' + rate);
    }, [])

    if (!run) {
        return (
            <div className={styles.root}>
                <h1>Talia {flashcardDeck.title} ({size})</h1>
                <div className={styles.flexrow}>
                    <button className={styles.button} onClick={() => props.setIndex(undefined)}>
                        Powrót do listy talii
                    </button>
                    <button className={styles.button} onClick={() => {
                        setRun(true);
                        setSummary({type: 'reset_all', payload: 'ok'});
                        setFlashcards(shuffle(flashcardDeck.cards));
                    }}>
                        Start
                    </button>
                </div>
            </div>
        )
    }

    if (index === size) {
        return (
            <div className={styles.root}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th className={styles.cell}>FAILED</th>
                        <th className={styles.cell}>AGAIN</th>
                        <th className={styles.cell}>OK</th>
                        <th className={styles.cell}>GOOD</th>
                        <th className={styles.cell}>PERFECT</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={styles.cell}>{summary.failed}</td>
                        <td className={styles.cell}>{summary.again}</td>
                        <td className={styles.cell}>{summary.ok}</td>
                        <td className={styles.cell}>{summary.good}</td>
                        <td className={styles.cell}>{summary.perfect}</td>
                    </tr>
                    </tbody>
                </table>
                <button className={styles.button} onClick={() => onCancel()}>Koniec</button>
            </div>
        )
    }

    const flashcard = flashcards[index];

    const ps: FlashcardProps = {
        card: flashcard,
        index: index,
        size: size,
        onNext: onNext,
        onCancel: onCancel,
        onRate: onRate,
        title: flashcardDeck.title
    };

    return (
        <div className={styles.root}>
            {
                flashcard.type === 'std' ? <StdFlashcard {...ps}/> : <McqFlashcard {...ps}/>
            }
        </div>
    )
}
