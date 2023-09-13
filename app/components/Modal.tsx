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
    handleDelete?: () => void,
    initialValue?: number,
    mode: "edit" | "delete"
}


export default function Modal({title, openDialog, handleCloseDialog, handleSaveDialog, initialValue, mode, handleDelete}: Props) {
    const [inputValue, setInputValue] = React.useState<number>(initialValue || 0);

    React.useEffect(() => {
        setInputValue(initialValue || 0);
    }, [initialValue]);

    let typeValue: string;
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
                <DialogTitle>{mode === "edit" ? `Update ${title}` : "Confirm deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {mode === "edit" ? "Please enter the new amount :" : "Are you sure you want to delete this category?"}
                    </DialogContentText>
                    {mode === "edit" && (
                        <OutlinedInput
                            defaultValue={initialValue}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}
                            color="secondary"
                            size="small">
                        Cancel
                    </Button>
                    {mode === "edit" ? (
                        <Button
                            onClick={() => handleSaveDialog(inputValue, typeValue)}
                            color="success"
                            size="small"
                            disabled={!inputValue}
                        >
                            Save
                        </Button>
                    ) : (
                        <Button
                            onClick={handleDelete}
                            size="small"
                            color="error"
                        >
                            Delete
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );

}


