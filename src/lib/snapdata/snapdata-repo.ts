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

const replacements = {
    'Kazar': 'KaZar',
    'Antman': 'AntMan',
    'MODOK': 'Modok'
}

const applyReplacement = (card: string): string => {
    let fixedCard = card.replace(/[^a-z0-9]/gi, '');
    for (const [key, value] of Object.entries(replacements)) {
        fixedCard = fixedCard.replace(key, value);
    }
    return fixedCard;
}

export const readSnapdataRepoAsSnapRepo = (data: string): SnapRepository => {
    const parsed = JSON.parse(data) as SnapdataRepo;
    const marshalledCards: SnapCard[] = parsed.data.cards.card.filter(card => card.released || card.name === 'MODOK').map(card => ({
        name: applyReplacement(card.name).toLowerCase(),
        capitalizedName: applyReplacement(card.name),
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