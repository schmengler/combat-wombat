import Add from "./Form/Add"
import {Character} from "./Model/Character";
import CharacterRow from "./Form/CharacterRow";
import Actions from "./Actions";
import {useRef} from "react";


// @ts-ignore
function Table({characters, setCharacters, currentId, setCurrentId}) {

    const tableClass = "min-w-full divide-y divide-amber-200 table-fixed dark:divide-amber-700 w-full";
    const theadClass = "bg-amber-100 dark:bg-amber-700 w-full z-10 sticky top-0 drop-shadow";
    const thClass = "py-3 text-xs font-medium tracking-wider text-left text-amber-700 uppercase dark:text-amber-400 sm:-rotate-90 xl:rotate-0 sm:px-1 xl:px-6";
    const tbodyClass = "bg-white divide-y divide-amber-200 dark:bg-amber-800 dark:divide-amber-700";
    const tfootClass = "bottom-0 sticky bg-white/80";

    const characterTable = useRef(null);

    const tdClass = "py-1 text-sm font-medium text-amber-900 whitespace-nowrap dark:text-white sm:px-1 xl:px-6 align-middle text-center border-dotted border-x border-amber-600";

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
            <tbody className={tbodyClass} ref={characterTable}>

            {characters.map((character: Character, index: number) => (
                <CharacterRow tdClass={tdClass} key={character.id} isCurrent={currentId == character.id} isEven={index %2 == 0} characters={characters} setCharacters={setCharacters} characterId={character.id}/>))}

            </tbody>
            <tfoot className={tfootClass}>
                <tr>
                    <td className={tdClass} colSpan={7}>
                        <Add setCharacters={setCharacters}/>
                    </td>
                    <td className={tdClass} colSpan={7}>
                        <Actions characters={characters} characterTable={characterTable} setCharacters={setCharacters} currentId={currentId} setCurrentId={setCurrentId}/>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

export default Table