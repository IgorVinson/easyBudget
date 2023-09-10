import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface Props {
    open: boolean;
    handleClose: () => void;
    handleAddCategory: (
        name: string,
        plannedAmount: number
    ) => void;
}

export default function AddCategoryDialog({open, handleClose, handleAddCategory}: Props) {
    const [name, setName] = useState("");
    const [plannedAmount, setPlannedAmount] = useState(0);


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter details for the new category.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Category Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Planned Amount"
                    type="number"
                    fullWidth
                    value={plannedAmount}
                    onChange={(e) => setPlannedAmount(Number(e.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleAddCategory(name, plannedAmount)} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}
