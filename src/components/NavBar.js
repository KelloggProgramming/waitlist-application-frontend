import {ConnectionStatus} from "../services/apiSlice";
import WifiTetheringOffIcon from "@mui/icons-material/WifiTetheringOff";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import {useSelector} from "react-redux";

export default function NavBar(props) {
    const {pageContent} = props;

    const apiConnectionStatus = useSelector((state) => state.apiConnectionStatus.value);

    const connectionIcon = () => {
        if (apiConnectionStatus === ConnectionStatus.DISCONNECTED) {
            return <WifiTetheringOffIcon style={{"color": "gold"}}/>
        } else if (apiConnectionStatus === ConnectionStatus.CONNECTED) {
            return <WifiTetheringIcon/>

        }
    }

    return (
        <div className={"nav-bar"}>
            <div className={"nav-bar-page-content"}>
                {pageContent()}
            </div>
            <div className={"nav-bar-status-section"}>
                {connectionIcon()}
            </div>
        </div>
    );
}