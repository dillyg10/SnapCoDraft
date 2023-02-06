import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {SnapRepository} from "./lib/snapdata/snap-repository";
import {readSnapdataRepoAsSnapRepo} from "./lib/snapdata/snapdata-repo";
import {readCollectionFromJSON} from "./lib/collection/collection-reader";
import collectionData from "./CollectionState.json";
import repositoryData from "./snap-repo.json";
import {collectionAsNames, inverseCollection} from "./lib/collection/collection";
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

const SNAP_REPO_URL = 'https://snapdata.stonedonkey.com/data/snap.json';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
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

  useEffect(() => {
    if (repository) {
      const collection = readCollectionFromJSON(JSON.stringify(collectionData), repository);
      const draftToken = createDraftToken(collection, repository);
      draftToken.seed = 'seedseed';
      const draft = new PickAndGiveDraft(new DraftEnv({
        playerCollection: [repository.cards.cardsByName['kazar']],
        draftToken: draftToken,
        repository: repository,
        host: true
      }), {
        maxPickNumber: 6
      });
      const cards = [];
      for (let i = 0; i < 12; i++) {
        cards.push(draft.generateCard());
      }
      console.log(collectionAsNames(cards));
      console.log(btoa(JSON.stringify({ Name: 'Test', Cards: cards.map(card => ({ CardDefId: card.name }))})))
    }
  }, [repository])

  if (!repository) return <></>

  return (
      <ChakraProvider
          theme={extendBaseTheme({
            styles: {
              global: {
                body: {
                  'background': 'draft.global.background'
                }
              },
            },
            colors: {
              draft: {
                global: {
                  background: '#1A202C' // gray 800
                },
                container: {
                  background: '#2D3748' // gray 700
                }
              },
            }
          })}
      >
        <Grid
            templateRows='repeat(3, 1fr)'
            templateColumns='repeat(3, 1fr)'
            gap={2}
            paddingY={4}
            paddingX={10}
        >
          <GridItem rowSpan={3} colSpan={1}>
              <DeckSnapGrid
                  cards={[undefined, repository.cards.cardsByName['kazar'], repository.cards.cardsByName['mbaku'], repository.cards.cardsByName['ironman'], repository.cards.cardsByName['ironheart'], repository.cards.cardsByName['drdoom']]} />
          </GridItem>
          <GridItem rowSpan={1} colStart={2} rowStart={2} colSpan={1} bg='orange' >
            <Grid
                templateColumns='repeat(2, 1fr)'
                templateRows='repeat(1, 1fr)'
                gap={4}
                p={2}
            >
              <GridItem colSpan={1} >
                <Box>
                  <Image src='https://snapdata.stonedonkey.com/images/cards/106.webp'/>
                  <Text><center>This is some text if it gets too long it should wrap around</center></Text>
                </Box>
              </GridItem>
              <GridItem colSpan={1} >
                <Image src='https://snapdata.stonedonkey.com/images/cards/107.webp'/>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem rowSpan={3} colStart={3} colSpan={1} bg='teal'>
            <Grid
                templateColumns='repeat(2, 1fr)'
                templateRows='repeat(3, 1fr)'
                gap={4}
                p={2}
            >
              <GridItem colSpan={1} >
                <Image src='https://snapdata.stonedonkey.com/images/cards/108.webp'/>
              </GridItem>
              <GridItem colSpan={1} >
                <Image src='https://snapdata.stonedonkey.com/images/cards/109.webp'/>
              </GridItem>
              <GridItem colSpan={1} >
                <Image src='https://snapdata.stonedonkey.com/images/cards/110.webp'/>
              </GridItem>
              <GridItem colSpan={1} >
                <Image src='https://snapdata.stonedonkey.com/images/cards/111.webp'/>
              </GridItem>
              <GridItem colSpan={1} >
                <Image src='https://snapdata.stonedonkey.com/images/cards/112.webp'/>
              </GridItem>
              <GridItem colSpan={1} >
                <Image src='https://snapdata.stonedonkey.com/images/cards/113.webp'/>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </ChakraProvider>
  );
}

export default App;
