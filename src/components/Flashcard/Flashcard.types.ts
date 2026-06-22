import type {Summary} from "../Board/Board.types.ts";

export interface FlashcardProps {
    card: Flashcard;
    index: number;
    size: number;
    title: string;
    onNext: () => void;
    onCancel: () => void;
    onRate: (uuid: string, rate: keyof Summary) => void;
}

export interface Option {
    id: string;
    content: string[];
}

export interface Content {
    main: string;
    options: Option[];
    img?: string;
}

export interface Flashcard {
    name: string;
    type: string;
    uuid: string;
    query: Content;
    answer: Content;
}

export interface FlashcardDeck {
    title: string;
    cards: Flashcard[];
}
