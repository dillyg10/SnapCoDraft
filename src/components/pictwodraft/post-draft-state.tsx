import React, {useContext, useEffect, useState} from "react";
import {DraftContext} from "../../contexts/draft-context";
import {
    Center,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner
} from "@chakra-ui/react";
import {PostDraftTradeDeckCodes} from "./post-draft-trade-deck-codes";
import {PostDraftDeckCode} from "./post-draft-deck-code";
import {collectionAsNames} from "../../lib/collection/collection";

export const PostDraftState = () => {
    const { fullDeck } = useContext(DraftContext);
    const [loading, setLoading] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (!fullDeck) {
            return;
        }

        console.log(collectionAsNames(fullDeck))

        if (loading === undefined) {
            setLoading(true);
            setTimeout(() => setLoading(false), 500);
        }
    }, [fullDeck, loading]);

    return <Modal isOpen={true} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent bg='draft.container.background'>
            <ModalHeader color='green.200' fontWeight='bold' fontSize='5vh'>Draft Finished!</ModalHeader>
            <ModalBody>
                {
                    loading
                        ?   <Center> <Spinner size='xl' color='white'/> </Center>
                    :   (fullDeck
                        ? <PostDraftDeckCode />
                        : <PostDraftTradeDeckCodes />)
                }
            </ModalBody>
            <ModalFooter />
        </ModalContent>
    </Modal>
}