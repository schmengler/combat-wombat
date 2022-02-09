import {WoundType} from "./WoundType";

export class Modifier {
    public value: number = 0;
    public rounds: number = 0;
    public woundType: WoundType = WoundType.None;

    isEmpty(): boolean {
        return this.value == 0 || this.rounds == 0;
    }

}
