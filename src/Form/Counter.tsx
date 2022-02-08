import "./Counter.css"
import {useState} from "react";
function Counter() {
    const [value, setValue] = useState(0);

    const increase = () => setValue((v: number) => v + 1);
    const decrease = () => setValue((v: number) => v - 1);
    return (
        <div className="custom-number-input h-10 w-20">
            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button className=" bg-amber-100 text-amber-600 hover:text-amber-700 hover:bg-amber-200 h-full w-20 rounded-l cursor-pointer outline-none" onClick={decrease}>
                    <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input type="number"
    className="outline-none focus:outline-none text-center w-full bg-amber-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-amber-700  outline-none"
    name="custom-input-number" value={value}/>
                <button className="bg-amber-100 text-amber-600 hover:text-amber-700 hover:bg-amber-200 h-full w-20 rounded-r cursor-pointer" onClick={increase}>
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>
            </div>
        </div>
    )
}

export default Counter