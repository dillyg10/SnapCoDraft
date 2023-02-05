import {Collection, inverseCollection, marshallCollection} from "../collection/collection";
import {SnapRepository} from "../snapdata/snap-repository";
import random from "random";
import seedrandom from "seedrandom";
import {v4 as uuid} from "uuid";
import LZString from "lz-string";

export type DraftToken = {
    seed: string,
    collectionIds: number[]
}

export const createDraftToken = (collection: Collection, repo: SnapRepository): DraftToken => {
    return {
        seed: uuid(),
        collectionIds: marshallCollection(inverseCollection(collection, repo))
    }
}

export const marshallDraftToken = (token: DraftToken): string => {
    return LZString.compressToBase64(JSON.stringify(token));
}

export const unmarshallDraftToken = (data: string): DraftToken => {
    return JSON.parse(LZString.decompressFromBase64(data)!);
}
