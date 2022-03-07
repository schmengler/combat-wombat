import {Character} from "../Model/Character";

interface LoseIniProps
{
    entity: Character,
    getCurrentCharacter: () => Character,
    setEntity: (update: (current: Character) => Character) => void,
}

function LoseIni({entity, setEntity, getCurrentCharacter}: LoseIniProps) {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEntity((value: Character): Character => {
            // clone to prevent side effects from double update
            const clone: Character = Object.assign(Object.create(Object.getPrototypeOf(value)), value)
            clone.nextRoundIni = Math.min(clone.nextRoundIni, getCurrentCharacter().nextRoundIni - 1);
            return clone;
        });
    }

    const canLoseIni = entity.nextRoundIni >= getCurrentCharacter().nextRoundIni && entity.id !== getCurrentCharacter().id;
    return (
        <div>
            <div className={entity.ini < entity.originalIni ? "font-bold text-red-600" : ""}>Aktuell: {entity.ini}</div>
            <div className={entity.nextRoundIni < entity.originalIni ? "font-bold text-red-600" : ""}>Nächste: {entity.nextRoundIni}</div>
            <button title={"Verliere Initiative"} onClick={handleClick} type={"button"} disabled={! canLoseIni} className={canLoseIni ? "text-red-600" : "text-gray-400"}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                          d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                          clipRule="evenodd"/>
                </svg>
            </button>
        </div>
    )
}

export default LoseIni;