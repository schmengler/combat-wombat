import {Modifier} from "./Modifier";

export class Character {
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

    public isDead: boolean = false;

    constructor(name: string, ini: number) {
        this.id = Character.nextId++;
        this.name = name;
        this.ini = ini;
    }

    /**
     * Returns new instance with updated stats before new turn
     */
    turn() {
        //TODO extract => Modifier Collection Prototype
        function turnModifiers(modifiers: Modifier[]): Modifier[] {
            return modifiers.map(
                (m: Modifier) => Object.assign(new Modifier(), m, {rounds: m.rounds - 1})
            ).filter(
                (m: Modifier) => m.rounds > 0
            )
        }
        //TODO extract => clone component
        const clone = Object.assign(new Character('', 0), this);

        clone.hits += clone.bleeding;
        clone.noParryRounds = Math.max(0, clone.noParryRounds - 1);
        clone.dizzyRounds = Math.max(0, clone.dizzyRounds - 1);
        clone.diesInRounds = Math.max(0, clone.diesInRounds - 1);
        clone.boniOrMali = turnModifiers(clone.boniOrMali);
        clone.parryWithMali = turnModifiers(clone.parryWithMali);

        if (clone.diesInRounds == 0 && this.diesInRounds > 0) {
            //TODO handle state in Checkbox component
            clone.isDead = true;
        }

        return clone;
    }
}