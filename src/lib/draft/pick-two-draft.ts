import {Draft, DraftProps, PickState} from "./draft";
import {DraftEnv} from "./draft-env";
import {collectionAsNames} from "../collection/collection";

export class PickTwoDraft extends Draft {

    constructor(env: DraftEnv) {
        super(env, {
            maxPickNumber: 6
        });
    }

    cardWasPicked(cardNumber: number): void {
        this.draftState.playerDeck.push(this.pickState.choices[cardNumber]);
        this.draftState.opponentDeck.push(this.pickState.choices[cardNumber === 1 ? 0 : 1]);
    }

    generateNextPick(): PickState {
        const cards = [this.generateCard(), this.generateCard(), this.generateCard(), this.generateCard()];
        console.log(collectionAsNames(cards));
        if (this.env.host) {
            return {
                choices: [cards[0], cards[1]]
            }
        } else {
            return {
                choices: [cards[2], cards[3]]
            }
        }
    }

}