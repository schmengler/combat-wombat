import {useEffect, useRef, useState} from "react";
import {Character} from "../Model/Character";
import {Modifier} from "../Model/Modifier";
import Counter from "./Counter";
import {WoundType} from "../Model/WoundType";

interface CounterProps<EntityType,PropertyType> {
    entity: EntityType,
    property: keyof EntityType,
    getCurrentCharacter: () => Character,
    setEntity: (update: (current: EntityType) => EntityType) => void,
    invertColors?: boolean,
    useWoundType?: boolean
    showMarker?: boolean
}

function MultiCounter(
    {
        entity, property, setEntity, getCurrentCharacter,
        invertColors = true,
        useWoundType = false,
        showMarker = false
    }: CounterProps<Character, Modifier[]>
) {

    const characterId = entity.id;
    const [detailsShown, setDetailsShown] = useState(false);
    const [newModifier, setNewModifier] = useState(new Modifier(characterId));

    const handleChangeWoundType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewModifier((value: Modifier) => {
            const clone = Object.assign(new Modifier(characterId), value);
            clone.woundType = WoundType[event.target.value as keyof typeof WoundType];
            return clone;
        });
    };
    const handleAddModifier = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEntity((value: Character) => {
            if (newModifier.isEmpty()) {
                return value;
            }
            // clone to prevent side effects from double update
            const clone = Object.assign(new Character("", 0), value)
            const modifier = Object.assign(new Modifier(characterId), newModifier);
            modifier.inflictedByCharacterId = getCurrentCharacter().id;
            setNewModifier(new Modifier(characterId));
            // @ts-ignore
            clone[property] = [...clone[property], modifier];
            setDetailsShown(false);
            return clone;
        });
    };
    const handleRemoveModifier = (modifier: Modifier) => () => setEntity((value: Character) => {
        // clone to prevent side effects from double update
        const clone = Object.assign(new Character("", 0), value)
        // @ts-ignore
        clone[property] = clone[property].filter((item: Modifier) => item !== modifier)
        return clone;
    });

    // close details on click outside:
    const detailsRef = useRef(null);
    const onClickOutside = () => {
        setDetailsShown(false)
    };
    useEffect(() => {
        const handleClickOutside = (event: React.MouseEvent) => {
            // @ts-ignore
            if (detailsRef.current && !detailsRef.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        // @ts-ignore
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            // @ts-ignore
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);


    // @ts-ignore (we have to trust that entity[property] actually matches PropertyType
    const propertyValue: Modifier[] = entity[property];

    const toggleInfiniteRounds = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewModifier((m: Modifier) => {
            const clone = Modifier.clone(m);
            clone.rounds = event.target.checked ? Infinity : 0;
            return clone;
        })
    };

    return (
        <div className="w-full h-12 relative cursor-help">
            <div className={"w-full h-full flex items-center justify-center"} onClick={() => setDetailsShown((shown) => !shown)}>
                {showMarker && propertyValue.length > 0 && (<span>??? </span>)}
                {propertyValue.reduce((prev: number, current: Modifier) => prev + current.value, 0)}
            </div>
            <div ref={detailsRef}
                 hidden={!detailsShown}
                 className={"absolute bg-amber-100 top-10 p-2 z-10 drop-shadow text-left"}
            >
                <ol>
                    {propertyValue.map((modifier: Modifier, index: number) => (
                        <li className={"text-xl"} key={index}>
                            <button className={"inline-block text-orange-400"}
                                    onClick={handleRemoveModifier(modifier)}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </button>
                            &nbsp;<strong
                            className={modifier.value > 0 ? "text-green-600" : "text-red-600"}>{modifier.value}</strong>
                            &nbsp;({modifier.rounds})
                            &nbsp;{useWoundType && (<strong>{modifier.woundType}</strong>)}
                        </li>
                    ))}
                </ol>
                <button
                    className={"block px-7 py-3 bg-amber-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out"}
                    onClick={handleAddModifier}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M5 11l7-7 7 7M5 19l7-7 7 7"/>
                    </svg>
                </button>
                <table>
                    <thead>
                    <tr>
                        <th className={"font-bold text-center"}>Runden</th>
                        <th className={"font-bold text-center"}>Bonus/Malus</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={"align-top"}>
                            <Counter entity={newModifier} setEntity={setNewModifier} property={"rounds"} minValue={0}/>
                            <br />
                            <label className="select-none container block relative cursor-pointer text-xl">
                                <input className="text-amber-600 focus:ring-amber-400" type={"checkbox"} onChange={toggleInfiniteRounds} checked={newModifier.rounds === Infinity} />
                                ???
                            </label>
                        </td>
                        <td className={"align-top text-center"}><Counter entity={newModifier} setEntity={setNewModifier} property={"value"}
                                     useBigSteps={true} invertColors={invertColors}/>
                        </td>
                    </tr>
                    {useWoundType && (
                        <tr>
                            <td colSpan={2}>
                                <fieldset>
                                    {Object.entries(WoundType).map((entry) =>
                                        <label key={entry[0]} className={"block py-2 cursor-pointer"}>
                                            <input name={"woundType"} value={entry[0]} type={"radio"}
                                                // checked={newModifier.woundType == entry[1]}
                                                   onChange={handleChangeWoundType}
                                                   className={"text-amber-600 focus:ring-amber-400"}/> {entry[1]}
                                        </label>)}
                                </fieldset>
                            </td>
                        </tr>
                    )}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default MultiCounter