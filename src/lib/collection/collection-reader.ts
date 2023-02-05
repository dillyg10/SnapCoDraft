import {Collection} from "./collection";
import {CardRepository, SnapRepository} from "../snapdata/snap-repository";
import {SnapCard} from "../snapdata/snap-card";

type CollectionCardData = {
    CardDefId: string
}

type CollectionData = {
    ServerState: {
        Cards: CollectionCardData[]
    }
}
export const readCollectionFromJSON = (data: string, repo: SnapRepository): Collection => {
    const importedCollection = JSON.parse(data) as CollectionData;
    return importedCollection.ServerState.Cards.map(card => card.CardDefId.toLowerCase()).reduce((previous: string[], next: string) => previous.includes(next) ? previous : [...previous, next], []).map(card => {
        if (!repo.cards.cardsByName[card]) {
            throw new Error(`Could not find card ${card}`)
        }
        return repo.cards.cardsByName[card];
    });
}