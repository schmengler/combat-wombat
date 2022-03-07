import {Character} from "../Model/Character";

// @ts-ignore
function NextTurn({characters, setCharacters, currentId, setCurrentId, characterTable}) {

    // from CharacterRow, common parts should be extracted
    const updateCharacterOnTurn = (nextIndex: number, prevCharacterId: number) => {
        setCharacters((allCharacters: Character[]) => {
            // clone all to prevent double update, because others are affected by beforeTurn() as well
            const updatedCharacters = allCharacters.map(Character.clone);

            // "new round" action
            if (nextIndex === 0) {
                updateIni(updatedCharacters)
            }

            const characterId = updatedCharacters[nextIndex].id;
            const prevIndex = updatedCharacters.findIndex((c: Character) => c.id == prevCharacterId)

            // "after turn" action
            if (updatedCharacters[prevIndex]) {
                updatedCharacters[prevIndex] = updatedCharacters[prevIndex].afterTurn(updatedCharacters);
            }
            // "before turn" action
            updatedCharacters[nextIndex] = updatedCharacters[nextIndex].beforeTurn(updatedCharacters);

            setCurrentId(characterId);
            if (!updatedCharacters[nextIndex].canAct()) {
                updateCharacterOnTurn((nextIndex + 1) % updatedCharacters.length, characterId);
            }
            characterTable.current.querySelector('tr[data-character-id="'+characterId+'"]').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
            return updatedCharacters;
        });
    }

    function getCurrent(): Character
    {
        if (currentId == null && characters.length > 0) {
            return new Character("Niemand", 0);
        } else {
            return characters.find((c: Character) => c.id == currentId) || new Character("Niemand", 0);
        }
    }

    /**
     * Set ini to nextRoundIni (from crits) and nextRoundIni to originalIni
     */
    function updateIni(updatedCharacters: Character[]): void
    {
        updatedCharacters.forEach((c: Character): void => {
            [c.ini, c.nextRoundIni] = [c.nextRoundIni, c.originalIni]
        });
        updatedCharacters.sort((a: Character, b:Character): number => b.ini - a.ini);

    }

    function next() {
        if (characters.length == 0) {
            return;
        }
        const currentIndex: number = characters.findIndex((c: Character) => c.id == currentId);
        const nextIndex: number = (currentIndex + 1) % characters.length;
        updateCharacterOnTurn(nextIndex, currentId)
    }

    const current: Character = getCurrent();

    return (
        <div className={"text-left inline-block"}>
            <button type="button"
                    className="inline-block px-7 py-3 bg-amber-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={next}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                </svg>
            </button>
            <span className={"text-2xl px-6"}>
                <span className={"font-bold"}>{current.name}</span>
            </span>
        </div>
    )
}

export default NextTurn;