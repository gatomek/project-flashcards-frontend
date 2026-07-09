import styles from './StdFlashcard.module.css';
import {useEffect, useState} from 'react';
import type {FlashcardProps} from '../Flashcard/Flashcard.types.ts';
import type {Summary} from '../Board/Board.types.ts';
import Markdown from 'react-markdown';
import {Modal} from '../Modal/Modal.tsx';
import rehypeExternalLinks from 'rehype-external-links';
import {SquareButton} from "../SquareButton/SquareButton.tsx";

export function StdFlashcard(props: Readonly<FlashcardProps>) {
    const {card, index, size, title, onNext, onCancel, onRate} = props;

    const [finished, setFinished] = useState(false);
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    useEffect(() => {
        setFinished(false);
    }, [card]);

    const evaluate = (uuid: string, r: keyof Summary) => {
        onRate(uuid, r);
        onNext();
    };

    const reload = () => {
        setFinished(false);
    };

    const showNotes = () => {
        setIsInfoVisible(true);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div style={{display: 'flex'}}>
                        <SquareButton disabled onClick={() => {}}>
                            {index + 1}/{size}
                        </SquareButton>
                        <SquareButton disabled={!finished} onClick={() => reload()}>
                            ⭮
                        </SquareButton>
                        <SquareButton disabled={!finished || card.info == null} onClick={showNotes}>
                            𝒊
                        </SquareButton>
                        <SquareButton onClick={() => onCancel()}>
                            Powrót do <br/> talii {title}
                        </SquareButton>
                    </div>
                </div>
                <div className={styles.mid}>
                    <div className={styles.card}>
                        <div className={styles.middle}>
                            {card.img && (
                                <img
                                    src={card.img}
                                    className={styles.img}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    aria-hidden="true"
                                />
                            )}
                            <h3>
                                <Markdown>{card.query.main}</Markdown>
                            </h3>
                        </div>
                        <hr className={styles.hr} />
                        <div className={styles.middle}>
                            {finished && (
                                <h3>
                                    <Markdown>{card.answer.main}</Markdown>
                                </h3>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div style={{display: 'flex'}}>
                        <div>
                            {' '}
                            {!finished && (
                                <SquareButton onClick={() => setFinished(true)}>
                                    Pokaż
                                </SquareButton>
                            )}
                        </div>
                        <div style={{display: 'flex'}}>
                            {finished && (
                                <div>
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
                                    <SquareButton  onClick={() => evaluate(card.uuid, 'perfect')}>
                                        PERFECT
                                    </SquareButton>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isInfoVisible && card.info != null && (
                <Modal onClick={() => setIsInfoVisible(false)} size={'large'}>
                    <Markdown
                        rehypePlugins={[[rehypeExternalLinks, {target: '_blank', rel: ['noopener', 'noreferrer']}]]}
                    >
                        {card.info}
                    </Markdown>
                </Modal>
            )}
        </>
    );
}
