import TableCardGrid from "./tableCardGrid/TableCardGrid";
import {useEffect, useState} from "react";
import TableService from "../services/TableService";
import {Button, ButtonGroup, Chip} from "@mui/material";
import useInterval from "../utilities/UseInterval";

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

    useInterval(() => updateTablesList(), 1000);

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

    const filterChips = () => {
        if (tableTypes && tableTypes.length > 0) {
            const resetType = {
                id: null,
                name: "Reset",
            };

            const modifiedTypesList = [resetType, ...tableTypes];

            return modifiedTypesList.map(tableType => (
                    <Chip
                        key={tableType.id}
                        label={tableType.name}
                        onClick={() => setSelectedTableTypeId(tableType.id)}
                        variant={tableType.id === selectedTableTypeId ? "filled" : "outlined"}
                        className={"filter-chip"}
                        style={{
                            "marginLeft": "15px",
                            "color": "white"
                        }}
                    >{tableType.name}</Chip>
                )
            );
        } else {
            return null;
        }
    }

    return (
        <>
            <div className={"menu-bar"}>
                {filterChips()}
            </div>
            <TableCardGrid tables={filterTables()} refreshHook={updateTablesList}/>
        </>
    );
}