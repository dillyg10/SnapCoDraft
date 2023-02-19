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

export const PostDraftTradeDeckCodes = () => {
    const {draft, setFullDeck} = useContext(DraftContext);
    const [opponentDeckCodeInput, setOpponentDeckCodeInput] = useState<string>('');
    const [opponentDeckCodeInputErr, setOpponentDeckCodeInputErr] = useState<string | undefined>();
    useEffect(() => {
        if (opponentDeckCodeInput === '') return;

        try {
            const token = unmarshallDraftToken(opponentDeckCodeInput);
            if (token.seed !== draft?.env.seed) {
                setOpponentDeckCodeInputErr("This token isn't from this draft.");
                return;
            }

            const collection = unmarshallCollection(token.collectionIds, draft.env.repository);
            console.log('Collection');
            console.log(token.collectionIds);
            console.log(collectionAsNames(collection));
            setFullDeck([...draft.draftState.playerDeck, ...collection]);
        } catch (err) {
            console.log(err);
            setOpponentDeckCodeInputErr('Invalid code');
        }
    }, [opponentDeckCodeInput])

    if (!draft) {
        return <></>
    }
    const tokenText = marshallDraftToken(createDraftToken(draft.draftState.opponentDeck, draft.env.repository, draft.env.seed));


    return <Stack direction='column' color='white'>
                <Text>Copy this and give it to your opponent</Text>
                <Textarea
                    contentEditable={false}
                    value={tokenText}
                    readOnly
                />
                <Flex>
                    <Spacer />
                    <Button
                        onClick={() => navigator.clipboard.writeText(tokenText)}
                        colorScheme='blue'><CopyIcon paddingRight={1}/>Copy Code</Button>
                </Flex>
                <Text>Paste code from your opponent</Text>
                <FormControl>
                    <Textarea
                        value={opponentDeckCodeInput}
                        onChange={e => setOpponentDeckCodeInput(e.target.value)}
                        isInvalid={Boolean(opponentDeckCodeInputErr)}
                    />
                    { opponentDeckCodeInputErr ? <FormLabel color='red'>{opponentDeckCodeInputErr}</FormLabel> : <></> }
                </FormControl>
                <ModalFooter />
            </Stack>
}