import TableCardGrid from "./tableCardGrid/TableCardGrid";
import {useEffect, useState} from "react";

export default function TablePage() {

    const [tables, setTables] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/tables")
            .then(res => res.json())
            .then(jsonTables => {
                jsonTables.sort((a, b) => a.tableNumber > b.tableNumber)
                setTables(jsonTables)
                console.log("Setting Tables")
            })
    }, []);

    return (
        <>
            hello
            <TableCardGrid tables={tables}/>
        </>
    );
}