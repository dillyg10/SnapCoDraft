import {SnapCardGrid, SnapCardGridProps} from "../snap-card-grid";
import React, {useContext} from "react";
import {DraftContext} from "../../contexts/draft-context";
import {DraftStatus} from "../../lib/draft/draft";

export const PlayerPickAreaGrid = (props: SnapCardGridProps) => {
    const { draft, incrementPick, finishDraft } = useContext(DraftContext);
    return <SnapCardGrid
        templateColumns='repeat(2, 1fr)'
        templateRows='repeat(1, 1fr)'
        gap={1}
        bg='draft.container.background'
        {...props}
        cards={ props.cards }
        totalcards={2}
        cardclickedaction={ (card, index) => {
            if(draft) {
                if (draft.pickCard(index) === DraftStatus.CONCLUDED) {
                    finishDraft();
                }
                incrementPick();
            }
        }}
        cardcomponentprops={
            {showText: true}
        }
    />
}