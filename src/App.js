import './App.css';
import TablePage from "./components/TablePage";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";


function App() {

    const darkTheme = createTheme({
        palette: {
            background: {
                default: "black"
            }
        }
    })
    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                {/*<AllTableComponent/>*/}
                <TablePage/>
            </ThemeProvider>

        </div>
    );
}

export default App;
