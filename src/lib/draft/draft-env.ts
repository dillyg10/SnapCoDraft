import {DraftToken} from "./draft-token";
import {Collection, marshallCollection, unmarshallCollection} from "../collection/collection";
import {SnapRepository} from "../snapdata/snap-repository";
import {SnapCard} from "../snapdata/snap-card";

export type DraftEnvProps = {
    playerCollection: Collection,
    draftToken: DraftToken,
    repository: SnapRepository
}

export class DraftEnv {
    public readonly opponentsCollection: Collection;
    public readonly playerCollection: Collection;
    public readonly seed: string;
    public readonly repository: SnapRepository;
    public readonly draftPool: SnapCard[];

    constructor(props: DraftEnvProps) {
        this.playerCollection = props.playerCollection;
        this.opponentsCollection = unmarshallCollection(props.draftToken.collectionIds, props.repository)
        this.seed = props.draftToken.seed;
        this.repository = props.repository;
        // Both collections are "inverse" meaning they are all cards that the players don't own, the card pool is all cards that don't exist in that list
        const combinedCollectionNames = [...this.playerCollection, ...this.opponentsCollection].map(card => card.name);
        this.draftPool = Object.values(props.repository.cards.cardsByName).filter(card => !combinedCollectionNames.includes(card.name));
    }
}