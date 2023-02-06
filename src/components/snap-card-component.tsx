import {getCardImage, SnapCard} from "../lib/snapdata/snap-card";
import {Image, Box, Center, ImageProps} from "@chakra-ui/react";
import React from "react";

export const SnapCardComponent = ({ card } : { card?: SnapCard }) => {
    return <Box w='100%' h='100%'>
        {
        card ? <Center>
                <Image src={getCardImage(card)} />
              </Center>
            :
            <Center w='100%' h='100%'>
                <Box bg='gray.600' h='90%' w='70%' borderRadius='xl' />
            </Center>
        }

    </Box>
}