import React, {useContext, useEffect, useState} from "react";
import {DraftContext} from "../../contexts/draft-context";
import {
    Button, EditableTextarea, Flex, FormControl, FormErrorMessage, FormLabel, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Spacer, Stack,
    Text, Textarea, useDisclosure
} from "@chakra-ui/react";
import {createDraftToken, marshallDraftToken, unmarshallDraftToken} from "../../lib/draft/draft-token";
import {CopyIcon} from "@chakra-ui/icons";
import {Collection, collectionAsNames, unmarshallCollection} from "../../lib/collection/collection";
import {CopyTextArea} from "../shared/copy-text-area";
import {OpponentTokenInput} from "../shared/opponent-token-input";

export const PostDraftTradeDeckCodes = () => {
    const {draft, setFullDeck} = useContext(DraftContext);

    if (!draft) {
        return <></>
    }
    const tokenText = marshallDraftToken(createDraftToken(draft.draftState.opponentDeck, draft.env.repository, draft.env.seed));

    return <Stack direction='column' color='white'>
                <Text>Copy this and give it to your opponent</Text>
                <CopyTextArea text={tokenText} />
                <OpponentTokenInput seed={draft.env.seed} onValidTokenInput={(token) => {
                        const collection = unmarshallCollection(token.collectionIds, draft.env.repository);
                        setFullDeck([...draft.draftState.playerDeck, ...collection]);
                    }
                }/>
                <ModalFooter />
            </Stack>
}