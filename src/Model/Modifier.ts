import {WoundType} from "./WoundType";
import {Character} from "./Character";

export class Modifier {
    public characterId: number;
    public value: number = 0;
    public rounds: number = 0;
    public woundType: WoundType = WoundType.None;
    public inflictedByCharacterId: number|null = null;
    /**
     * True if inflicted in current turn (used for self inflicted modifiers to not decrease rounds immediately)
     */
    public fresh: boolean = true;

    constructor(characterId: number) {
        this.characterId = characterId;
    }

    isEmpty(): boolean {
        // value = 0 is allowed, e.g. for "must parry"
        return this.rounds == 0;
    }

    isInflictedBy(character: Character): boolean {
        return character.id == this.inflictedByCharacterId;
    }

    isInflictedByAny(characters: Character[]): boolean {
        const characterIds: number[] = characters.map((c: Character): number => c.id);
        return this.inflictedByCharacterId !== null && characterIds.includes(this.inflictedByCharacterId);
    }

    /**
     * Returns new instance with rounds modified by given delta
     */
    withRounds(delta: number): Modifier {
        return Object.assign(this, {rounds: this.rounds + delta});
    }

    /**
     * Returns new instance with ensured type casting
     */
    static clone(from: Modifier) {
        return Object.assign(new Modifier(from.characterId), from);
    }

    withFresh(value: boolean) {
        return Object.assign(this, {fresh: value});
    }

    isNotFresh(): boolean {
        return !this.fresh;
    }
}
