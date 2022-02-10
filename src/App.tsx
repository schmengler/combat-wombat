import Table from './Table';
import {useEffect, useState} from "react";
import {Character} from "./Model/Character";

function App() {

    function getInitialCharacters() {
        return JSON.parse(localStorage.getItem('characters') || '[]').map(
            (data: object): Character => Object.assign(new Character('', 0), data)
        );
    }

    function getInitialCurrentId() {
        return Number.parseInt(localStorage.getItem('currentId') || '') || null;
    }


    function persistState() {
        localStorage.setItem('characters', JSON.stringify(characters));
        localStorage.setItem('currentId', JSON.stringify(currentId));
    }

    const [currentId, setCurrentId] = useState(getInitialCurrentId());
    const [characters, setCharacters] = useState(getInitialCharacters())

    useEffect(persistState, [characters]);

    return (
        <div className="App">
            <Table characters={characters} setCharacters={setCharacters} currentId={currentId} setCurrentId={setCurrentId}/>
        </div>
    )
}

export default App
