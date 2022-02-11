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

    public onGround: boolean = false;

    public disarmed: boolean = false;

    public consciousness: boolean = false;

    public dead: boolean = false;

    public notes: string = '';

    constructor(name: string, ini: number) {
        this.id = Character.nextId++;
        this.name = name;
        this.ini = ini;
    }

    /**
     * Return updated modifiers on turn change
     *
     * @param modifiers     current modifiers
     * @param condition     only update modifiers passing this condition
     * @private
     */
    private turnModifiers(modifiers: Modifier[], condition: (m: Modifier) => boolean): Modifier[] {
        return modifiers.map(
            (m: Modifier) => Modifier.clone(m)
        ).map(
            (m: Modifier) => condition(m) ? m.withRounds(-1) : m
        ).map(
            (m: Modifier) => m.withFresh(false)
        ).filter(
            (m: Modifier) => m.rounds > 0
        )
    }

    /**
     * Returns new instance with updated stats before new turn
     *
     * @param characters All characters, modifiers of other characters will be updated if inflicted by current character
     */
    beforeTurn(characters: Character[]) {
        const clone = Character.clone(this);

        characters.filter(
            (c: Character) => c.id !== clone.id
        ).forEach(
            (other: Character) => {
                other.boniOrMali = this.turnModifiers(other.boniOrMali, (m: Modifier) => m.isInflictedBy(clone));
                other.parryWithMali = this.turnModifiers(other.parryWithMali, (m: Modifier) => m.isInflictedBy(clone));
            }
        );
        //TODO refactor those two into Modifiers, call turnModifiers(other.x) as above
        clone.noParryRounds = Math.max(0, clone.noParryRounds - 1);
        clone.dizzyRounds = Math.max(0, clone.dizzyRounds - 1);

        clone.hits += clone.bleeding;
        clone.diesInRounds = Math.max(0, clone.diesInRounds - 1);

        if (clone.diesInRounds == 0 && this.diesInRounds > 0) {
            clone.dead = true;
        }

        return clone;
    }

    afterTurn(characters: Character[]) {
        const clone = Character.clone(this);
        /**
         * After own turn, all not-fresh self-inflicted modifiers and modifiers where the inflicting character does not exist are updated
         */
        clone.boniOrMali = this.turnModifiers(
            clone.boniOrMali,
            (m: Modifier) => (m.isInflictedBy(clone) && m.isNotFresh()) || !m.isInflictedByAny(characters)
        );
        clone.parryWithMali = this.turnModifiers(
            clone.parryWithMali,
            (m: Modifier) => (m.isInflictedBy(clone) && m.isNotFresh()) || !m.isInflictedByAny(characters)
        );

        return clone;
    }

    canAct(): boolean {
        return !this.dead && !this.consciousness;
    }

    /**
     * Returns new instance with ensured type casting
     */
    private static clone(from: Character) {
        return Object.assign(new Character('', 0), from)
    }
}