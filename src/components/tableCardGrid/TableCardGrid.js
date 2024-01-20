import Row from "react-bootstrap/Row";
import TableCard from "../tableCard/TableCard";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function TableCardGrid(props) {
    const tables = props.tables;
    const refreshHook = props.refreshHook;

    return (
        // <Container className="tables-grid">
        //     <div className="tables-grid">
        <Grid2 container spacing={2} columns={{xs:6, sm:12, md:10}}>
                {tables && tables.map(
                    table => (
                        // <Col xs={3} className="table-item" >
                        // <div className="table-item" >
                        <Grid2 xs={3} sm={3} md={2}>
                            <TableCard key={table.tableNumber} table={table} refreshHook={refreshHook}/>
                        </Grid2>
                    )
                )}
            </Grid2>
        // </Container>
    );
}