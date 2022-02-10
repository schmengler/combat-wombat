import {Modifier} from "./Modifier";

export class Character
{
    private static nextId = 1;

    public id: number;

    public name: string;

    public ini: number;

    public hits: number = 0;

    public bleeding: number = 0;

    public boniOrMali: Modifier[] = []

    public parryWithMali: Modifier[] = [];

    public noParryRounds: number = 0;

    public dizzyRounds: number = 0;
    public diesInRounds: number = 0;

    constructor(name: string, ini: number) {
        this.id = Character.nextId++;
        this.name = name;
        this.ini = ini;
    }

    turn()
    {
        const clone = Object.assign(new Character('', 0), this);
        clone.hits += clone.bleeding;
        return clone;
    }
}