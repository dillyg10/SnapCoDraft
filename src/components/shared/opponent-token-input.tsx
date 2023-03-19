import React, {useEffect, useState} from "react";
import {createDraftToken, DraftToken, marshallDraftToken, unmarshallDraftToken} from "../../lib/draft/draft-token";
import {unmarshallCollection} from "../../lib/collection/collection";
import {FormControl, FormLabel, ModalFooter, Stack, Text, Textarea} from "@chakra-ui/react";
import {CopyTextArea} from "./copy-text-area";

export const OpponentTokenInput = ({ seed, onValidTokenInput } : { seed: string, onValidTokenInput: (token: DraftToken) => void}) => {
    const [opponentDeckCodeInput, setOpponentDeckCodeInput] = useState<string>('');
    const [opponentDeckCodeInputErr, setOpponentDeckCodeInputErr] = useState<string | undefined>();
    useEffect(() => {
        if (opponentDeckCodeInput === '') return;

        try {
            const token = unmarshallDraftToken(opponentDeckCodeInput);
            if (token.seed !== seed) {
                setOpponentDeckCodeInputErr("This token isn't from this draft.");
                return;
            }
            onValidTokenInput(token);
            setOpponentDeckCodeInputErr(undefined);
        } catch (err) {
            console.log(err);
            setOpponentDeckCodeInputErr('Invalid code');
        }
    }, [opponentDeckCodeInput])

    return <Stack direction='column' color='white'>
        <Text>Paste code from your opponent</Text>
        <FormControl>
            <Textarea
                value={opponentDeckCodeInput}
                onChange={e => setOpponentDeckCodeInput(e.target.value)}
                isInvalid={Boolean(opponentDeckCodeInputErr)}
            />
            { opponentDeckCodeInputErr ? <FormLabel color='red'>{opponentDeckCodeInputErr}</FormLabel> : <></> }
        </FormControl>
    </Stack>
}