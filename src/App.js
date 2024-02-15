import './App.css';
import TablePage from "./components/TablePage";
import {alpha, createTheme, CssBaseline, getContrastRatio, ThemeProvider} from "@mui/material";


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
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <TablePage/>
            </ThemeProvider>

        </div>
    );
}

export default App;
