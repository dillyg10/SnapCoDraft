import {Collection, marshallCollection, unmarshallCollection} from "../lib/collection/collection";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useToast} from "@chakra-ui/react";
import {RepositoryContext} from "./repository-context";
export const COLLECTION_LOCAL_STORAGE_KEY = 'testcoll';

export type CollectionContextProps = {
    collection: Collection | undefined,
    setCollection: (collection: Collection | undefined, store?: boolean) => void,

    collectionConfirmed: boolean,
    setCollectionConfirmed: (confirmed: boolean) => void
}

export const CollectionContext = createContext<CollectionContextProps>({
    collection: undefined,
    setCollection: () => {},
    collectionConfirmed: false,
    setCollectionConfirmed: () => {}
});

export const CollectionContextBoundary = ({ children } : { children : ReactNode}) => {
    const [collection, setCollection] = useState<Collection>();
    const [collectionConfirmed, setCollectionConfirmed] = useState<boolean>( false);
    const { repository } = useContext(RepositoryContext);
    const toast = useToast();

    useEffect(() => {
        if (!repository) {
            return;
        }

        const storedCollection = window.localStorage.getItem(COLLECTION_LOCAL_STORAGE_KEY);

        if (storedCollection) {
            try {
                setCollection(unmarshallCollection(JSON.parse(atob(storedCollection)) as number[], repository))
            } catch (err) {
                console.log(err);
                window.localStorage.removeItem(COLLECTION_LOCAL_STORAGE_KEY);
                toast({
                    title: 'Failed to read collection',
                    description: "Try uploading your collection again",
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                })
            }
        }
    }, [repository]);

    return <CollectionContext.Provider value={{
        collection,
        setCollection: (collection, store= true) => {
            if (store) {
                if (collection) {
                    window.localStorage.setItem(COLLECTION_LOCAL_STORAGE_KEY, btoa(JSON.stringify(marshallCollection(collection))));
                } else {
                    window.localStorage.removeItem(COLLECTION_LOCAL_STORAGE_KEY);
                }
            }

            setCollection(collection);
        },
        collectionConfirmed,
        setCollectionConfirmed
    }}>
        { children }
    </CollectionContext.Provider>
}