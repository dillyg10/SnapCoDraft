import React, {useEffect, useState} from "react";
import {Draft} from "../lib/draft/draft";
import {Collection} from "../lib/collection/collection";
import { PickTwoDraft } from "../lib/draft/pick-two-draft";

export type DraftContextProps = {
    draft: Draft | undefined,
    setDraft: (draft: Draft) => void,
    pickNumber: number,
    fullDeck: Collection | undefined,

    setFullDeck: (collection: Collection) => void,
    incrementPick: () => void,

    finished: boolean,

    finishDraft: () => void,
    redraft: () => void
}
export const DraftContext = React.createContext<DraftContextProps>({
    draft: undefined,
    setDraft: () => {},
    pickNumber: 0,
    finished: false,
    fullDeck: undefined,
    setFullDeck: () => {},
    incrementPick: () => {},
    finishDraft: () => {},
    redraft: () => {}
})

export const DraftContextBoundary = ({ children } : { children: React.ReactNode }) => {
    const [draft, setDraft] = useState<Draft | undefined>();
    const [pickNumber, setPickNumber] = useState<number>(0);
    const [finished, setFinished] = useState<boolean>(false);
    const [fullDeck, setFullDeck] = useState<Collection | undefined>();

    return <DraftContext.Provider value={({
        draft,
        setDraft,
        pickNumber,
        finished,
        fullDeck,
        setFullDeck,
        incrementPick: () => setPickNumber(pickNumber + 1),
        finishDraft: () => setFinished(true),
        redraft: () => {
            if (draft) {
                setPickNumber(0);
                setFinished(false);
                setFullDeck(undefined);
                draft.reset();
            }
        }
    })} >
        {children}
    </DraftContext.Provider>
}