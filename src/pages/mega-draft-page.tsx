import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { SnapCardGrid } from "../components/snap-card-grid";
import { RepositoryContext } from "../contexts/repository-context"
import { SnapCard } from "../lib/snapdata/snap-card";
import random, {Random} from "random";
import {v4 as uuid} from "uuid";

export const MegaDraft = () => {
    const {repository} = useContext(RepositoryContext);
    const [pick, setPick] = useState<number>(0);
    const [selected, setSelected] = useState<Record<number, number>>({});
    const [draft, setDraft] = useState<SnapCard[]>([]);
    const [cards, setCards] = useState<SnapCard[]>([]);
    const [seed, setSeed] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!seed) {
            const params = new URLSearchParams(window.location.search);
            if (params.has('seed')) {
                setSeed(params.get('seed')!);
            } else {
                setSeed(uuid());
            }
        }
    }, [])

    useEffect(() => {
        if (seed) {
            navigate(`/mega?seed=${seed}`);
        }
    }, [seed])

    useEffect(() => {
        if (repository) {
            const rand = random.clone(seed);
            let localCards = Object.values(repository.cards.cardsByName);
            let localDraft: SnapCard[] = [];

            for (let i = 0; i < 54; i++) {
                const r = rand.int(0, localCards.length);
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
            if (selected[index] == undefined) {
                if (pick > 23) {
                    return;
                }
                selected[index] = pick == 0 ? 0 : (pick == 23 ? 0 : (((pick - 1) % 4) < 2 ? 1 : 0));
                setSelected(selected);
                setPick(pick + 1);
            }
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