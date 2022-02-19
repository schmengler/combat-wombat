import AddCharacter from "./Actions/AddCharacter"
import NextTurn from "./Actions/NextTurn";
import {Character} from "./Model/Character";
import CharacterRow from "./Form/CharacterRow";
import {MutableRefObject, useRef} from "react";
import Save from "./Actions/Save";


// @ts-ignore
function Table({characters, setCharacters, currentId, setCurrentId}) {

    const tableClass = "min-w-full divide-y divide-amber-200 table-auto dark:divide-amber-700 w-full";
    const theadClass = "bg-amber-100 dark:bg-amber-700 w-full z-10 sticky top-0 drop-shadow";
    const thClass = "py-1 px-2 text-xs xl:text-sm font-medium tracking-wider text-left text-amber-700 uppercase dark:text-amber-400 h-32 rotate-180 sideways";
    const tbodyClass = "bg-white divide-y divide-amber-200 dark:bg-amber-800 dark:divide-amber-700";
    const tfootClass = "bottom-0 sticky bg-white/80";

    const characterTable = useRef(null);

    const tdClass = "py-1 text-sm font-medium text-amber-900 whitespace-nowrap dark:text-white px-1 align-middle text-center";

    function reset() {
        if (confirm('Alles löschen?')) {
            setCharacters([]);
            setCurrentId(null);
        }
    }

    const headerRef: MutableRefObject<HTMLTableSectionElement|null> = useRef(null);
    const footerRef: MutableRefObject<HTMLTableSectionElement|null> = useRef(null);

    /**
     * Hide header and footer when virtual keyboard overlaps text input
     */
    const handleResize = (event: React.UIEvent<Window, "resize">) => {
        const virtualKeyboardVisible = event.currentTarget.visualViewport.height < 300;
        headerRef.current && (headerRef.current.hidden = virtualKeyboardVisible);
        footerRef.current && (footerRef.current.hidden = virtualKeyboardVisible);
    };
    // @ts-ignore
    window.addEventListener('resize', handleResize, true);


    characters.sort((a: Character, b:Character): number => b.ini - a.ini);
    return (
        <table className={tableClass}>
            <thead className={theadClass} ref={headerRef}>
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
                <th scope="col" className={thClass}>Am&nbsp;Boden</th>
                <th scope="col" className={thClass}>Bewusstlos</th>
                <th scope="col" className={thClass}>stirbt in __ Runden</th>
                <th scope="col" className={thClass}>tot</th>
                <th scope="col" className={thClass + " w-100"}>Notizen</th>
                <th scope="col" className={thClass}>&nbsp;</th>
            </tr>
            </thead>
            <tbody className={tbodyClass} ref={characterTable}>

            {characters.map((character: Character, index: number) => (
                <CharacterRow tdClass={tdClass} key={character.id} isCurrent={currentId == character.id}
                              currentId={currentId} isEven={index % 2 == 0} characters={characters}
                              setCharacters={setCharacters} characterId={character.id}
                />))}

            </tbody>
            <tfoot className={tfootClass} ref={footerRef}>
                <tr>
                    <td className={tdClass} colSpan={14}>
                        <div className={"text-left"}>
                            <AddCharacter characters={characters} setCharacters={setCharacters}/>
                            <NextTurn characters={characters} characterTable={characterTable} setCharacters={setCharacters} currentId={currentId} setCurrentId={setCurrentId}/>
                        </div>
                    </td>
                    <td className={tdClass}>
                        <button type="button"
                                className="inline-block px-7 py-3 bg-red-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={reset}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

export default Table