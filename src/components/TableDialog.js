import Dialog from "@mui/material/Dialog";
import {Button, DialogTitle} from "@mui/material";

// export interface TableDialogProps {
//     open: boolean;
//     selectedValue: string;
//     onClose: (value: string) => void;
// }
export default function TableDialog(props) {
    const {onClose, selectedValue, open} = props;

    const handleClose = () => {
        onClose("CLOSED!!");
    }

    const handleButtonClick = (status) => {
        onClose(status);
    }

    return (
      <Dialog onClose={handleClose} open={open} >
          <DialogTitle>THIS is the title!</DialogTitle>
          <Button onClick={() => handleButtonClick("AVAILABLE")}>Available</Button>
          <Button onClick={() => handleButtonClick("INUSE")}>in-use</Button>
          <Button onClick={() => handleButtonClick("RESERVED")}>Reserved</Button>

      </Dialog>
    );
}