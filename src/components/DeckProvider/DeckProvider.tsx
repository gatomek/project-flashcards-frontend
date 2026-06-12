import {FlashcardDeckPanel} from "../FlashcardDeckPanel/FlashcardDeckPanel.tsx";
import type {FlashcardDeck} from "../Flashcard/Flashcard.types.ts";
import {useQuery} from "@tanstack/react-query";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
    throw new Error('Missing required environment variable: VITE_BACKEND_URL');
}

function fetchDecks() : Promise<FlashcardDeck[]> {
    return fetch(backendUrl)
        .then((res) => res.json());
}

export function DeckProvider( ) {
    const { data } = useQuery<FlashcardDeck[]>({
        queryKey: ['decks'],
        queryFn: () => fetchDecks()
    })

    return (
        data && <FlashcardDeckPanel flashcardDecks={data}/>
    )
}
