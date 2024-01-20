import TableCardGrid from "./tableCardGrid/TableCardGrid";
import {useEffect, useState} from "react";
import TableService from "../services/TableService";

export default function TablePage() {

    const [tables, setTables] = useState(null);

    const updateTablesList = () => {
        TableService.getTables()
            .then(res => res.json())
            .then(jsonTables => {
                jsonTables.sort((a, b) => a.tableNumber > b.tableNumber)
                setTables(jsonTables)
                console.log("Setting Tables")
            })
    }
    useEffect(() => {
        updateTablesList();
    }, []);

    return (
        <>
            hello
            <TableCardGrid tables={tables} refreshHook={updateTablesList}/>
        </>
    );
}