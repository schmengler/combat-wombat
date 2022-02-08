import Counter from "./Form/Counter"
import Checkbox from "./Form/Checkbox"
import Remove from "./Form/Remove"
import Add from "./Form/Add"


function Table() {

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
                <th scope="col" className={thClass}>Blutung</th>
                <th scope="col" className={thClass}>Malus</th>
                <th scope="col" className={thClass}>Muss parieren</th>
                <th scope="col" className={thClass}>Keine Parade</th>
                <th scope="col" className={thClass}>Benommen</th>
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
                <td className={tdClass}><Remove/> Roana</td>
                <td className={tdClass}>18</td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><textarea/></td>
            </tr>
            <tr className={trClassOdd}>
                <td className={tdClass}><Remove/> Grobert</td>
                <td className={tdClass}>14</td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><textarea/></td>
            </tr>
            <tr className={trClassEven + trCurrent}>
                <td className={tdClass}><Remove/> Tysko</td>
                <td className={tdClass}>12</td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><textarea/></td>
            </tr>
            <tr className={trClassOdd}>
                <td className={tdClass}><Remove/> Boran</td>
                <td className={tdClass}>10</td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><Counter/></td>
                <td className={tdClass}><Checkbox/></td>
                <td className={tdClass}><textarea/></td>
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