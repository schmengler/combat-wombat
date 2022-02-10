import Remove from "./Remove";
import Text from "./Text";
import Counter from "./Counter";
import MultiCounter from "./MultiCounter";
import Checkbox from "./Checkbox";
import {Character} from "../Model/Character";

// @ts-ignore
function CharacterRow({isEven, isCurrent, characters, setCharacters, characterId}) {

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

    const trClassOdd = "hover:bg-orange-50 dark:hover:bg-amber-700";
    const trClassEven = "bg-amber-50 hover:bg-orange-50 dark:hover:bg-amber-700";
    const trCurrent = " bg-green-50";
    const trInactive = " bg-red-300 opacity-50";
    const trClass = (isEven ? trClassEven : trClassOdd) + (isCurrent ? trCurrent : '') + (entity.canAct() ? '' : trInactive);
    const tdClass = "py-4 px-6 text-sm font-medium text-amber-900 whitespace-nowrap dark:text-white";

    return (
        <tr className={trClass}>
            <td className={tdClass}><Remove setCharacters={setCharacters} characterId={characterId}/> <span className={"font-bold text-lg"}>{entity.name}</span></td>
            <td className={tdClass}><Text entity={entity} setEntity={setEntity} property={"ini"} /></td>
            <td className={tdClass}><Counter entity={entity} setEntity={setEntity} property={"hits"} minValue={0} useBigSteps={true}/></td>
            <td className={tdClass}><Counter entity={entity} setEntity={setEntity} property={"bleeding"} minValue={0}/></td>
            <td className={tdClass}><MultiCounter entity={entity} setEntity={setEntity} property={"boniOrMali"} useWoundType={true} /></td>
            <td className={tdClass}><MultiCounter entity={entity} setEntity={setEntity} property={"parryWithMali"}/></td>
            <td className={tdClass}><Counter entity={entity} setEntity={setEntity} property={"noParryRounds"} minValue={0}/></td>
            <td className={tdClass}><Counter entity={entity} setEntity={setEntity} property={"dizzyRounds"} minValue={0}/></td>
            <td className={tdClass}><Checkbox entity={entity} setEntity={setEntity} property={"disarmed"}/></td>
            <td className={tdClass}><Checkbox entity={entity} setEntity={setEntity} property={"onGround"}/></td>
            <td className={tdClass}><Checkbox entity={entity} setEntity={setEntity} property={"conciousless"}/></td>
            <td className={tdClass}><Counter entity={entity} setEntity={setEntity} property={"diesInRounds"} minValue={0}/></td>
            <td className={tdClass}><Checkbox entity={entity} setEntity={setEntity} property={"dead"}/></td>
            <td className={tdClass}><textarea/></td>
        </tr>
    );
}

export default CharacterRow;