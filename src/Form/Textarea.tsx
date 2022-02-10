import {useRef} from "react";

// @ts-ignore
function Textarea({entity, property, setEntity})
{
    const form : React.MutableRefObject<HTMLFormElement|null> = useRef(null);

    const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
        setEntity((value: object): object => {
            return Object.assign(Object.create(Object.getPrototypeOf(value)), {
                ...value,
                [property]: ((event.target as HTMLFormElement).elements[property] as HTMLInputElement).value
            });
        });
        event.preventDefault();
    }
    const submitForm = () => (form.current as HTMLFormElement).dispatchEvent(new Event("submit", {bubbles: true, cancelable: true}));

    return (
        <form onSubmit={handleChange} ref={form}>
            <textarea name={property} defaultValue={entity[property]}
               className={"w-full"}
               onBlur={submitForm}
        />
        </form>
    );
}

export default Textarea;