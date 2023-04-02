import {Button, Flex, Spacer, Textarea} from "@chakra-ui/react";
import {CopyIcon} from "@chakra-ui/icons";
import React from "react";

async function copyToClipboard(textToCopy: string) {
    // Navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
    } else {
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
            
        // Move textarea out of the viewport so it's not visible
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
            
        document.body.prepend(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (error) {
            console.error(error);
        } finally {
            textArea.remove();
        }
    };
}

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
                onClick={() => {
                    console.log(text);
                    copyToClipboard(text);
                }}
                colorScheme='blue'><CopyIcon paddingRight={1}/>Copy</Button>
        </Flex>
    </>

}