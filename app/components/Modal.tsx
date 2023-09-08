import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {Button, OutlinedInput} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import React from "react";
import {ThemeProvider} from '@mui/material'
import {theme} from "@/app/utils/MUItheme";

interface Props {
    title: string,
    openDialog: boolean,
    handleCloseDialog: () => void,
    handleSaveDialog: (newValue: string, typeValue: string) => void,
    initialValue?: string
}

export default function Modal({title, openDialog, handleCloseDialog, handleSaveDialog, initialValue}: Props) {
    const [inputValue, setInputValue] = React.useState<string>(initialValue || '');

    React.useEffect(() => {
        setInputValue(initialValue || '');
    }, [initialValue]);

    let typeValue : string;
    if (title === 'planned amount') {
        typeValue = 'plannedAmount';
    }

    if (title === 'actual amount') {
        typeValue = 'actualAmount';
    }

    if (title === 'category name') {
        typeValue = 'categoryName';
    }

    return (
        <ThemeProvider theme={theme}>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{`Update ${title}`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the new amount :
                </DialogContentText>
                <OutlinedInput
                    defaultValue={initialValue}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} variant="contained">Cancel</Button>
                <Button onClick={() => handleSaveDialog(inputValue, typeValue)} color="secondary"
                        variant="contained" autoFocus disabled={!inputValue}>Save</Button>
            </DialogActions>
        </Dialog>
        </ThemeProvider>
    )
}


