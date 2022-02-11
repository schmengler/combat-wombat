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
            {/*TODO: reset button*/}
            {/*TODO: load/save as text file ? */}
        </div>
    )
}

export default Actions;