import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Stack,
    Text, Textarea
} from "@chakra-ui/react";
import {CopyTextArea} from "../shared/copy-text-area";
import {PickTwoDraft} from "../../lib/draft/pick-two-draft";
import {DraftEnv} from "../../lib/draft/draft-env";
import React, {useContext, useState} from "react";
import {DraftToken} from "../../lib/draft/draft-token";
import {OpponentTokenInput} from "../shared/opponent-token-input";
import {CollectionContext} from "../../contexts/collection-context";
import {RepositoryContext} from "../../contexts/repository-context";
import {DraftContext} from "../../contexts/draft-context";
import {useNavigate} from "react-router-dom";
import {inverseCollection} from "../../lib/collection/collection";

export const HostPreDraft = ({ hostToken } : { hostToken: DraftToken }) => {
    const [opponentToken, setOpponentToken] = useState<DraftToken | undefined>();
    const { collection } = useContext(CollectionContext);
    const { repository } = useContext(RepositoryContext);
    const { setDraft } = useContext(DraftContext);
    const navigate = useNavigate();

    if (!collection || !repository) {
        return <></>
    }

    return <Modal isOpen={true} onClose={() => {}}>
        <ModalOverlay/>
        <ModalContent bg='draft.container.background'>
            <ModalHeader color='white' fontWeight='bold' fontSize='5vh'>Start Draft</ModalHeader>
            <ModalBody>
                <Stack>
                    <Text color='white'>Copy URL and give to opponent</Text>
                    <CopyTextArea text={window.location.href} />
                    <Spacer />
                    <OpponentTokenInput seed= {hostToken.seed } onValidTokenInput={(token) => setOpponentToken(token)} />
                </Stack>
            </ModalBody>
            <ModalFooter>
                <Button disabled={opponentToken === undefined} colorScheme='blue' onClick={() => {
                    if (opponentToken) {
                        setDraft(new PickTwoDraft(new DraftEnv({
                            playerCollection: inverseCollection(collection, repository),
                            draftToken: opponentToken,
                            repository: repository,
                            host: true
                        })));
                        navigate("/draft");
                    }
                }
                }>Start Draft</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}