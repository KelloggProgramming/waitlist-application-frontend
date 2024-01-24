import TableCardGrid from "./tableCardGrid/TableCardGrid";
import {useEffect, useState} from "react";
import TableService from "../services/TableService";
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
            })
    }

    const updateTablesTypesList = () => {
        TableService.getTableTypes()
            .then(res => res.json())
            .then(jsonTableTypes => {
                setTableTypes(jsonTableTypes)
            })
    }


    useEffect(() => {
        updateTablesList();
        updateTablesTypesList();
    }, []);

    const filterTables = () => {
        if (!selectedTableTypeId) {
            return tables;
        } else {
            return tables?.filter(table => {
                return table.tableType.id === selectedTableTypeId
            })
        }
    }

    const filterButtons = () => {
        if (tableTypes && tableTypes.length > 0) {
            return (
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button key={0} onClick={() => setSelectedTableTypeId(null)}>reset</Button>
                    {tableTypes.map(tableType => {
                        return (
                            <Button key={tableType.id}
                                    onClick={() => setSelectedTableTypeId(tableType.id)}
                            >{tableType.name}</Button>
                        );
                    })}
                </ButtonGroup>
            );
        } else {
            return null;
        }
    }

    return (
        <>
            {filterButtons()}
            <TableCardGrid tables={filterTables()} refreshHook={updateTablesList}/>
        </>
    );
}