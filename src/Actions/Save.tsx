// @ts-ignore
function Save({characters, currentId}) {

    function save() {
        const filename = prompt('Save as', 'rolemaster-'+new Date().toISOString()+'.json');
        if (!filename) {
            return;
        }
        let link = document.createElement('a');
        link.download = filename;
        link.href = URL.createObjectURL(
            new Blob(
                [
                    JSON.stringify(
                        {
                            characters: characters,
                            currentId: currentId
                        }
                    )
                ],
                {
                    type: 'application/json'
                }
            )
        );
        link.click();
        URL.revokeObjectURL(link.href);

    }


    return (
        <div className={"text-left inline-block mx-2"}>
            <button type="button"
                    className="inline-block px-2 py-2 bg-amber-600 text-white font-bold text-xl leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={save}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </button>
        </div>
    )
}

export default Save;