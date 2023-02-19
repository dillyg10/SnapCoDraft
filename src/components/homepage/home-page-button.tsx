import {Box, Center, Flex, Spacer, Text} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";
import React from "react";

export const HomePageButton = ({text, icon, onClick} : {text: string, icon: React.ReactNode, onClick: () => void}) => {
    return <Box cursor='pointer' borderRadius={30} bg='draft.container.background' boxSize='2xs'>
        <Flex
            flexDirection='column'
            height='100%'
            onClick={onClick}
        >
            <Spacer />
            <Center>
                {icon}
            </Center>
            <Text cursor='default' textAlign='center' fontSize='5vh' color='gray.300' >{text}</Text>
            <Spacer />
        </Flex>
    </Box>
}