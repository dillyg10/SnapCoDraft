import React, {useContext} from "react";
import {DraftContext} from "../../contexts/draft-context";
import {Button, Flex, Spacer, Stack, Text, Textarea} from "@chakra-ui/react";
import {CopyIcon} from "@chakra-ui/icons";

export const PostDraftDeckCode = () => {
    const { draft, fullDeck } = useContext(DraftContext);

    if (!fullDeck || !draft) {
        return <></>
    }

    const fullDeckCode = btoa(JSON.stringify({ Name: draft.env.seed, Cards: fullDeck.map(card => ({ CardDefId: card.name }))}))

    return <Stack color='white'>
        <Text>Copy code for in-game deck</Text>
        <Textarea
            contentEditable={false}
            value={fullDeckCode}
            readOnly
        />
        <Flex>
            <Spacer />
            <Button
                onClick={() => navigator.clipboard.writeText(fullDeckCode)}
                colorScheme='blue'>
                <CopyIcon paddingRight={1}/>Copy Code
            </Button>
        </Flex>
    </Stack>
}