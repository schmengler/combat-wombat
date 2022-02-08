function Actions() {
    return (
        <div className={"container mx-auto"}>
            <span className={"text-2xl px-6"}>An der Reihe: <span className={"font-bold"}>Tysko</span></span>
            <button type="button"
                    className="inline-block px-7 py-3 bg-amber-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out">
                Nächster!
            </button>
        </div>
    )
}

export default Actions;