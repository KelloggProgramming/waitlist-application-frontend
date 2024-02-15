import './App.css';
import TablePage from "./components/tables/TablePage";
import {alpha, createTheme, CssBaseline, getContrastRatio, ThemeProvider} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

function App() {

    const violetBase = '#005216';
    const violetMain = alpha(violetBase, 0.7);

    const darkTheme = createTheme({
        palette: {
            available: {
                main: violetMain,
                light: alpha(violetBase, 0.5),
                dark: alpha(violetBase, 0.9),
                contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
            },
            background: {
                default: "black"
            }
        }
    })
    return (
        <div className="App">
            <div className="background"/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline/>
                    <TablePage/>
                </ThemeProvider>
            </LocalizationProvider>
        </div>
    );
}

export default App;
