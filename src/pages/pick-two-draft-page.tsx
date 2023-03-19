import {
    Box, Button,
    Grid,
    GridItem,
    Image,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {DeckSnapGrid} from "../components/pictwodraft/deck-snap-grid";
import React, {useContext, useEffect} from "react";
import {DraftContext} from "../contexts/draft-context";
import {PlayerPickAreaGrid} from "../components/pictwodraft/player-pick-area-grid";
import {NameTag} from "../components/pictwodraft/name-tag";
import {PostDraftTradeDeckCodes} from "../components/pictwodraft/post-draft-trade-deck-codes";
import {PostDraftState} from "../components/pictwodraft/post-draft-state";
import {useNavigate} from "react-router-dom";

export const PickTwoDraftPage = () => {
    const {draft, finished} = useContext(DraftContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!draft) {
            navigate('/');
        }
    }, [draft])
    if (!draft) {
        return <></>
    }
    // onOpen();

    return <>
    <Grid
        templateRows='repeat(9, 1fr)'
        templateColumns='repeat(6, 1fr)'
        gap={15}
        paddingY={4}
        paddingX={10}
        maxHeight='100vh'
    >
        <GridItem rowSpan={9} colSpan={2} colStart={1}>
            <DeckSnapGrid
                cards={draft.draftState.playerDeck} />
        </GridItem>
        <GridItem rowSpan={4} colStart={3} rowStart={3} colSpan={2}>
            <PlayerPickAreaGrid cards={draft.pickState.choices} />
        </GridItem>
        <GridItem rowSpan={9} colSpan={2} colStart={5}>
            <DeckSnapGrid
                cards={draft.draftState.opponentDeck} />
        </GridItem>
        <GridItem dropShadow='lg' borderRadius={3} rowSpan={1} rowStart={1} colSpan={1} colStart={3} width='70%' bg='blue.800'>
            <NameTag self />
        </GridItem>

        <GridItem dropShadow='lg' borderRadius={3} rowSpan={1} rowStart={1} colSpan={1} colStart={4} float='right' bg='red.800'>
            <NameTag />
        </GridItem>
    </Grid>
        { finished ? <PostDraftState /> : <></> }
    </>
}