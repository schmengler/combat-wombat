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
import CharacterRow from "./Form/CharacterRow";
import SortCharacters from "./Form/SortCharacters";


function Table() {

    const [characters, setCharacters] = useState([new Character("Grobert", 11), new Character("Roana", 12)])
    // const [characters, setCharacters] = useState([])

    const thClass = "py-3 px-6 text-xs font-medium tracking-wider text-left text-amber-700 uppercase dark:text-amber-400";
    const tableClass = "min-w-full divide-y divide-amber-200 table-fixed dark:divide-amber-700 w-full";
    const theadClass = "bg-amber-100 dark:bg-amber-700";
    const tbodyClass = "bg-white divide-y divide-amber-200 dark:bg-amber-800 dark:divide-amber-700";
    const tdClass = "py-4 px-6 text-sm font-medium text-amber-900 whitespace-nowrap dark:text-white";
    const trClassOdd = "hover:bg-orange-50 dark:hover:bg-amber-700";
    const trClassEven = "bg-amber-50 hover:bg-orange-50 dark:hover:bg-amber-700";

    characters.sort((a: Character, b:Character): number => b.ini - a.ini);

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

            {characters.map((character: Character, index) => (
                <CharacterRow key={character.id} isCurrent={false} isEven={index %2 == 0} characters={characters} setCharacters={setCharacters} characterId={character.id}/>))}

            <tr className={trClassOdd}>
                <td className={tdClass} colSpan={14}><Add setCharacters={setCharacters}/></td>
            </tr>
            </tbody>
        </table>
    )
}

export default Table