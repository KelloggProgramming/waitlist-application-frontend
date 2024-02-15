import Dialog from "@mui/material/Dialog";
import {Button, IconButton, LinearProgress, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {TableStatus} from "../../constants/TableStatus";
import {useState} from "react";
import TableService from "../../services/TableService";
import {calculateElapsedTimeFormatted, roundToNearestMinutes} from "../../utilities/TimeUtilities";
import {MobileTimePicker} from "@mui/x-date-pickers";

export default function TableDialog(props) {
    const {onClose, table, open, refreshHook} = props;

    const [isLoading, setLoading] = useState(false);

    const quickActionDefinition = {
        AVAILABLE: "INUSE",
        RESERVED: "INUSE",
        INUSE: "AVAILABLE",
        UNKNOWN: "UNKNOWN"
    }

    const handleClose = () => {
        onClose();
    }

    const changeTableStatus = (status) => {
        //TODO Validation that passed in is a valid status
        if (status) {
            TableService.updateStatus(table.id, status, (result) => {
                if (result === null) {
                    setLoading(false);
                    return;
                }

                if (result.status !== 200) {
                    console.log("Error setting table " + table.tableNumber + " to " + status)
                } else {
                    console.log("table " + table.tableNumber + " updated to " + status);
                }
                refreshHook();
                setLoading(false);
                onClose();
            });
        }
    }

    const handleButtonClick = (status) => {
        setLoading(true);
        changeTableStatus(status);
    }

    const statusButtons = () => {
        return Object.values(TableStatus)
            .filter(tableStatus => tableStatus.accessible)
            .map(tableStatus => {
                return (
                    <Grid2 key={tableStatus.name}>
                        <Button
                            key={tableStatus.name}
                            disabled={isLoading}
                            variant={"contained"}
                            size={"large"}
                            className={"table-dialog-status-buttons"}
                            style={{"backgroundColor": tableStatus.buttonColor}}
                            onClick={() => handleButtonClick(tableStatus.name)}
                        >
                            {tableStatus.displayName}
                        </Button>
                    </Grid2>
                );
            })
    }

    const quickActionButton = () => {
        const quickActionName = quickActionDefinition[table.status];

        const quickActionTableStatus = TableStatus[quickActionName];
        // const quickActionTableStatus = TableStatus.find(tableStatus => tableStatus.name === quickActionName)

        if (quickActionTableStatus === undefined) {
            return (<Button
                    disabled
                    variant={"contained"}
                    size={"large"}
                    className={"table-dialog-quick-action"}
                >Unavailable</Button>
            );
        } else {
            return (<Button
                    variant={"contained"}
                    size={"large"}
                    disabled={isLoading}
                    className={"table-dialog-quick-action"}
                    style={{"backgroundColor": quickActionTableStatus.buttonColor}}
                    // color="available"
                    onClick={() => handleButtonClick(quickActionTableStatus.name)}
                >{quickActionTableStatus.displayName}</Button>
            );
        }

    }

    const nextReservation = () => {
        if (table.reservations && table.reservations.length === 0) {
            return "No upcoming reservations"
        } else if (table.reservations && table.reservations.length > 0) {
            return "Next one"
        }
    }

    const numberOfSeats = () => {
        if (!table.numberOfSeats && table.numberOfSeats === 0) {
            return table.tableType.numberOfSeats;
        } else {
            return table.numberOfSeats;
        }
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <div className={"table-dialog-close"}>
                <IconButton onClick={() => handleClose()} size={"large"}>X</IconButton>
            </div>

            <div className={"table-dialog-div"}>
                <Grid2 container justifyContent={"space-between"} direction={"column"} style={{"height": "100%"}}>
                    <Grid2 xs={12} className={"table-dialog-info"}>
                        <Typography variant={"h5"}>{table.displayName}</Typography>
                        <Typography variant={"subtitle2"}>{table.tableType.name}</Typography>
                        <div style={{"display": "flex", "height": "150px", "paddingTop": "10px"}}>
                            <div style={{"width": "50%", "textAlign": "left"}}>
                                <Typography><b>Table #:</b> {table.tableNumber}</Typography>
                                <Typography><b>Number of Seats:</b> {numberOfSeats()}</Typography>
                                <Typography><b>Current Status:</b> {TableStatus[table.status].displayName}</Typography>
                                <Typography><b>Time in Status:</b> {calculateElapsedTimeFormatted(table.statusUpdated)}
                                </Typography>
                            </div>
                            <div style={{"width": "50%"}}>
                                <Typography><b>Reservations</b></Typography>
                                <Typography>{nextReservation()}</Typography>
                                <MobileTimePicker minutesStep={5} defaultValue={roundToNearestMinutes(5)}/>

                            </div>
                        </div>
                    </Grid2>
                    {isLoading && <LinearProgress color="secondary"/>}
                    <Grid2 xs={12} container className={"table-dialog-buttons"}>
                        <Grid2 container xs={5} spacing={1} justifyContent={"center"} direction={"column"}>
                            {statusButtons()}
                        </Grid2>
                        <Grid2 xs={7} style={{"borderLeft": "2px solid #8a38ad"}}>
                            {quickActionButton()}
                        </Grid2>
                    </Grid2>
                </Grid2>
            </div>

        </Dialog>
    )
        ;
}