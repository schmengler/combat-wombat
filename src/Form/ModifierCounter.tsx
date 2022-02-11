import GenericCounter from "./GenericCounter";
import {Modifier} from "../Model/Modifier";
import {Character} from "../Model/Character";

interface CounterProps<EntityType> {
    entity: EntityType,
    property: keyof EntityType,
    getCurrentCharacter: () => Character,
    setEntity: (update: (current: EntityType) => EntityType) => void,
    minValue: number
}

const ModifierCounter = (WrappedCounter: typeof GenericCounter) => ({getCurrentCharacter, ...props}: CounterProps<Character>) => {

    /*
     * decorateUpdate turns the number update function into one for Modifiers
     */
    const decorateUpdate = (update: (current: number) => number): (current: Modifier) => Modifier => ((m: Modifier) => {
        const clone = Modifier.clone(m);
        clone.rounds = update(clone.rounds);
        //TODO only set if not set yet
        clone.inflictedByCharacterId = getCurrentCharacter().id;
        return clone;
    });
    const propertyToNumber = ((v: Modifier): number => (v && (v.rounds)) || 0);
    /*
     * Couldn't figure out how to make the generic type explicit here /shrug
     */
    // @ts-ignore
    return <WrappedCounter decorateUpdate={decorateUpdate} propertyToNumber={propertyToNumber} {...props} />

}

export default ModifierCounter(GenericCounter)