import {Character} from "./Model/Character";

// @ts-ignore
function Actions({characters, setCharacters, currentId, setCurrentId, characterTable}) {

    // from CharacterRow, common parts should be extracted
    const updateCharacterOnTurn = (characterId: number, prevCharacterId: number) => {
        setCharacters((allCharacters: Character[]) => {
            // clone all to prevent double update, because others are affected by beforeTurn() as well
            const updatedCharacters = allCharacters.map(Character.clone);
            const prevIndex = updatedCharacters.findIndex((c: Character) => c.id == prevCharacterId)
            const index = updatedCharacters.findIndex((c: Character) => c.id == characterId)
            if (updatedCharacters[prevIndex]) {
                updatedCharacters[prevIndex] = updatedCharacters[prevIndex].afterTurn(updatedCharacters);
            }
            updatedCharacters[index] = updatedCharacters[index].beforeTurn(updatedCharacters);
            setCurrentId(characterId);
            if (!updatedCharacters[index].canAct()) {
                updateCharacterOnTurn(updatedCharacters[(index + 1) % updatedCharacters.length].id, characterId);
            }
            return updatedCharacters;
        });
        characterTable.current.querySelector('tr[data-character-id="'+characterId+'"]').scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
    }

    function getCurrent(): Character
    {
        if (currentId == null && characters.length > 0) {
            return new Character("Niemand", 0);
        } else {
            return characters.find((c: Character) => c.id == currentId) || new Character("Niemand", 0);
        }
    }

    function next() {
        if (characters.length == 0) {
            return;
        }
        const currentIndex: number = characters.findIndex((c: Character) => c.id == currentId);
        const nextIndex: number = (currentIndex + 1) % characters.length;
        updateCharacterOnTurn(characters[nextIndex].id, currentId)
    }

    function reset() {
        if (confirm('Alles löschen?')) {
            setCharacters([]);
            setCurrentId(null);
        }
    }

    const current: Character = getCurrent();

    return (
        <div className={"container mx-auto"}>
            <span className={"text-2xl px-6"}>An der Reihe: <span className={"font-bold"}>{current.name}</span></span>
            <button type="button"
                    className="inline-block px-7 py-3 bg-amber-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={next}
            >
                Nächster!
            </button>
            <button type="button"
                    className="ml-6 inline-block px-7 py-3 bg-red-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={reset}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            {/*TODO: load/save as text file ? */}
        </div>
    )
}

export default Actions;