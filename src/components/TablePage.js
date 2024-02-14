import TableCardGrid from "./tableCardGrid/TableCardGrid";
import {useEffect, useState} from "react";
import TableService from "../services/TableService";
import {Chip} from "@mui/material";
import useInterval from "../utilities/UseInterval";
import {disconnected} from "../services/apiSlice";
import NavBar from "./NavBar";
import {useDispatch} from "react-redux";

export default function TablePage() {
    const [tables, setTables] = useState([]);
    const [tableTypes, setTableTypes] = useState([]);
    const [selectedTableTypeId, setSelectedTableTypeId] = useState(null);

    const dispatch = useDispatch();

    const updateTablesList = () => {
        TableService.getTables()
            .then(res => res.json())
            .then(jsonTables => {
                jsonTables.sort((a, b) => a.tableNumber > b.tableNumber)
                setTables(jsonTables)
            }).catch(err => {
            console.log("Error refreshing tables")
            dispatch(disconnected())
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

    useInterval(() => updateTablesList(), 5000);

    const filterTables = () => {
        if (!selectedTableTypeId) {
            return tables;
        } else {
            return tables?.filter(table => {
                return table.tableType.id === selectedTableTypeId
            })
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
                    />
                )
            );
        } else {
            return null;
        }
    }


    return (
        <>
            <NavBar pageContent={filterChips}/>
            <TableCardGrid tables={filterTables()} refreshHook={updateTablesList}/>
        </>
    );
}