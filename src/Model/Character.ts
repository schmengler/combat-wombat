import {Modifier} from "./Modifier";

export class Character
{
    public name: string;

    public hits: number = 0;

    public bleeding: number = 0;

    public boniOrMali: Modifier[] = []

    public parryWithMali: Modifier[] = [];

    public noParryRounds: number = 0;

    public dizzyRounds: number = 0;

    public diesInRounds: number = 0;

    constructor(name: string) {
        this.name = name;
    }
}