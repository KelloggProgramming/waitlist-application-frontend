import {Card, CardContent, Typography} from "@mui/material";
import {CardTitle} from "react-bootstrap";
import Grid from "@mui/material/Unstable_Grid2";
import TableService from "../../services/TableService";
import useInterval from "../../utilities/UseInterval";
import {useState} from "react";
import TableDialog from "../TableDialog";

import PersonIcon from '@mui/icons-material/Person';
import LockClockIcon from '@mui/icons-material/LockClock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import {TableStatus} from "../TableStatus";
import {calculateElapsedTimeFormatted} from "../../utilities/TimeUtilities";


export default function TableCard({table, refreshHook}) {
    const [elapsedTime, setElapsedTime] = useState("--:--")
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleDialogClose = (status) => {
        setOpen(false);
        changeTableStatus(status);
        console.log("table " + table.tableNumber + " updated to " + status);
    }

    const StatusIconWrapper = (props) => {
        const {IconComponent} = props;
        return <IconComponent fontSize={"large"} htmlColor={getStatusColor(table.status)}/>
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'AVAILABLE':
                return <StatusIconWrapper IconComponent={CheckCircleIcon}/>;
            case 'INUSE':
                return <StatusIconWrapper IconComponent={RemoveCircleIcon}/>;
            case 'RESERVED':
                return <StatusIconWrapper IconComponent={LockClockIcon}/>;
            case 'UNKNOWN':
                return <StatusIconWrapper IconComponent={DangerousIcon}/>;
            default:
                return '';
        }
    }

    const getStatusColor = (status) => {
        return "black";
    }

    const getStatusBackgroundColor = (status) => {
        let color = TableStatus.find(tableStatus => tableStatus.name === status)
        return color.backgroundColor;
    }

    useInterval(() => setElapsedTime(calculateElapsedTimeFormatted(table.statusUpdated)), 1000);

    //TODO:
    // if (table === undefined)
    //     return "Whoops!";

    const changeTableStatus = (status) => {
        // let newStatus = table.status === "AVAILABLE" ? "INUSE" : "AVAILABLE";
        //TODO Validation that passed in is a valid status
        if (status) {
            TableService.updateStatus(table.id, status).then(res => {
                console.log("finished request")
                refreshHook();
            });
        }
    }

    const numOfSeatsDisplay = (table.numberOfSeats > 0) ? table.numberOfSeats : table.tableType.numberOfSeats

    return (
        <>
            <Card
                onClick={() => handleClickOpen()}
                sx={{maxWidth: 150}}
                style={{backgroundColor: getStatusBackgroundColor(table.status)}}
                className="table-card"
            >
                <CardTitle>
                    <Typography
                        style={{color: getStatusColor(table.status), fontWeight: 500}}
                        align="center"
                        variant="h5"
                    >
                        {elapsedTime}
                    </Typography>
                </CardTitle>

                <CardContent>
                    <Typography align="center" variant="h3">
                        {table.tableNumber}
                    </Typography>
                    <Typography align="center" variant="caption">
                        {getStatusIcon(table.status)}
                    </Typography>
                </CardContent>

                <Grid container className="table-card-footer">
                    <Grid xs={8}>{table.status}</Grid>
                    <Grid xs={4}><PersonIcon fontSize="small"/> {numOfSeatsDisplay}</Grid>
                </Grid>
            </Card>
            <TableDialog open={open} onClose={handleDialogClose}/>
        </>
    );
}