import Table from './Table';
import {useState} from "react";

function App() {
    const [currentId, setCurrentId] = useState(null);
    const [characters, setCharacters] = useState([])

    return (
        <div className="App">
            <Table characters={characters} setCharacters={setCharacters} currentId={currentId} setCurrentId={setCurrentId}/>
        </div>
    )
}

export default App
