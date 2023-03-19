import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text} from "@chakra-ui/react";
import React, {useContext} from "react";
import {CopyTextArea} from "../shared/copy-text-area";
import {CollectionContext} from "../../contexts/collection-context";
import {createDraftToken, DraftToken, marshallDraftToken} from "../../lib/draft/draft-token";
import {RepositoryContext} from "../../contexts/repository-context";
import {DraftContext} from "../../contexts/draft-context";
import {PickTwoDraft} from "../../lib/draft/pick-two-draft";
import {Collection, inverseCollection} from "../../lib/collection/collection";
import {SnapRepository} from "../../lib/snapdata/snap-repository";
import {DraftEnv} from "../../lib/draft/draft-env";
import {useNavigate} from "react-router-dom";

export const NonHostPreDraft = ({ hostToken } : { hostToken : DraftToken }) => {
    const { collection } = useContext(CollectionContext);
    const { repository } = useContext(RepositoryContext);
    const { setDraft } = useContext(DraftContext);
    const navigate = useNavigate();

    if (!collection || !repository) {
        return <></>
    }
    const opponentToken = createDraftToken(inverseCollection(collection, repository), repository, hostToken.seed);
    const marshalledToken = marshallDraftToken(opponentToken);

    return <Modal isOpen={true} onClose={() => {}}>
        <ModalOverlay/>
        <ModalContent bg='draft.container.background'>
            <ModalHeader color='white' fontWeight='bold' fontSize='5vh'>Join Draft</ModalHeader>
            <ModalBody>
                <Stack>
                    <Text color='white'>Give your opponent this code</Text>
                    <CopyTextArea text={marshalledToken} />
                </Stack>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' onClick={() => {
                    setDraft(new PickTwoDraft(new DraftEnv({
                        playerCollection: inverseCollection(collection, repository),
                        draftToken: hostToken,
                        repository: repository,
                        host: false
                    })));
                    navigate("/draft");
                }
                }>Start Draft</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}