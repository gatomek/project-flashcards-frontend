import type {FlashcardDeck} from '../Flashcard/Flashcard.types.ts';

export interface BoardProps {
    flashcardDeck: FlashcardDeck;
    setIndex: (value: undefined | number) => void;
}

export interface Summary {
    failed: number;
    again: number;
    ok: number;
    good: number;
    perfect: number;
}
