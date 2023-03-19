import React, {ReactNode, useContext, useEffect, useState} from "react";
import {Collection, collectionAsNames, unmarshallCollection} from "../../lib/collection/collection";
import {RepositoryContext} from "../../contexts/repository-context";
import {
    Button, ButtonGroup,
    IconButton,
    Input,
    InputGroup, InputRightElement, Modal,
    ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";
import {UploadCollection} from "./upload-collection";
import {readCollectionFromJSON} from "../../lib/collection/collection-reader";
import {CollectionContext} from "../../contexts/collection-context";
import {CollectionView} from "../collection-view";
import {CopyIcon} from "@chakra-ui/icons";
import {DragDropFile} from "../drag-drop-file";

export const CollectionPreDraftLaunch = ({ readyAction, headerText, onCancel } : { readyAction : ReactNode, headerText?: string, onCancel: () => void }) => {
    const { collection, setCollection } = useContext(CollectionContext)
    const { repository } = useContext(RepositoryContext);


    if (collection) {
        console.log(collectionAsNames(collection));
    }

    if (!repository) {
        return <></>
    }

    return <>
        {collection ?
            <Modal isOpen={true} onClose={onCancel}>
                <ModalOverlay/>
                <ModalContent bg='draft.container.background'>
                    <ModalHeader color='white' fontWeight='bold' fontSize='5vh'> {headerText ?? 'Begin draft'} </ModalHeader>
                    <ModalCloseButton color='white' />
                    <ModalBody>
                            <Stack>
                                <Text color='white'>Your collection:</Text>
                                <CollectionView />
                            </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button colorScheme='blue' variant='outline' onClick={() => setCollection(undefined)}> Change Collection </Button>
                            { readyAction }
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            : <UploadCollection onCollectionUploaded={data => {
                try {
                    setCollection(readCollectionFromJSON(data, repository))
                } catch (err) {
                    throw err;
                }
            } }/>
        }

    </>
}