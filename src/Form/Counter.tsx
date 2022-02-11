import GenericCounter from "./GenericCounter";

const Counter = (WrappedCounter: typeof GenericCounter) => ({ ...props}) => {

    const decorateUpdate = ((update: (current: number) => number): (current: number) => number => update);
    const propertyToNumber = ((v: number): number => (v));
    /*
     * Couldn't figure out how to make the generic type explicit here /shrug
     */
    // @ts-ignore
    return <WrappedCounter decorateUpdate={decorateUpdate} propertyToNumber={propertyToNumber} {...props} />

}

export default Counter(GenericCounter)