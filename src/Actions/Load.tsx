// @ts-ignore
import {useRef} from "react";
import {Character} from "../Model/Character";

interface LoadProps
{
    setCharacters: (update: (current: Character[]) => Character[]) => void
    setCurrentId: (update: (current: number) => number) => void
}

function Load({setCharacters, setCurrentId}: LoadProps) {

    const inputFile = useRef<HTMLInputElement | null>(null)

    function loadDialog() {
        (inputFile.current as HTMLInputElement).value = '';
        (inputFile.current as HTMLInputElement).click();
    }
    function load(event: React.FormEvent<HTMLInputElement>) {
        event.stopPropagation();
        event.preventDefault();
        // @ts-ignore
        const file: File = (event.target as HTMLInputElement).files[0];
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
            try {
                const {characters, currentId} = JSON.parse((reader.result as string));
                if (!(characters instanceof Array && typeof currentId === 'number')) {
                    alert('Invalid file format');
                    return;
                }
                setCharacters((current) => {
                    try {
                        return (characters).map(
                            (data: object): Character => Object.assign(new Character('', 0), data)
                        ).map(
                            (character: Character): Character => {
                                // backwards compatibility
                                if (!character.originalIni) {
                                    character.originalIni = character.ini
                                }
                                if (!character.nextRoundIni) {
                                    character.nextRoundIni = character.ini
                                }

                                return character
                            }
                        );
                    } catch (e) {
                        alert('Could not read characters from save file')
                        return current;
                    }
                });
                setCurrentId(() => currentId);
            } catch (e) {
                alert('File is not valid JSON')
            }
        });
        reader.readAsText(file);
    }


    return (
        <div className={"text-left inline-block mx-2"}>
            <input type='file' ref={inputFile} style={{display: 'none'}} onInput={load}/>
            <button type="button"
                    className="inline-block px-2 py-2 bg-amber-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={loadDialog}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
            </button>
        </div>
    )
}

export default Load;