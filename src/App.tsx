import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {SnapRepository} from "./lib/snapdata/snap-repository";
import {readSnapdataRepoAsSnapRepo} from "./lib/snapdata/snapdata-repo";
import {readCollectionFromJSON} from "./lib/collection/collection-reader";
import collectionData from "./CollectionState.json";
import repositoryData from "./snap-repo.json";
import {Collection, collectionAsNames, inverseCollection} from "./lib/collection/collection";
import {createDraftToken} from "./lib/draft/draft-token";
import {PickAndGiveDraft} from "./lib/draft/pick-and-give-draft";
import {DraftEnv} from "./lib/draft/draft-env";
import {DraftStatus} from "./lib/draft/draft";
import {
  Box,
  Center,
  ChakraProvider,
  extendBaseTheme,
  Flex,
  Grid,
  GridItem,
  Image,
  Spacer,
  Text
} from "@chakra-ui/react";
import {SnapCardComponent} from "./components/snap-card-component";
import {SnapCardGrid} from "./components/snap-card-grid";
import {DeckSnapGrid} from "./components/pictwodraft/deck-snap-grid";
import {theme} from "./theme";
import {DraftContextBoundary} from "./contexts/draft-context";
import {PickTwoDraftPage} from "./pages/pick-two-draft-page";
import {HomePage} from "./pages/home-page";
import {RepositoryContextBoundary} from "./contexts/repository-context";
import {CollectionContextBoundary} from "./contexts/collection.context";

const SNAP_REPO_URL = 'https://snapdata-cdn.stonedonkey.com/data/snap.json';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [repository, setRepository] = useState<SnapRepository | undefined>();
  const [collection, setCollection] = useState<Collection | undefined>();
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

  useEffect(() => {
    if (repository) {
      const collection = readCollectionFromJSON(JSON.stringify(collectionData), repository);
      setCollection(collection);
      const draftToken = createDraftToken(collection, repository);
      // draftToken.seed = 'seedseed';
      // const draft =
      // const cards = [];
      // for (let i = 0; i < 12; i++) {
      //   cards.push(draft.generateCard());
      // }
      // console.log(collectionAsNames(cards));
      // console.log(btoa(JSON.stringify({ Name: 'Test', Cards: cards.map(card => ({ CardDefId: card.name }))})))
    }
  }, [repository])

  if (!repository || !collection) return <></>

  return (
      <ChakraProvider theme={theme} >
        <DraftContextBoundary draftProvider={() =>  new PickAndGiveDraft(new DraftEnv({
          playerCollection: inverseCollection(collection, repository),
          draftToken: createDraftToken(inverseCollection(collection, repository), repository),
          repository: repository,
          host: true
        }), {
          maxPickNumber: 6
        })}>
          <RepositoryContextBoundary>
            <CollectionContextBoundary>
              <HomePage />
            </CollectionContextBoundary>
          </RepositoryContextBoundary>
        </DraftContextBoundary>
      </ChakraProvider>
  );
}

export default App;
