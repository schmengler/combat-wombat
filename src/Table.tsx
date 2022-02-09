import Counter from "./Form/Counter"
import MultiCounter from "./Form/MultiCounter";
import Checkbox from "./Form/Checkbox"
import Text from "./Form/Text"
import Remove from "./Form/Remove"
import Add from "./Form/Add"
import {Character} from "./Model/Character";
import {useState} from "react";
import {Modifier} from "./Model/Modifier";
import {WoundType} from "./Model/WoundType";


function Table() {

    const [entity, setEntity] = useState(new Character("Grobert", 11))

    const thClass = "py-3 px-6 text-xs font-medium tracking-wider text-left text-amber-700 uppercase dark:text-amber-400";
    const tableClass = "min-w-full divide-y divide-amber-200 table-fixed dark:divide-amber-700 w-full";
    const theadClass = "bg-amber-100 dark:bg-amber-700";
    const tbodyClass = "bg-white divide-y divide-amber-200 dark:bg-amber-800 dark:divide-amber-700";
    const tdClass = "py-4 px-6 text-sm font-medium text-amber-900 whitespace-nowrap dark:text-white";
    const trClassOdd = "hover:bg-orange-50 dark:hover:bg-amber-700";
    const trClassEven = "bg-amber-50 hover:bg-orange-50 dark:hover:bg-amber-700";
    const trCurrent = " bg-green-50";

    return (
        <table className={tableClass}>
            <thead className={theadClass}>
            <tr>
                <th scope="col" className={thClass}>Chara</th>
                <th scope="col" className={thClass}>Ini</th>
                <th scope="col" className={thClass}>Treffer</th>
                <th scope="col" className={thClass}>Blutung / Runde</th>
                <th scope="col" className={thClass}>Boni/Mali</th>
                <th scope="col" className={thClass}>Muss mit ___ parieren</th>
                <th scope="col" className={thClass}>Runden Keine Parade</th>
                <th scope="col" className={thClass}>Runden Benommen</th>
                <th scope="col" className={thClass}>Entwaffnet</th>
                <th scope="col" className={thClass}>Am Boden</th>
                <th scope="col" className={thClass}>Bewusstlos</th>
                <th scope="col" className={thClass}>stirbt in __ Runden</th>
                <th scope="col" className={thClass}>tot</th>
                <th scope="col" className={thClass}>Notizen</th>
            </tr>
            </thead>
            <tbody className={tbodyClass}>
            <tr className={trClassEven}>
            </tr>
            <tr className={trClassOdd}>
                <td className={tdClass}><Remove/> {entity.name} ({entity.ini})</td>
                <td className={tdClass}><Text entity={entity} setEntity={setEntity} property={"ini"} /></td>
                <td className={tdClass}><Counter entity={entity} setEntity={setEntity} property={"hits"} minValue={0} useBigSteps={true}/></td>
                <td className={tdClass}><Counter entity={entity} setEntity={setEntity} property={"bleeding"} minValue={0}/></td>
                <td className={tdClass}><MultiCounter entity={entity} setEntity={setEntity} property={"boniOrMali"} useWoundType={true} /></td>
                <td className={tdClass}><MultiCounter entity={entity} setEntity={setEntity} property={"parryWithMali"}/></td>
                <td className={tdClass}><Counter entity={entity} setEntity={setEntity} property={"noParryRounds"} minValue={0}/></td>
                <td className={tdClass}><Counter entity={entity} setEntity={setEntity} property={"dizzyRounds"} minValue={0}/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Counter entity={entity} setEntity={setEntity} property={"diesInRounds"} minValue={0}/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><textarea/></td>
            </tr>
            <tr className={trClassEven + trCurrent}>
            </tr>
            <tr className={trClassOdd}>
            </tr>

            <tr className={trClassOdd}>
                <td className={tdClass}><Add/> <input type="text"/></td>
                <td className={tdClass} colSpan={13}> </td>
            </tr>
            </tbody>
        </table>
    )
}

export default Table