import {Board} from '../Board/Board.tsx';
import {useState} from 'react';
import styles from './FlashcardDeckPanel.module.css';
import type {FlashcardDeckPanelProps} from './FlashcardDeckPanel.types.ts';

export function FlashcardDeckPanel(props: Readonly<FlashcardDeckPanelProps>) {
    const [index, setIndex] = useState<undefined | number>();
    const decks = props.flashcardDecks.toSorted((a, b) => a.title.localeCompare(b.title));

    if (index != undefined) {
        return <Board flashcardDeck={decks[index]} setIndex={() => setIndex(undefined)} />;
    }

    return (
        <div className={styles.root}>
            <h2>Lista talii ({decks.length})</h2>
            <div>
                {' '}
                {decks.map((d, index) => (
                    <button key={d.title} className={styles.button} onClick={() => setIndex(index)}>
                        {d.title} <br />({d.cards.length})
                    </button>
                ))}
            </div>
        </div>
    );
}
