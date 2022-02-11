import "./Checkbox.css"

// @ts-ignore
function Checkbox({entity, setEntity, property}) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEntity((value: object): object => {
            // clone to prevent side effects from double update
            const clone = Object.assign(Object.create(Object.getPrototypeOf(value)), value)
            clone[property] = event.target.checked;
            return clone;
        });
    }

    return (
        <div className={"w-full relative flex justify-center align-center"}>
            <label className="select-none container block relative cursor-pointer text-xl pl-8 left-1/2 -mt-2 -ml-4">
                <input className="absolute opacity-0 left-0 top-0 cursor-pointer" type="checkbox" checked={entity[property]} onChange={handleChange} />
                    <span className="h-6 w-6 checkmark absolute top-0 left-0 bg-amber-100" />
            </label>
        </div>
    )
}

export default Checkbox;