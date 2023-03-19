import {Button, Flex, Spacer, Textarea} from "@chakra-ui/react";
import {CopyIcon} from "@chakra-ui/icons";
import React from "react";

export const CopyTextArea = ({ text } : { text : string }) => {
    return <>
        <Textarea
            contentEditable={false}
            value={text}
            readOnly
            color='white'
        />
        <Flex>
            <Spacer />
            <Button
                onClick={() => navigator.clipboard.writeText(text)}
                colorScheme='blue'><CopyIcon paddingRight={1}/>Copy</Button>
        </Flex>
    </>

}