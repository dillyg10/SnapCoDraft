import { useContext, useEffect, useState } from "react"
import { SnapCardGrid } from "../components/snap-card-grid";
import { RepositoryContext } from "../contexts/repository-context"
import { SnapCard } from "../lib/snapdata/snap-card";

export const MegaDraft = () => {
    const {repository} = useContext(RepositoryContext);
    const [pick, setPick] = useState<number>(0);
    const [selected, setSelected] = useState<Record<number, number>>({});
    const [draft, setDraft] = useState<SnapCard[]>([]);
    const [cards, setCards] = useState<SnapCard[]>([]);


    useEffect(() => {
        if (repository) {
            let localCards = Object.values(repository.cards.cardsByName);
            let localDraft: SnapCard[] = [];

            for (let i = 0; i < 54; i++) {
                const r = Math.floor(Math.random() * localCards.length);
                localDraft.push(localCards[r]);
                localCards = [...localCards.slice(0, r - 1), ...localCards.slice(r + 1)];
            }
            setCards(localCards);
            setDraft(localDraft)
        }
    }, [repository])

    if (!repository) {
        return <></>
    }
    
    return <SnapCardGrid
        templateColumns='repeat(9, 1fr)'
        templateRows='repeat(6, 1fr)'
        gap={1}
        bg='draft.container.background'
        cards={draft}
        dropShadow='50px'
        cardclickedaction={(card, index) => {
            selected[index]  = pick % 2;
            setSelected(selected);
            setPick(pick + 1);
        }}
        cardcomponentprops={(card, index) => {
            if (selected[index] !== undefined) {
                return {
                    // border: `1px solid ${selected[index] ? 'blue' : 'red'}`
                    background: `${selected[index] ? 'red' : 'blue'}`
                }
            } else {
                return {}
            }
        }}
    />
}