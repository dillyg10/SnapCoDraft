import {SnapCard} from "../lib/snapdata/snap-card";
import { GridProps } from "@chakra-ui/layout/dist/grid";
import {Grid, GridItem} from "@chakra-ui/react";
import {SnapCardComponent} from "./snap-card-component";
import React from "react";

export type SnapCardGridProps = { cards: (SnapCard | undefined)[] } & GridProps;
export const SnapCardGrid = ( props: SnapCardGridProps ) => {
    return <Grid
        {...props}
    >
        {props.cards.map((card, index) => {
            return <GridItem
                colSpan={1}
            >
                <SnapCardComponent card={card}/>
            </GridItem>
        })}
    </Grid>
}