import Row from "react-bootstrap/Row";
import TableCard from "../tableCard/TableCard";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

export default function TableCardGrid(props) {
    const tables = props.tables;

    return (
        <Container>
            <Row>
                {tables && tables.map(
                    table => (
                        <Col>
                            <TableCard key={table.tableNumber} table={table}/>
                        </Col>
                    )
                )}
            </Row>
        </Container>
    );
}