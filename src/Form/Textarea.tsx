import {useRef} from "react";

interface TextAreaProps<EntityType> {
    entity: EntityType,
    property: string & keyof EntityType,
    setEntity: (update: (current: EntityType) => EntityType) => void,
}

function Textarea({entity, property, setEntity}: TextAreaProps<any>)
{
    const form : React.MutableRefObject<HTMLFormElement|null> = useRef(null);

    const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
        setEntity((value: object): object => {
            return Object.assign(Object.create(Object.getPrototypeOf(value)), {
                ...value,
                // @ts-ignore we must trust that elements[property] exists
                [property]: ((event.target as HTMLFormElement).elements[property] as HTMLInputElement).value
            });
        });
        event.preventDefault();
    }
    const submitForm = () => (form.current as HTMLFormElement).dispatchEvent(new Event("submit", {
        bubbles: true,
        cancelable: true
    }));

    return (
        <form onSubmit={handleChange} ref={form}>
            <textarea name={property} defaultValue={entity[property]}
                      className={"w-full h-20 p-1 text-sm"}
                      onBlur={submitForm}
            />
        </form>
    );
}

export default Textarea;