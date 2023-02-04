import {SnapCard, SnapCardId, SnapCardName} from "./snap-card";

export type CardRepository = {
    cardsByName: Record<SnapCardName, SnapCard>
    cardsById: Record<SnapCardId, SnapCard>
}

export type SnapRepository = {
    cards: CardRepository
}
