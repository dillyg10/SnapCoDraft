export const SNAPDATA_IMAGE = (id: string) => `https://snapdata-cdn.stonedonkey.com/images/cards/${id}.webp`;
export const SNAPPRO_IMAGE = (id: string) => `https://static.marvelsnap.pro/cards/${id}.webp`;

export type SnapCard = {
    id: SnapCardId,
    name: SnapCardName,
    text: string,
    capitalizedName: string,
}

export const getCardImage = (card: SnapCard): string => {
    return SNAPPRO_IMAGE(card.capitalizedName);
}

export type SnapCardId = string;

export type SnapCardName = string;