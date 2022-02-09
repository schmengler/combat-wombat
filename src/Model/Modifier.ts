import {WoundType} from "./WoundType";

export class Modifier
{
    public value: number;
    public rounds: number;
    public woundType?: WoundType;

    constructor(value: number, rounds: number, woundType?: WoundType) {
        this.value = value;
        this.rounds = rounds;
        this.woundType = woundType;
    }

}