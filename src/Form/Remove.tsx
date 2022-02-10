import {Character} from "../Model/Character";

// @ts-ignore
function Remove({setCharacters, characterId}) {
    const removeHandler = () => {
        setCharacters(
            (prev: Character[]): Character[] => {
                const removeIndex: number = prev.findIndex((c: Character) => c.id == characterId)
                return prev.filter((value, index) => index != removeIndex);
            }
        );
    }
    return (
        <button onClick={removeHandler}>
            <svg className="w-6 h-6 inline text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" /></svg>
        </button>
    )
}

export default Remove;