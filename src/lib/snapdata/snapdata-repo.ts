import {SnapRepository} from "./snap-repository";
import {SnapCard} from "./snap-card";

export type SnapdataCard = {
    id: string,
    name: string,
    desc: string,
    currentImage: boolean,
    released: boolean,
    draftRarity: number
}

export type SnapdataRepo = {
    data: {
        cards: {
            card: SnapdataCard[]
        }
    }
}

export const readSnapdataRepoAsSnapRepo = (data: string): SnapRepository => {
    const parsed = JSON.parse(data) as SnapdataRepo;
    // TODO PR to fix KaZar, Ant-Man
    const marshalledCards: SnapCard[] = parsed.data.cards.card.filter(card => card.released || card.name === 'Silver Surfer').map(card => ({
        name: card.name.replace(' ','').replace('-','').replace("'", '' +
            '').toLowerCase(),
        capitalizedName: card.name.replace(' ','').replace('-','').replace("'", '' +
            '').replace('Kazar', 'KaZar').replace('Antman', 'AntMan'),
        text: card.desc,
        id: card.id,
    }));

    return {
        cards: {
            cardsById: marshalledCards.reduce((record, card) => ({
                [card.id]: card,
                ...record
            }), {} as Record<string, SnapCard>),
            cardsByName: marshalledCards.reduce((record, card) => ({
                [card.name]: card,
                ...record
            }), {} as Record<string, SnapCard>)
        }
    }
}