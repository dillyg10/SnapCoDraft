import {SnapCard} from "../snapdata/snap-card";
import {SnapRepository} from "../snapdata/snap-repository";
export type Collection = SnapCard[];

export const inverseCollection = (collection: Collection, repo: SnapRepository): Collection => {
    const asStringArray = collection.map(card => card.name);
    return Object.values(repo.cards.cardsByName).filter(card => !asStringArray.includes(card.name));
}

export const marshallCollection = (collection: Collection): number[] => {
    return collection.map(card => card.id).map(id => parseInt(id));
}

export const unmarshallCollection = (data: number[], repo: SnapRepository): Collection => {
    return data.map(id => repo.cards.cardsById[`${id}`]);
}

export const collectionAsNames = (collection: Collection): string[] => {
    return collection.map(card => card.name);
}