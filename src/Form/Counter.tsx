import "./Counter.css"
import {useRef, useState} from "react";
import PropTypes from 'prop-types';

// @ts-ignore
function Counter({entity, property, setEntity, minValue = Number.MIN_SAFE_INTEGER, invertColors = false, useBigSteps = false}) {
    const counterInput: React.MutableRefObject<HTMLInputElement|null> = useRef(null);
    const buttonInputs: React.MutableRefObject<HTMLDivElement|null> = useRef(null);
    const inputContainer: React.MutableRefObject<HTMLDivElement|null> = useRef(null);
    const [inputShown, setInputShown] = useState(false);

    /**
     * Sets state of the entity by cloning it and use the "update" callback on the current property
     *
     * @param update
     */
    function setValue(update: (current: number) => number) {
        setEntity((value: object): object => {
            // clone to prevent side effects from double update
            const clone = Object.assign(Object.create(Object.getPrototypeOf(value)), value)
            // @ts-ignore
            clone[property] = update(clone[property]);
            return clone;
        });
    }

    const increase = (by: number = 1) => () => {
        setValue((current: number) => Math.max(minValue, current + by));
        showButtons();
    };
    const decrease = (by: number = 1) => () => {
        setValue((current: number) => Math.max(minValue, current - by));
        showButtons();
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(() => Math.max(minValue, Number.parseInt(event.target.value)));
    }

    const showButtons = () => setInputShown(true);
    const hideButtons = function () {
        // timeout needed to not immediately hide while pressed
        setTimeout(() => {
            if (document.activeElement) {
                setInputShown(
                    (inputContainer.current == document.activeElement.parentElement)
                    || (buttonInputs.current == document.activeElement.parentElement)
                )
            } else {
                setInputShown(false);
            }
        }, 10);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        return event.key == 'Enter' && (event.target as HTMLElement).blur();
    }

    const cssRedButton = "inline-block m-1 rounded-full bg-red-600 text-white leading-normal uppercase shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9";
    const cssGreenButton = "inline-block m-1 rounded-full bg-green-600 text-white leading-normal uppercase shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9";

    return (
        <div className="custom-number-input h-full w-full">
            <div ref={inputContainer} className="flex flex-col h-full w-full rounded-lg relative bg-transparent mt-1 Zitems-center">
                <button
                    className="bg-amber-100 text-amber-600 hover:text-amber-700 hover:bg-amber-200 h-full w-10 rounded-r cursor-pointer"
                    onClick={increase()} onBlur={hideButtons}>
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>
                <input type="number" ref={counterInput}
                       className="outline-none focus:outline-none text-center w-10 bg-amber-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-amber-700  outline-none border-0 focus:ring-0 px-0 text-sm"
                       value={entity[property]} onClick={showButtons} onChange={handleChange} onKeyPress={handleKeyPress} onBlur={hideButtons}/>
                <button
                    className=" bg-amber-100 text-amber-600 hover:text-amber-700 hover:bg-amber-200 h-full w-10 rounded-l cursor-pointer outline-none"
                    onClick={decrease()} onBlur={hideButtons}>
                    <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <div ref={buttonInputs} hidden={!inputShown || !useBigSteps} className={"absolute bg-amber-100 left-full p-2 z-10 drop-shadow"}>
                    <button
                        className={invertColors ? cssGreenButton : cssRedButton}
                        onClick={increase(10)} onBlur={hideButtons}
                    >+10
                    </button>
                    <button
                        className={invertColors ? cssGreenButton : cssRedButton}
                        onClick={increase(100)} onBlur={hideButtons}
                    >+100
                    </button>
                    <br/>
                    <button
                        className={invertColors ? cssRedButton : cssGreenButton}
                        onClick={decrease(10)} onBlur={hideButtons}
                    >-10
                    </button>
                    <button
                        className={invertColors ? cssRedButton : cssGreenButton}
                        onClick={decrease(100)} onBlur={hideButtons}
                    >-100
                    </button>
                </div>
            </div>
        </div>
    )
}

Counter.propTypes = {
    property: PropTypes.string,
    minValue: PropTypes.number,
    invertColors: PropTypes.bool,
    useBigSteps: PropTypes.bool,
}

export default Counter