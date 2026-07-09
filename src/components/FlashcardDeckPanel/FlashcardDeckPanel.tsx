import {Board} from '../Board/Board.tsx';
import {useState} from 'react';
import styles from './FlashcardDeckPanel.module.css';
import type {FlashcardDeckPanelProps} from './FlashcardDeckPanel.types.ts';
import {SquareButton} from '../SquareButton/SquareButton.tsx';

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
                    <SquareButton key={d.title} onClick={() => setIndex(index)} size={'L'}>
                        {d.title} <br />({d.cards.length})
                    </SquareButton>
                ))}
            </div>
        </div>
    );
}
