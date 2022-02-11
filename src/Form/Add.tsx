import {Character} from "../Model/Character";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

interface AddProps
{
    characters: Character[],
    setCharacters: (update: (current: Character[]) => Character[]) => void
}

function Add({characters, setCharacters}: AddProps) {

    const addCharacters = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputElement = (event.target as HTMLFormElement).elements.namedItem("addText") as HTMLInputElement;
        if (inputElement.value.trim() == '') {
            return;
        }
        // @ts-ignore
        const matches : string[] = inputElement.value.match(/^(?:(\d+) )?(.*?)(?: (\d+))?$/);
        const count: number = Number.parseInt(matches[1]) || 1;
        const name: string = matches[2];
        const ini: number = Number.parseInt(matches[3]) || 0;

        const lastNumberForName = characters.map(
            (c: Character) => c.name.match(new RegExp('^' + name + '(?: (\\d+))?'))
        ).filter(
            (match: RegExpMatchArray | null): boolean => match !== null
        ).map(
            // @ts-ignore TS does not understand that null is not possible here
            (match: RegExpMatchArray): number => parseInt(match[1]) || 1
        ).sort(
            (a: number, b: number): number => a - b
        ).pop() || 0;

        const added: Character[] = Array.from(
            {length: count},
            (x, i: number) => new Character(
                name + (count + lastNumberForName > 1 ? ' ' + (lastNumberForName + 1 + i) : ''),
                ini
            )
        );
        setCharacters((prev: Character[]) => [...prev, ...added]);
        inputElement.value = '';
    }

    return (
        <form onSubmit={addCharacters}>
            <svg className="w-6 h-6 inline text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" /></svg>
            <input name="addText" type="text" className={"mx-2"} placeholder={"[Anzahl] Name [Ini]"}/>
            <button type="submit"
                    className="inline-block px-7 py-3 bg-amber-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out">
                Hinzufügen
            </button>
        </form>
    )
}

export default Add;