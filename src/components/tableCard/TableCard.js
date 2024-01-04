import {Box, Card, CardContent, CardHeader, Paper, styled, Typography} from "@mui/material";
import {CardFooter, CardTitle} from "react-bootstrap";
import PersonIcon from '@mui/icons-material/Person';
import Grid from "@mui/material/Unstable_Grid2";

export default function TableCard({table}) {
    const Item = styled(Box)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        // ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const getStatusColor = (status) => {
        return "black";
        switch (status) {
            case 'AVAILABLE':
                return 'green';
            case 'RESERVED':
                return '#e25f00';
            case 'UNKNOWN':
                return 'purple';
            default:
                return 'grey';
        }

        return "black";
    }

    const getStatusBackkgroundColor = (status) => {
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

    if (table === undefined)
        return "Whoops!";

    const numOfSeatsDisplay = (table.numberOfSeats > 0) ? table.numberOfSeats : table.tableType.numberOfSeats
    return (
        <Card sx={{maxWidth: 150}} style={{backgroundColor: getStatusBackkgroundColor(table.status)}} className="table-card">
            <CardTitle>
                <Typography style={{color: getStatusColor(table.status), fontWeight: 500}} align="center" variant="h5" >
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
                    <Grid xs={4}>1</Grid>
                    <Grid xs={4}>2</Grid>
                    <Grid xs={4}><PersonIcon fontSize="small" /> {numOfSeatsDisplay}</Grid>
                </Grid>
        </Card>
    );
}