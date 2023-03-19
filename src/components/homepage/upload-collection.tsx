import {
    ModalBody,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    Stack,
    Button,
    Text,
    Modal,
    Input,
    FormControl, FormLabel, Spacer, Flex, InputGroup, InputRightElement, IconButton, ModalFooter
} from "@chakra-ui/react";
import React, {useState} from "react";
import {Form} from "react-router-dom";
import {DragDropFile} from "../drag-drop-file";
import {CopyIcon} from "@chakra-ui/icons";

export const UploadCollection = ({ onCollectionUploaded } : { onCollectionUploaded : (collection: string) => void}) => {
    const path = '%appdata%\\LocalLow\\Second Dinner\\SNAP\\Standalone\\States\\mvprod\\CollectionState.json';
    return <Modal isOpen={true} onClose={() => {}}>
        <ModalOverlay/>
        <ModalContent bg='draft.container.background'>
            <ModalHeader color='white' fontWeight='bold' fontSize='5vh'>Upload your collection</ModalHeader>
            <ModalBody>
                <Stack>
                    <Text color='white'>Find your collection at </Text>
                    <InputGroup size="md">
                        <Input readOnly value={path} textColor='white'/>
                        <InputRightElement>
                            <IconButton aria-label='copy' icon={<CopyIcon />} h="1.75rem" size="sm" onClick={() => navigator.clipboard.writeText(path)} />
                        </InputRightElement>
                    </InputGroup>
                    <DragDropFile onFileUploaded={onCollectionUploaded} accept=".json"/>
                </Stack>
            </ModalBody>
            <ModalFooter />
        </ModalContent>
    </Modal>
}