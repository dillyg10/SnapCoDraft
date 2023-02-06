import {DraftEnv} from "./draft-env";
import {SnapCard} from "../snapdata/snap-card";
import random, {Random} from "random";
import {collectionAsNames} from "../collection/collection";

export type DraftState = {
    pickNumber: number,
    playerDeck: SnapCard[],
    opponentDeck: SnapCard[]
}

export type PickState = {
    choices: SnapCard[]
}

export enum DraftStatus {
    IN_PROGRESS,
    CONCLUDED
}

export type DraftProps = {
    maxPickNumber: number,
}

export abstract class Draft {
    public draftPool: SnapCard[];
    public readonly draftState: DraftState;
    public pickState: PickState;
    public rng: Random;

    protected constructor(public readonly env: DraftEnv, public readonly props: DraftProps) {
        // Both collections are "inverse" meaning they are all cards that the players don't own, the card pool is all cards that don't exist in that list
        const combinedCollectionNames = collectionAsNames([...this.env.playerCollection, ...this.env.opponentsCollection]);
        this.draftPool = Object.values(this.env.repository.cards.cardsByName).filter(card => !combinedCollectionNames.includes(card.name));
        this.draftState = {
            pickNumber: 0,
            playerDeck: [],
            opponentDeck: []
        }
        this.pickState = {
            choices: []
        }
        this.rng = random.clone(this.env.seed);
        this.nextPick();
    }

    public nextPick() {
        this.pickState = this.generateNextPick();
    }

    abstract generateNextPick(): PickState

    public pickCard(cardNumber: number): DraftStatus {
        this.cardWasPicked(cardNumber);
        if (this.draftState.pickNumber + 1 === this.props.maxPickNumber) {
            return DraftStatus.CONCLUDED;
        }

        this.draftState.pickNumber++;
        this.nextPick();
        return DraftStatus.IN_PROGRESS;
    }

    abstract cardWasPicked(cardNumber: number): void;

    public generateCard(): SnapCard {
        const cardNumber = this.rng.int(0, this.draftPool.length);
        const card = this.draftPool[cardNumber];
        this.draftPool = [...this.draftPool.slice(0, cardNumber), ...this.draftPool.slice(cardNumber + 1)];
        return card;
    }
}