import React, {useCallback, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {SnapRepository} from "./lib/snap-repository";
import {SnapCard} from "./lib/snap-card";
import {readSnapdataRepoAsSnapRepo} from "./lib/snapdata-repo";
import {readCollectionFromJSON} from "./lib/collection-reader";
import collectionData from "./CollectionState.json";

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
      console.log(JSON.stringify(collection));
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
