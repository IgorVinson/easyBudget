'use client'
import React, {useState} from 'react';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    Paper,

    Box,
} from '@mui/material';
import {tableCellClasses} from '@mui/material/TableCell';
import {styled} from '@mui/material/styles';
import ModeIcon from '@mui/icons-material/Mode';
import Modal from "@/app/components/Modal";
import DeleteIcon from '@mui/icons-material/Delete';
import {log} from "util";
import Typography from "@mui/material/Typography";


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.contrastText2,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledSelect = styled('select')(({theme}) => ({
    backgroundColor: theme.palette.secondary.contrastText2,
    color: theme.palette.common.white,
    border: 'none',
    fontSize: 14,
    // добавьте другие стили, которые вы хотите применить к select
}));

interface Props {
    setCurrentBudgetID: (id: string) => void;
    allBudgets: Array<object>;
    currentMonth: string;
    setCurrentMonth: (month: string) => void;
    fetchBudgets: () => void;

}

export default function BudgetTable({
                                        setCurrentBudgetID,
                                        allBudgets,
                                        currentMonth,
                                        setCurrentMonth,
                                        fetchBudgets
                                    }: Props) {

    const [modalTitle, setModalTitle] = useState('')
    const [initialModalValue, setInitialModalValue] = useState(0)
    const [categoryEditing, setCategoryEditing] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [mode, setMode] = useState("edit");

    let filteredBudgets = allBudgets
        ? allBudgets.filter(budget => budget.plannedMonth === currentMonth)
        : [];

    const categories = filteredBudgets.length > 0
        ? filteredBudgets[0].categories
        : allBudgets[0]?.categories;

    allBudgets.forEach(budget => {
        console.log('Available plannedMonth:', budget.plannedMonth);
    });

    const handleMonthChange = (e) => {
        setCurrentMonth(e.target.value);
        const currentBudget = allBudgets.find(budget => budget.plannedMonth === e.target.value);
        setCurrentBudgetID(currentBudget.id);
    }

    const handleOpenDialog = (categoryId: string, value: string, title: string, mode: string) => {
        setModalTitle(title);
        setOpenDialog(true);
        setCategoryEditing(categoryId);
        setMode(mode);

        if (mode === 'edit') {
            setInitialModalValue(value);
        } else if (mode === 'delete') {
            setInitialModalValue(null);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveDialog = async (newValue: string, typeValue: string) => {

        const changedCategoryId = categoryEditing;

        try {
            const res = await fetch('/api/updateCategory', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    categoryId: changedCategoryId,
                    typeValue,
                    newValue,
                }),
            });

            if (res.ok) {
                fetchBudgets()
            } else {
                const data = await res.json();
                console.error(data.error);
            }


        } catch (error) {
            console.error('Failed to update amount:', error);
        }

        setOpenDialog(false);
    };

    const handleDeleteCategory = async () => {
        try {
            const res = await fetch('/api/updateCategory', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({categoryId: categoryEditing})
            });

            if (res.ok) {
                fetchBudgets()
            } else {
                const data = await res.json();
                console.error(data.error);
            }
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
        handleCloseDialog()
    };


    return (
        <>
            <Modal
                title={modalTitle}
                mode={mode}  // добавьте режим, если необходимо
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleSaveDialog={handleSaveDialog}
                initialValue={initialModalValue}
                handleDelete={handleDeleteCategory}
            />

            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{whiteSpace: 'nowrap'}}>
                                <Typography variant="p">My categories:</Typography>
                            </TableCell>
                            {filteredBudgets?.map((budget, index) => (
                                <StyledTableCell align="center" colSpan={2} key={index} sx={{whiteSpace: 'nowrap'}}>
                                    <StyledSelect onChange={handleMonthChange} value={currentMonth}>
                                        {allBudgets.map((budget, index) =>
                                            <option key={index}
                                                    value={budget.plannedMonth}
                                            >
                                                {budget.plannedMonth}
                                            </option>)}
                                    </StyledSelect>
                                </StyledTableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" sx={{whiteSpace: 'nowrap'}}></TableCell>
                            {filteredBudgets?.map((_, index) => (
                                <React.Fragment key={index}>
                                    <TableCell
                                        align="center"
                                        sx={{whiteSpace: 'nowrap'}}>Plan</TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{whiteSpace: 'nowrap'}}>Fact</TableCell>
                                </React.Fragment>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories?.map((category, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{whiteSpace: 'nowrap'}}>
                                    <Box>
                                        {category.name}
                                        <ModeIcon
                                            fontSize='small'
                                            onClick={() => handleOpenDialog(category.id, category.name, 'category name', 'edit')}
                                            sx={{
                                                position: "relative",
                                                top: "3px",
                                                left: "3px"
                                            }}
                                            color="primary"/>
                                        <DeleteIcon
                                            fontSize='small'
                                            onClick={() => handleOpenDialog(category.id)}
                                            sx={{
                                                position: "relative",
                                                top: "3px",
                                                left: "3px",
                                                color: "rgba(255, 0, 0, 0.5)"
                                            }}
                                        />
                                    </Box>
                                </TableCell>
                                {filteredBudgets.map((budget) => {
                                    const matchingCategory = budget.categories.find(cat => cat.name === category.name);

                                    return (
                                        <React.Fragment key={budget.id}>
                                            <TableCell align="center" sx={{whiteSpace: 'nowrap'}}>
                                                {matchingCategory ? matchingCategory.plannedAmount : '-'}
                                                <ModeIcon fontSize='small'
                                                          onClick={() => handleOpenDialog(matchingCategory.id, matchingCategory.plannedAmount, 'planned amount', 'edit')}
                                                          sx={{
                                                              position: "relative",
                                                              top: "3px",
                                                              left: "3px"
                                                          }}
                                                          color="primary"
                                                />
                                            </TableCell>
                                            <TableCell align="center" sx={{whiteSpace: 'nowrap'}}>
                                                {matchingCategory ? matchingCategory.actualAmount : '-'}
                                                <ModeIcon fontSize='small'
                                                          onClick={() => handleOpenDialog(matchingCategory.id, matchingCategory.actualAmount, 'actual amount', 'edit')}
                                                          sx={{
                                                              position: "relative",
                                                              top: "3px",
                                                              left: "3px"
                                                          }}
                                                          color="primary"
                                                />

                                            </TableCell>
                                        </React.Fragment>
                                    );
                                })}
                            </TableRow>
                        ))}
                        <TableRow>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold', whiteSpace: 'nowrap'}}>Total</TableCell>
                            {filteredBudgets.map((budget) => {
                                const totalPlanned = budget.categories.reduce((acc, cat) => acc + (cat.plannedAmount || 0), 0);
                                const totalActual = budget.categories.reduce((acc, cat) => acc + (cat.actualAmount || 0), 0);

                                return (
                                    <React.Fragment key={budget.id}>
                                        <TableCell align="center" sx={{
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap'
                                        }}>{totalPlanned || ''}</TableCell>
                                        <TableCell align="center" sx={{
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap'
                                        }}>{totalActual || ''}</TableCell>
                                    </React.Fragment>
                                );
                            })}
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}