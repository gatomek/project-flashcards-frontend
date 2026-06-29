import {FlashcardDeckPanel} from "../FlashcardDeckPanel/FlashcardDeckPanel.tsx";
import type {FlashcardDeck} from "../Flashcard/Flashcard.types.ts";
import {useQuery} from "@tanstack/react-query";
import {NoDeckInfo} from "../NoDeckInfo/NoDeckInfo.tsx";
import {LoadingDeckInfo} from "../LoadingDeckInfo/LoadingDeckInfo.tsx";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
    throw new Error('Missing required environment variable: VITE_BACKEND_URL');
}

function fetchDecks(signal: AbortSignal): Promise<FlashcardDeck[]> {
    return fetch(backendUrl, {signal})
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Failed to fetch decks from ${backendUrl} (${res.status} ${res.statusText})`);
            }
        });
}

export function DeckProvider() {
    const {data, isSuccess, isPending} = useQuery<FlashcardDeck[]>({
        queryKey: ['decks'],
        queryFn: ({signal}) => fetchDecks(signal)
    })

    if (isPending) {
        return (
            <LoadingDeckInfo/>
        )
    }

    if (!isSuccess) {
        return (
            <NoDeckInfo/>
        )
    }

    return (
        data && <FlashcardDeckPanel flashcardDecks={data}/>
    )
}
