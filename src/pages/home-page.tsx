import {Box, Center, Flex, Grid, GridItem, Spacer, Stack, Text} from "@chakra-ui/react";
import {EditIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {HomePageButton} from "../components/homepage/home-page-button";
import {useState} from "react";
import {UploadCollection} from "../components/homepage/upload-collection";
import {CollectionPreDraftLaunch} from "../components/homepage/collection-pre-draft-launch";

export const HomePage = () => {
    const [showCollectionUpload, setShowCollectionUpload] = useState<boolean>(false);

    return <>
        {showCollectionUpload ? <CollectionPreDraftLaunch /> : <></> }
        <Center>
            <Flex
                minHeight='100vh'
                height='100%'
                maxHeight='100vh'
                flexDirection='row'
                paddingTop='25vh'
            >
                <Spacer />
                <HomePageButton text={'Create Draft'} icon={<EditIcon color='gray.400' boxSize={120}/>} onClick={() => setShowCollectionUpload(true)} />
                <Spacer p={100}/>
                <HomePageButton text={'Join Draft'} icon={<ExternalLinkIcon color='gray.400' boxSize={120}/>} onClick={() => console.log('hi2')} />
                <Spacer />
            </Flex>
        </Center>
    </>
}