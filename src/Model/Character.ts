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

    public noParry: Modifier;

    public dizzy: Modifier;

    /**
     * @deprecated use noParry instead
     */
    public noParryRounds: number = 0;

    /**
     * @deprecated use dizzy instead
     */
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
        this.dizzy = new Modifier(this.id);
        this.noParry = new Modifier(this.id);
    }

    /**
     * Return updated modifiers on turn change
     *
     * @param modifiers     current modifiers
     * @param condition     only update modifiers passing this condition
     * @private
     */
    private static turnModifiers(modifiers: Modifier[], condition: (m: Modifier) => boolean): Modifier[] {
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
     * Return single updated modifier on turn change
     *
     * @param modifier     current modifier
     * @param condition    only update modifiers passing this condition
     * @private
     */
    private static turnModifier(modifier: Modifier, condition: (m: Modifier) => boolean): Modifier {
        //TODO turn into pipeline with single element, similar to turnModifiers above?
        let clone = Modifier.clone(modifier);
        if (condition(modifier)) {
            clone = clone.withRounds(-1);
        }
        if (modifier.rounds == 0) {
            clone = new Modifier(modifier.characterId);
        }
        return clone.withFresh(false);
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
                other.boniOrMali = Character.turnModifiers(other.boniOrMali, (m: Modifier) => m.isInflictedBy(clone));
                other.parryWithMali = Character.turnModifiers(other.parryWithMali, (m: Modifier) => m.isInflictedBy(clone));
                other.noParry = Character.turnModifier(other.noParry, (m: Modifier) => m.isInflictedBy(clone));
                other.dizzy = Character.turnModifier(other.dizzy, (m: Modifier) => m.isInflictedBy(clone));
            }
        );

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
        clone.boniOrMali = Character.turnModifiers(
            clone.boniOrMali,
            (m: Modifier) => (m.isInflictedBy(clone) && m.isNotFresh()) || !m.isInflictedByAny(characters)
        );
        clone.parryWithMali = Character.turnModifiers(
            clone.parryWithMali,
            (m: Modifier) => (m.isInflictedBy(clone) && m.isNotFresh()) || !m.isInflictedByAny(characters)
        );

        //TODO check inflictor as above
        clone.dizzy = Character.turnModifier(clone.dizzy, () => true);
        clone.noParry = Character.turnModifier(clone.noParry, () => true);

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