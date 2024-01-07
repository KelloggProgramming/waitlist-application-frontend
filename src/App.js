import logo from './logo.svg';
import './App.css';
import AllTableComponent from './components/AllTableComponent';
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import TableCardGrid from "./components/tableCardGrid/TableCardGrid";
import TablePage from "./components/TablePage";


function App() {

    return (
        <div className="App">
            {/*<AllTableComponent/>*/}
            <TablePage />
        </div>
    );
}

export default App;
