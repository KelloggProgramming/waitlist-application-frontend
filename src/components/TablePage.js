import TableCardGrid from "./tableCardGrid/TableCardGrid";
import {useEffect, useState} from "react";
import TableService from "../services/TableService";
import {Navbar} from "react-bootstrap";
import {Button, ButtonGroup} from "@mui/material";

export default function TablePage() {

    const [tables, setTables] = useState([]);
    const [tableTypes, setTableTypes] = useState([]);
    const [selectedTableTypeId, setSelectedTableTypeId] = useState(null);

    const updateTablesList = () => {
        TableService.getTables()
            .then(res => res.json())
            .then(jsonTables => {
                jsonTables.sort((a, b) => a.tableNumber > b.tableNumber)
                setTables(jsonTables)
                console.log("Setting Tables")
            })
    }

    const updateTablesTypesList = () => {
        TableService.getTableTypes()
            .then(res => res.json())
            .then(jsonTableTypes => {
                // jsonTableTypes.sort((a, b) => a.tableNumber > b.tableNumber)
                setTableTypes(jsonTableTypes)
                console.log("Setting Table Types")
            })
    }


    useEffect(() => {
        updateTablesList();
        updateTablesTypesList();
    }, []);

    const filterTables = () => {
        if(!selectedTableTypeId) {
            return tables;
        }else {
            return tables?.filter(table => {
                return table.tableType.id == selectedTableTypeId
            })
        }
    }

    console.log("func: ", filterTables())

    return (
        <>
            <Navbar>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button onClick={() => setSelectedTableTypeId(null)}>reset</Button>
                    {tableTypes.map(tableType => {
                        return (
                            <Button onClick={() => setSelectedTableTypeId(tableType.id)}>{tableType.name}</Button>
                        );
                    })}
                </ButtonGroup>
            </Navbar>
            <TableCardGrid tables={filterTables()} refreshHook={updateTablesList}/>
        </>
    );
}