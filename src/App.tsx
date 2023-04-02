import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {SnapRepository} from "./lib/snapdata/snap-repository";
import {readSnapdataRepoAsSnapRepo} from "./lib/snapdata/snapdata-repo";
import {readCollectionFromJSON} from "./lib/collection/collection-reader";
import {Collection, collectionAsNames, inverseCollection} from "./lib/collection/collection";
import {createDraftToken} from "./lib/draft/draft-token";
import {PickTwoDraft} from "./lib/draft/pick-two-draft";
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
  Spacer, Switch,
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
import {CollectionContextBoundary} from "./contexts/collection-context";
import {Route, BrowserRouter as Router, Routes, RouterProvider, createBrowserRouter} from "react-router-dom";

const SNAP_REPO_URL = 'https://snapdata-cdn.stonedonkey.com/data/snap.json';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: 'draft',
      element: <PickTwoDraftPage />
    }
  ]);

  return (
      <ChakraProvider theme={theme} >
        <DraftContextBoundary>
          <RepositoryContextBoundary>
            <CollectionContextBoundary>
              <RouterProvider router={router} />
            </CollectionContextBoundary>
          </RepositoryContextBoundary>
        </DraftContextBoundary>
      </ChakraProvider>
  );
}

export default App;
