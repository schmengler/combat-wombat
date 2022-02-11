import Remove from "./Remove";
import Text from "./Text";
import Counter from "./Counter";
import MultiCounter from "./MultiCounter";
import Checkbox from "./Checkbox";
import {Character} from "../Model/Character";
import Textarea from "./Textarea";
import ModifierCounter from "./ModifierCounter";

// @ts-ignore
function CharacterRow({tdClass, isEven, isCurrent, currentId, characters, setCharacters, characterId}) {

    const characterIndex = characters.findIndex((c: Character) => c.id == characterId)
    const entity = characters[characterIndex];
    const setEntity = (update: (current: Character) => Character) => {
        setCharacters((prev: Character[]) => {
            const index = prev.findIndex((c: Character) => c.id == characterId)
            const clone = [...prev];
            clone[index] = update(clone[index]);
            return clone;
        })
    }

    /**
     * Return current turn character, assume self if not set
     */
    const getCurrentCharacter = (): Character => {
        if (currentId == null && characters.length > 0) {
            return entity;
        } else {
            return characters.find((c: Character) => c.id == currentId) || entity;
        }
    };

    const trClassOdd = "hover:bg-orange-50 dark:hover:bg-amber-700";
    const trClassEven = "bg-amber-50 hover:bg-orange-50 dark:hover:bg-amber-700";
    const trCurrent = " bg-green-50";
    const trInactive = " bg-red-300 opacity-50";
    const trClass = (isEven ? trClassEven : trClassOdd) + (isCurrent ? trCurrent : '') + (entity.canAct() ? '' : trInactive);

    return (
        <tr className={trClass} data-character-id={characterId}>
            <td className={tdClass + "overflow-hidden"}>
                <Remove setCharacters={setCharacters} characterId={characterId}/>
                <div className={"inline-block font-bold text-lg -rotate-90"}>{entity.name}</div></td>
            <td className={tdClass}><Text entity={entity} setEntity={setEntity} property={"ini"} /></td>
            <td className={tdClass}><Counter entity={entity} setEntity={setEntity} property={"hits"} minValue={0} useBigSteps={true}/></td>
            <td className={tdClass}><Counter entity={entity} setEntity={setEntity} property={"bleeding"} minValue={0}/></td>
            <td className={tdClass}><MultiCounter entity={entity} getCurrentCharacter={getCurrentCharacter} setEntity={setEntity} property={"boniOrMali"} useWoundType={true} /></td>
            <td className={tdClass}><MultiCounter entity={entity} getCurrentCharacter={getCurrentCharacter} setEntity={setEntity} property={"parryWithMali"}/></td>
            <td className={tdClass}><ModifierCounter entity={entity} getCurrentCharacter={getCurrentCharacter} setEntity={setEntity} property={"noParry"} minValue={0}/></td>
            <td className={tdClass}><ModifierCounter entity={entity} getCurrentCharacter={getCurrentCharacter} setEntity={setEntity} property={"dizzy"} minValue={0}/></td>
            <td className={tdClass}><Checkbox entity={entity} setEntity={setEntity} property={"disarmed"}/></td>
            <td className={tdClass}><Checkbox entity={entity} setEntity={setEntity} property={"onGround"}/></td>
            <td className={tdClass}><Checkbox entity={entity} setEntity={setEntity} property={"consciousness"}/></td>
            <td className={tdClass}><Counter entity={entity} setEntity={setEntity} property={"diesInRounds"} minValue={0}/></td>
            <td className={tdClass}><Checkbox entity={entity} setEntity={setEntity} property={"dead"}/></td>
            <td className={tdClass}><Textarea entity={entity} setEntity={setEntity} property={"notes"} /></td>
        </tr>
    );
}

export default CharacterRow;