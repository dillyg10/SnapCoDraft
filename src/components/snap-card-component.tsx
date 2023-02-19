import {getCardImage, SnapCard} from "../lib/snapdata/snap-card";
import {Image, Box, Center, ImageProps, Text, Stack} from "@chakra-ui/react";
import React from "react";

export type SnapCardComponentProps = { card?: SnapCard, showText?: boolean, onClick: () => void} ;
export const SnapCardComponent = ({ card, showText, onClick } : SnapCardComponentProps ) => {
    return <Box w='100%' h='100%'>
        {
        card ? <Center>
                <Stack dir='vertical'>
                    <Image onClick={onClick} src={getCardImage(card)} height='100%' maxHeight='100vh' />
                    {showText
                        ?
                            <Center>
                                <Box borderRadius={10} h='100%' maxHeight='100%' fontSize='1.2vh' fontFamily='Verdana' textColor='white' w='70%' p={4} bg='gray.900'>
                                    <Text textAlign='center' > {card.text} </Text>
                                </Box>
                            </Center>
                        : <></>
                    }
                </Stack>
              </Center>
            :
            <Center w='100%' h='100%'>
                <Box bg='card.blank' h='90%' w='70%' borderRadius='xl' />
            </Center>
        }
    </Box>
}