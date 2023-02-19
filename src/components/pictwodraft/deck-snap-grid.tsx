import {SnapCardGrid, SnapCardGridProps} from "../snap-card-grid";
import React from "react";

export const DeckSnapGrid = (props: SnapCardGridProps) => {
    return <SnapCardGrid
        templateColumns='repeat(2, 1fr)'
        templateRows='repeat(3, 1fr)'
        gap={1}
        bg='draft.container.background'
        {...props}
        cards={ props.cards }
        totalcards={6}
        dropShadow='50px'
    />
}