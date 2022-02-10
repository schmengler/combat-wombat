import {Character} from "./Model/Character";

function Actions({characters, currentId, setCurrentId}) {

    function getCurrent(): Character|null
    {
        if (currentId == null && characters.length > 0) {
            return new Character("Niemand", 0);
        } else {
            return characters.find((c: Character) => c.id == currentId) || null;
        }
    }

    function next() {
        if (characters.length == 0) {
            return;
        }
        const currentIndex: number = characters.findIndex((c: Character) => c.id == currentId);
        const nextIndex: number = (currentIndex + 1) % characters.length;
        setCurrentId(characters[nextIndex].id);
    }

    const current: Character|null = getCurrent();

    return current && (
        <div className={"container mx-auto"}>
            <span className={"text-2xl px-6"}>An der Reihe: <span className={"font-bold"}>{current.name}</span></span>
            <button type="button"
                    className="inline-block px-7 py-3 bg-amber-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={next}
            >
                Nächster!
            </button>
        </div>
    )
}

export default Actions;