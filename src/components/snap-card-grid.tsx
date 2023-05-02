import {SnapCard} from "../lib/snapdata/snap-card";
import { GridProps } from "@chakra-ui/layout/dist/grid";
import {Grid, GridItem} from "@chakra-ui/react";
import {SnapCardComponent, SnapCardComponentProps} from "./snap-card-component";
import React from "react";

export type SnapCardGridProps = {
    cards: (SnapCard | undefined)[],
    totalcards?: number
    cardclickedaction?: (card: SnapCard, index: number) => void,
    cardcomponentprops?: (card: SnapCard, index: number) => Partial<SnapCardComponentProps>
} & GridProps;
export const SnapCardGrid = ( props: SnapCardGridProps ) => {
    const cardsFitToLength = [...props.cards, ...Array((props.totalcards ?? props.cards.length ) - props.cards.length).fill(undefined)]
    const cardcomponentprops = props.cardcomponentprops ?  props.cardcomponentprops : () => ({});

    return <Grid
        height='100%'
        maxHeight='100%'
        {...props}
    >
        {cardsFitToLength.map((card, index) => {
            return <GridItem
                key={index}
                colSpan={1}
            >
                <SnapCardComponent card={card} onClick={() => {
                    if(props.cardclickedaction){
                        props.cardclickedaction(card, index)
                    }
                }} {...(cardcomponentprops(card, index))} />
            </GridItem>
        })}
    </Grid>
}