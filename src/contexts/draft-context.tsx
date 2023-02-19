import React, {useEffect, useState} from "react";
import {Draft} from "../lib/draft/draft";
import {Collection} from "../lib/collection/collection";

export type DraftContextProps = {
    draft: Draft | undefined,
    pickNumber: number,
    fullDeck: Collection | undefined,

    setFullDeck: (collection: Collection) => void,
    incrementPick: () => void,

    finished: boolean,

    finishDraft: () => void
}
export const DraftContext = React.createContext<DraftContextProps>({
    draft: undefined,
    pickNumber: 0,
    finished: false,
    fullDeck: undefined,
    setFullDeck: () => {},
    incrementPick: () => {},
    finishDraft: () => {},
})

export const DraftContextBoundary = ({ draftProvider, children } : { draftProvider: () => Draft, children: React.ReactNode }) => {
    const [draft, setDraft] = useState<Draft | undefined>();
    const [pickNumber, setPickNumber] = useState<number>(0);
    const [finished, setFinished] = useState<boolean>(false);
    const [fullDeck, setFullDeck] = useState<Collection | undefined>();

    useEffect(() => {
        if (!draft) {
            setDraft(draftProvider())
        }
    }, [draft])

    return <DraftContext.Provider value={({
        draft,
        pickNumber,
        finished,
        fullDeck,
        setFullDeck,
        incrementPick: () => setPickNumber(pickNumber + 1),
        finishDraft: () => setFinished(true)
    })} >
        {children}
    </DraftContext.Provider>
}