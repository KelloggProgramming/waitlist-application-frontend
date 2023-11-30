import React from "react";
import AllTableService from "../services/AllTableService";
import { useState } from "react";

class AllTableComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tables: []
        }
    }

    componentDidMount() {

        AllTableService.getTables()
            .then(response => response.json())
            .then(data => this.setState({ tables: data }));
    }

    render() {
        // console.log(tables[0].inUse);
        console.log(this.state);
        return (
            <div>
                <h1 className="text-center">Tables List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Table Id</td>
                            <td>Table Number</td>
                            <td>Table in Use</td>
                            <td>Table in use start time</td>
                            <td>Table Reservations</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tables.map(
                                table =>
                                    (<tr key={table.id}>
                                        {/* Seperation */}
                                        <td>{table.id}</td>
                                        <td>{table.tableNumber}</td>
                                        <td>{table.inUse ? "true": "false"}</td>
                                        <td>{table.inUseStartTime ? table.inUseStartTime: "null"}</td>
                                        <td>{table.reservations}</td>

                                    </tr>)
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    

}
// const tables =
//     [{ "id": "8f2cbc48-5a91-4eb4-92c9-34520f81d16c", "tableNumber": 9, "inUse": false, "inUseStartTime": null, "reservations": [] },
//     { "id": "e263b1c8-72a9-4a15-8cbc-fed8b7e7b919", "tableNumber": 2, "inUse": false, "inUseStartTime": null, "reservations": [] },
//     { "id": "1bdfa683-7a1b-48fc-a99f-bdd3ca908951", "tableNumber": 3, "inUse": true, "inUseStartTime": "2023-11-26T20:12:14.59472", "reservations": [] },
//     { "id": "192f3703-aac7-44d8-a291-8d10b24a7897", "tableNumber": 5, "inUse": true, "inUseStartTime": "2023-11-26T21:17:16.102329", "reservations": [] },
//     { "id": "e84f6123-3903-4c0f-a0ce-632746d0375a", "tableNumber": 1, "inUse": true, "inUseStartTime": "2023-11-30T18:51:50.478871", "reservations": [] }]

export default AllTableComponent;