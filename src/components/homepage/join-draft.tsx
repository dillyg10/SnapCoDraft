import {
    Button, Modal,
    ModalBody, ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Stack,
    Text
} from "@chakra-ui/react";
import {CopyTextArea} from "../shared/copy-text-area";
import {OpponentTokenInput} from "../shared/opponent-token-input";
import {PickTwoDraft} from "../../lib/draft/pick-two-draft";
import {DraftEnv} from "../../lib/draft/draft-env";
import {inverseCollection} from "../../lib/collection/collection";
import React, {useState} from "react";

export const JoinDraft = ({ onCancel } : { onCancel : () => void}) => {
    return <Modal isOpen={true} onClose={onCancel}>
        <ModalOverlay/>
        <ModalContent bg='draft.container.background'>
            <ModalHeader color='white' fontWeight='bold' fontSize='5vh'>Join Draft</ModalHeader>
            <ModalCloseButton color='white' />
            <ModalBody>
                <Text color='white'>Tell your opponent to press the "Create Draft" button and then go to the URL they send you.</Text>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' onClick={() => onCancel()}>Close</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}