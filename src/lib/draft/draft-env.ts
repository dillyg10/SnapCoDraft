import {DraftToken} from "./draft-token";
import {Collection, marshallCollection, unmarshallCollection} from "../collection/collection";
import {SnapRepository} from "../snapdata/snap-repository";
import {SnapCard} from "../snapdata/snap-card";

export type DraftEnvProps = {
    playerCollection: Collection,
    draftToken: DraftToken,
    repository: SnapRepository,
    host: boolean
}

export class DraftEnv {
    public readonly opponentsCollection: Collection;
    public readonly playerCollection: Collection;
    public readonly seed: string;
    public readonly host: boolean;
    public readonly repository: SnapRepository;


    constructor(props: DraftEnvProps) {
        this.playerCollection = props.playerCollection;
        this.opponentsCollection = unmarshallCollection(props.draftToken.collectionIds, props.repository)
        this.seed = props.draftToken.seed;
        this.repository = props.repository;
        this.host = props.host;
    }
}