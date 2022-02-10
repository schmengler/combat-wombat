import Table from './Table';
import Actions from './Actions'
import {useState} from "react";

function App() {
    const [currentId, setCurrentId] = useState(null);
    const [characters, setCharacters] = useState([])

    return (
        <div className="App">
            <header>
                <h1 className="text-3xl font-bold bg-[#ead0ad]">
                    <img alt="" src={"https://i.pinimg.com/564x/5b/bd/ec/5bbdecfe174748f3aa6272cb6ad04494.jpg"} width={100} className={"inline"} />
                    Combat Wombat <sup>for Rolemaster</sup>
                </h1>
            </header>
            <Table characters={characters} setCharacters={setCharacters} currentId={currentId}/>
            <Actions characters={characters} currentId={currentId} setCurrentId={setCurrentId}/>
        </div>
    )
}

export default App
