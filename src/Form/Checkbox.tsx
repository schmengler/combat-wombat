import "./Checkbox.css"

function Checkbox() {
    return (
        <span>
            <label className="select-none container block relative cursor-pointer text-xl pl-8">
                <input className="absolute opacity-0 left-0 top-0 cursor-pointer" type="checkbox" />
                    <span className="h-6 w-6 checkmark absolute top-0 left-0 bg-amber-100" />
            </label>
        </span>
    )
}

export default Checkbox;