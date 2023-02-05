import React, {useCallback, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {SnapRepository} from "./lib/snapdata/snap-repository";
import {SnapCard} from "./lib/snapdata/snap-card";
import {readSnapdataRepoAsSnapRepo} from "./lib/snapdata/snapdata-repo";
import {readCollectionFromJSON} from "./lib/collection/collection-reader";
import collectionData from "./CollectionState.json";
import {inverseCollection, marshallCollection} from "./lib/collection/collection";
import {createDraftToken, marshallDraftToken, unmarshallDraftToken} from "./lib/draft/draft-token";
import LZString from "lz-string";

const SNAP_REPO_URL = 'https://snapdata.stonedonkey.com/data/snap.json';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [repository, setRepository] = useState<SnapRepository | undefined>();

  const fetchRepository = useCallback(async () => {
    const data = await fetch(SNAP_REPO_URL);
    console.log("callback called");
    setRepository(readSnapdataRepoAsSnapRepo(await data.text()));
  }, [])

  useEffect(() => {
    console.log('effect called');
    fetchRepository().catch(err => console.log(err))
  }, []);

  useEffect(() => {
    if (repository) {
      // console.log(JSON.stringify(repository));
      const collection = readCollectionFromJSON(JSON.stringify(collectionData), repository);
      const draftToken = createDraftToken(collection, repository);
      const marshalledToken = marshallDraftToken(draftToken);
      const unmarshalledToken = unmarshallDraftToken(marshalledToken);
      console.log(JSON.stringify(draftToken));
      console.log(JSON.stringify(unmarshalledToken));
    }
  }, [repository])


  return (
    <div className="App">
      {loading ?
            <p>Loading</p>
          : <p>Done check console</p>}

    </div>
  );
}

export default App;
