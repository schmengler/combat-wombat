import Table from './Table';
import Actions from './Actions'

function App() {

    return (
        <div className="App">
            <header>
                <h1 className="text-3xl font-bold bg-[#ead0ad]">
                    <img alt="" src={"https://i.pinimg.com/564x/5b/bd/ec/5bbdecfe174748f3aa6272cb6ad04494.jpg"} width={100} className={"inline"} />
                    Combat Wombat <sup>for Rolemaster</sup>
                </h1>
            </header>
            <Table/>
            <Actions />
        </div>
    )
}

export default App
