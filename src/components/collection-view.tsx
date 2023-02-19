import React, {useContext} from "react";
import {CollectionContext} from "../contexts/collection.context";
import {SnapCardGrid} from "./snap-card-grid";
import {Box} from "@chakra-ui/react";
import {RepositoryContext} from "../contexts/repository-context";

export const CollectionView = () => {
    const { collection } = useContext(CollectionContext);
    const { repository } = useContext(RepositoryContext);
    if (!collection || !repository) {
        return <></>
    }

    return <SnapCardGrid
            bg='blue.700'
            cards={collection.map(card => card.name).sort().map(name => repository?.cards.cardsByName[name])}
            templateColumns='repeat(5, 1fr)'
            height='40vh'
            maxHeight='40vh'
            borderRadius={10}
            overflow='scroll'
        />
}