import {SnapRepository} from "../lib/snapdata/snap-repository";
import React, {ReactNode, useCallback, useEffect, useState} from "react";
import repositoryData from "../snap-repo.json";
import {readSnapdataRepoAsSnapRepo} from "../lib/snapdata/snapdata-repo";

const SNAP_REPO_URL = 'https://snapdata-cdn.stonedonkey.com/data/snap.json';

export type RepositoryContextProps = {
    repository: SnapRepository | undefined
}

export const RepositoryContext  = React.createContext<RepositoryContextProps>({
    repository: undefined
});

export const RepositoryContextBoundary = ({ children } : { children : ReactNode}) => {
    const [repository, setRepository] = useState<SnapRepository | undefined>();
    const fetchRepository = useCallback(async () => {
        let data: string = '';
        try {
            data = await (await fetch(SNAP_REPO_URL)).text();
        } catch (err) {
            console.log(err);
            data = JSON.stringify(repositoryData);
        }

        setRepository(readSnapdataRepoAsSnapRepo(data));
    }, [])

    useEffect(() => {
        fetchRepository().catch(err => console.log(err))
    }, []);

    return <RepositoryContext.Provider value={{
        repository
    }}>
        { children }
    </RepositoryContext.Provider>
}