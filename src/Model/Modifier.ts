import {WoundType} from "./WoundType";

export class Modifier {
    public value: number = 0;
    public rounds: number = 0;
    public woundType: WoundType = WoundType.None;

    isEmpty(): boolean {
        // value = 0 is allowed, e.g. for "must parry"
        return this.rounds == 0;
    }

}
