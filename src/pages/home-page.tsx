import {Box, Button, Center, Flex, Grid, GridItem, Spacer, Stack, Text} from "@chakra-ui/react";
import {EditIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {HomePageButton} from "../components/homepage/home-page-button";
import {useContext, useEffect, useState} from "react";
import {UploadCollection} from "../components/homepage/upload-collection";
import {CollectionPreDraftLaunch} from "../components/homepage/collection-pre-draft-launch";
import {CollectionContext} from "../contexts/collection-context";
import {NonHostPreDraft} from "../components/homepage/non-host-pre-draft";
import {createDraftToken, DraftToken, marshallDraftToken, unmarshallDraftToken} from "../lib/draft/draft-token";
import {useNavigate} from "react-router-dom";
import {RepositoryContext} from "../contexts/repository-context";
import {HostPreDraft} from "../components/homepage/host-pre-draft";
import {inverseCollection} from "../lib/collection/collection";
import {JoinDraft} from "../components/homepage/join-draft";
const ID_PATH_PARAM = 'id';
export const HomePage = () => {
    const { collection, collectionConfirmed, setCollectionConfirmed } = useContext(CollectionContext);
    const { repository } = useContext(RepositoryContext);
    const [showCollectionUpload, setShowCollectionUpload] = useState<boolean>(false);
    const [showJoinDraft, setShowJoinDraft] = useState<boolean>(false);
    const [host, setHost] = useState<boolean>(false);
    const [hostToken, setHostToken] = useState<DraftToken | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get(ID_PATH_PARAM);
        if (id) {
            try {
                const parsedHostToken = unmarshallDraftToken(id);
                setHostToken(parsedHostToken);
                if (!host && !collectionConfirmed) {
                    setShowCollectionUpload(true);
                }
            } catch (err) {
                console.log(id);
                console.log(err);
                navigate("/");
            }
        }
    }, [window.location.search])

    console.log(repository);

    if (!repository) {
        return <></>
    }

    return <>
        {showJoinDraft ? <JoinDraft onCancel={() => setShowJoinDraft(false)} /> : <></>}
        {showCollectionUpload ? <CollectionPreDraftLaunch onCancel={() => setShowCollectionUpload(false)} readyAction={<Button colorScheme='blue' onClick={() => {
                setCollectionConfirmed(true);
                setShowCollectionUpload(false);
                if (host) {
                    navigate(`/?${ID_PATH_PARAM}=${encodeURIComponent(marshallDraftToken(createDraftToken(inverseCollection(collection!, repository), repository )))}`);
                }
            }}>{ host ? 'Start Draft' : 'Join Draft' }</Button>}/> : <></> }
        {collectionConfirmed && hostToken ? (host ? <HostPreDraft hostToken={hostToken} /> : <NonHostPreDraft hostToken={hostToken} />) : <></> }
        <Center>
            <Flex
                minHeight='100vh'
                height='100%'
                maxHeight='100vh'
                flexDirection='row'
                paddingTop='25vh'
            >
                <Spacer />
                <HomePageButton text={'Create Draft'} icon={<EditIcon color='gray.400' boxSize={120}/>} onClick={() => {
                    setShowCollectionUpload(true)
                    setHost(true);
                }} />
                <Spacer p={100}/>
                <HomePageButton text={'Join Draft'} icon={<ExternalLinkIcon color='gray.400' boxSize={120}/>} onClick={() => setShowJoinDraft(true)} />
                <Spacer />
            </Flex>
        </Center>
    </>
}