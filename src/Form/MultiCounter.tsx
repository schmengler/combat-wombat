import {useRef, useState} from "react";
import PropTypes from 'prop-types';
import {Character} from "../Model/Character";
import {Modifier} from "../Model/Modifier";
import Counter from "./Counter";
import {WoundType} from "../Model/WoundType";

function MultiCounter({entity, property, setEntity, minValue = Number.MIN_SAFE_INTEGER, invertColors = false, useWoundType = false}) {
    const [detailsShown, setDetailsShown] = useState(false);

    const [newModifier, setNewModifier] = useState(new Modifier(0, 0));

    const handleChangeWoundType = (event: React.ChangeEvent<HTMLInputElement>) => setNewModifier((value: Modifier) => {
        value.woundType = WoundType[event.target.value as keyof typeof WoundType];
        return Object.assign({}, value);
    });
    const handleAddModifier = (event: React.MouseEvent<HTMLButtonElement>) => setEntity((value: Character) => {
        // clone to prevent side effects from double update
        const clone = Object.assign(new Character(""), value)
        const modifier = Object.assign(new Modifier(), newModifier);
        clone[property] = [...clone[property], modifier];
        return clone;
    });
    const handleRemoveModifier = (modifier: Modifier) => () => setEntity((value: Character) => {
        // clone to prevent side effects from double update
        const clone = Object.assign(new Character(""), value)
        clone[property] = clone[property].filter((item: Modifier) => item !== modifier)
        return clone;
    });

    return (
        <div className="h-10 w-20 relative cursor-help">
            <span className={"text-2xl"}  onClick={() => setDetailsShown((shown) => !shown)}>
                {entity[property].reduce((prev: number, current: Modifier) => prev + current.value, 0)}
            </span>
            <div hidden={!detailsShown} className={"absolute bg-amber-100 top-10 p-2 z-10 drop-shadow"}>
                <ol>
                    {entity[property].map((modifier: Modifier) => (
                        <li className={"text-xl"}>
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
                <button className={"block px-7 py-3 bg-amber-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out"}
                        onClick={handleAddModifier}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M5 11l7-7 7 7M5 19l7-7 7 7"></path>
                    </svg>
                </button>
                <strong>Runden</strong> <Counter entity={newModifier} setEntity={setNewModifier} property={"rounds"} />
                <strong>Bonus/Malus</strong> <Counter entity={newModifier} setEntity={setNewModifier} property={"value"} useBigSteps={true} />
                {useWoundType && (
                    <fieldset>
                        {Object.entries(WoundType).map((entry) =>
                            <label className={"block py-2 cursor-pointer"}>
                                <input name={"woundType"} value={entry[0]} type={"radio"}
                                       checked={newModifier.woundType == entry[1]}
                                       onChange={handleChangeWoundType}
                                       className={"text-amber-600 focus:ring-amber-400"}/> {entry[1]}
                            </label>)}
                    </fieldset>
                )}
            </div>
        </div>
    )
}

MultiCounter.propTypes = {
    property: PropTypes.string,
    minValue: PropTypes.number,
    invertColors: PropTypes.bool,
    useWoundType: PropTypes.bool,
}

export default MultiCounter