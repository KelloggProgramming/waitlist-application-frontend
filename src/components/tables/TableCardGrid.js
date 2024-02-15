import TableCard from "./TableCard";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function TableCardGrid(props) {
    const tables = props.tables;
    const refreshHook = props.refreshHook;

    const errorMessage = () => {
        return (<p>No tables to display</p>);
    }

    //TODO Check is tables is null
    const tableGrid = () => {
        return (
            <Grid2 container spacing={2} columns={{xs: 6, sm: 12, md: 10}}>
                {tables && tables.map(
                    table => (
                        <Grid2 key={table.id} xs={3} sm={3} md={2}>
                            <TableCard key={table.tableNumber} table={table} refreshHook={refreshHook}/>
                        </Grid2>
                    )
                )}
            </Grid2>
        );
    }


    return (
        <>
            {tables.length === 0 ? errorMessage() : tableGrid()}
        </>
    );
}