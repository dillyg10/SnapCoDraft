import {GridItem, Text} from "@chakra-ui/react";
import React from "react";

export const NameTag = ({self} : {self? : boolean}) => {
    return  <Text paddingLeft={10} fontSize='6vh' color='teal.50' fontFamily='Verdana'>{self ? 'You' : 'Opponent'}</Text>
}