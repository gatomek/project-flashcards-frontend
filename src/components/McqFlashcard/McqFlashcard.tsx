import styles from './McqFlashcard.module.css';
import {useEffect, useState} from 'react';
import type {Flashcard, FlashcardProps, Option} from '../Flashcard/Flashcard.types.ts';
import type {Summary} from '../Board/Board.types.ts';
import Markdown from 'react-markdown';
import {SquareButton} from "../SquareButton/SquareButton.tsx";

const calcValidState = (card: Flashcard) => {
    const valid: string[] = [];
    card.answer.options.forEach((o) => o.id && valid.push(o.id));
    return valid;
};

const isActive = (state: string[], id: string) => state.find((s) => s === id);

const isValid = (validState: string[], id: string) => validState.find((s) => s === id);

export function McqFlashcard(props: Readonly<FlashcardProps>) {
    const {card, index, size, title, onNext, onCancel, onRate} = props;

    const [state, setState] = useState<string[]>([]);
    const [finished, setFinished] = useState(false);
    const [result, setResult] = useState<undefined | boolean>();

    useEffect(() => {
        setFinished(false);
    }, [card]);

    useEffect(() => {
        setState([]);
    }, [card]);

    useEffect(() => {
        setResult(undefined);
    }, [card]);

    const validState = calcValidState(card);
    const options = card.query.options;

    const checkAnswer = () => {
        setResult(JSON.stringify(state.toSorted()) === JSON.stringify(validState.toSorted()));
        setFinished(true);
    };

    const evaluate = (uuid: string, r: keyof Summary) => {
        onRate(uuid, r);
        onNext();
    };

    const toggle = (id: string) => {
        if (finished) {
            return;
        }

        const active = isActive(state, id);
        const newState = active ? state.filter((s) => s !== id) : [...state, id];
        setState(newState);
    };

    const evaluateAnswer = (id: string) => {
        const answer = state.find((s) => s === id);
        const pattern = validState.find((s) => s === id);

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
    };

    const reload = () => {
        setFinished(false);
        setState([]);
        setResult(undefined);
    };

    const calcClassNameForButton = (id: string) =>
        [isActive(state, id) ? styles.active : '', finished && evaluateAnswer(id)].join(' ');

    const calcClassNameForIndicator = (id: string) =>
        [finished && isValid(validState, id) ? styles.correctState : styles.normalState].join(' ');

    const showNotes = () => {};

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div style={{display: 'flex'}}>
                    <SquareButton disabled onClick={() => {}}>
                        {index + 1}/{size}
                    </SquareButton>
                    <SquareButton disabled={!finished} onClick={() => reload()}>
                        ⭮
                    </SquareButton>
                    <SquareButton disabled onClick={() => showNotes()}>
                        𝒊
                    </SquareButton>
                    <SquareButton onClick={() => onCancel()}>
                        Powrót do <br/> talii {title}
                    </SquareButton>
                </div>
            </div>
            <div className={styles.mid}>
                <div className={styles.container}>
                    <div className={styles.top} style={{backgroundColor: 'white'}}></div>
                    <div className={styles.mid}>
                        <div className={styles.card}>
                            <Markdown>{card.query.main}</Markdown>
                            {options.map((o: Option) => (
                                <div key={o.id} className={styles.option}>
                                    <span className={styles.id}>{o.id}.</span>
                                    <Markdown>{o.content}</Markdown>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.bottom} style={{backgroundColor: 'white', zIndex: 10}}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                width: '100%',
                                backgroundColor: result === true ? '#E1FFD6' : result === false ? '#FFDFDD' : ''
                            }}
                        >
                            {options.map((o: Option) => (
                                <div
                                    key={o.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        paddingBottom: '0.5rem'
                                    }}
                                >
                                    <SquareButton className={calcClassNameForButton(o.id)} onClick={() => toggle(o.id)}>
                                        {o.id}
                                    </SquareButton>
                                    <div
                                        className={calcClassNameForIndicator(o.id)}
                                        style={{width: '75px', height: '10px'}}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div>
                    {!finished && (
                        <SquareButton onClick={() => checkAnswer()}>
                            Pokaż
                        </SquareButton>
                    )}
                </div>
                <div>
                    {finished && (
                        <>
                            <SquareButton onClick={() => evaluate(card.uuid, 'failed')}>
                                FAILED
                            </SquareButton>
                            <SquareButton onClick={() => evaluate(card.uuid, 'again')}>
                                AGAIN
                            </SquareButton>
                            <SquareButton onClick={() => evaluate(card.uuid, 'ok')}>
                                OK
                            </SquareButton>
                            <SquareButton onClick={() => evaluate(card.uuid, 'good')}>
                                GOOD
                            </SquareButton>
                            <SquareButton onClick={() => evaluate(card.uuid, 'perfect')}>
                                PERFECT
                            </SquareButton>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
