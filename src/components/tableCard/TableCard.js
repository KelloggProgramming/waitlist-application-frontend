import {Box, Card, CardContent, CardHeader, Paper, styled, Typography} from "@mui/material";
import {CardFooter, CardTitle} from "react-bootstrap";
import PersonIcon from '@mui/icons-material/Person';
import Grid from "@mui/material/Unstable_Grid2";
import TableService from "../../services/TableService";
import useInterval from "../../services/UseInterval";
import {useState} from "react";


export default function TableCard({table, refreshHook}) {

    const [elapsedTime, setElapsedTime] = useState("--:--")

    const getStatusColor = (status) => {
        switch (status) {
            case 'AVAILABLE':
                return 'green';
            case 'INUSE':
                return 'black';
            case 'RESERVED':
                return '#e25f00';
            case 'UNKNOWN':
                return 'purple';
            default:
                return 'grey';
        }

        return "black";
    }

    const getStatusBackgroundColor = (status) => {
        switch (status) {
            case 'AVAILABLE':
                return '#b5ffc7';
            case 'RESERVED':
                return '#eab896';
            case 'UNKNOWN':
                return 'purple';
            default:
                return 'grey';
        }

        return "black";
    }

    useInterval(() => setElapsedTime(calcElapsed()), 1000);

    // if (table === undefined)
    //     return "Whoops!";

    const changeTableStatus = () => {
        let newStatus = table.status === "AVAILABLE" ? "INUSE" : "AVAILABLE";
        TableService.updateStatus(table.id, newStatus).then(res => {
            console.log("finished request")
            refreshHook();
        });
    }

    const numOfSeatsDisplay = (table.numberOfSeats > 0) ? table.numberOfSeats : table.tableType.numberOfSeats

    const calcElapsed = () => {
        //TODO: make API return TZ offset
        //TODO ERROR HANDLE
        let elapsedSeconds = Math.ceil((Date.now() - new Date(table.statusUpdated + "+00:00")) / 1000);

        if (elapsedSeconds >= 3600) {
            let hours = Math.floor(elapsedSeconds / 3600);
            let minutes = elapsedSeconds % 3600;

            return hours + ":" + minutes;
        } else if (elapsedSeconds >= 60) {
            let minutes = Math.floor(elapsedSeconds / 60);
            let seconds = elapsedSeconds % 60;

            return minutes + ":" + seconds;
        } else if (elapsedSeconds < 60) {
            return "00:" + elapsedSeconds;
        }
    }

    return (
        <Card onClick={() => changeTableStatus()} sx={{maxWidth: 150}}
              style={{backgroundColor: getStatusBackgroundColor(table.status)}} className="table-card">
            <CardTitle>
                <Typography style={{color: getStatusColor(table.status), fontWeight: 500}} align="center" variant="h5">
                    {table.status}
                </Typography>
            </CardTitle>
            <CardContent>
                <Typography align="center" variant="h3">
                    {table.tableNumber}
                </Typography>
                <Typography align="center" variant="caption">
                    {table.tableType.name}
                </Typography>
            </CardContent>

            <Grid container className="table-card-footer">
                <Grid xs={4}>{elapsedTime}</Grid>
                <Grid xs={4}>2</Grid>
                <Grid xs={4}><PersonIcon fontSize="small"/> {numOfSeatsDisplay}</Grid>
            </Grid>
        </Card>
    );
}