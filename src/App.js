import logo from './logo.svg';
import './App.css';
import AllTableComponent from './components/AllTableComponent';
import TableCard from "./components/tableCard/old/TableCard";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import TableCardGrid from "./components/tableCardGrid/TableCardGrid";

function App() {
    const [tables, setTables] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/tables")
            .then(res => res.json())
            .then(jsonTables => {
                jsonTables.sort((a, b) => a.tableNumber > b.tableNumber)
                setTables(jsonTables)
            })
    }, []);

    return (
        <div className="App">
            {/*<AllTableComponent/>*/}
            <TableCardGrid tables={tables} />
        </div>
    );
}

export default App;
