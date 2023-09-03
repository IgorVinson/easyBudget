import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableRow, TableCell, TableContainer, TableHead, Paper} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const userId = '64eea06a9e0d0382ad2eb813'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.contrastText2,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

async function fetchBudgets() {
    const res = await fetch(`/api/getBudgets?userId=${userId}`);
    const data = await res.json();

    if (res.status !== 200) {
        throw new Error(data.error);
    }

    return data;
}


export default function BudgetTable() {

    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchBudgets()
            .then(res => {
                setBudgets(res);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    console.log(budgets)


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <TableContainer component={Paper} >
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}></TableCell>
                        {budgets.map((budget, index) => (
                            <StyledTableCell align="center" colSpan={2} key={index} sx={{ whiteSpace: 'nowrap' }}>{budget.plannedMonth}</StyledTableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}></TableCell>
                        {budgets.map((_, index) => (
                            <React.Fragment key={index}>
                                <TableCell
                                    align="center"
                                    sx={{ whiteSpace: 'nowrap' }}>Plan</TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ whiteSpace: 'nowrap' }}>Fact</TableCell>
                            </React.Fragment>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {budgets.length > 0 && budgets[0].categories.map((category, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ whiteSpace: 'nowrap' }}>{category.name}</TableCell>
                            {budgets.map((budget) => {
                                const matchingCategory = budget.categories.find(cat => cat.name === category.name);
                                return (
                                    <React.Fragment key={budget.id}>
                                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>{matchingCategory ? matchingCategory.plannedAmount : '-'}</TableCell>
                                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>{matchingCategory ? matchingCategory.actualAmount : '-'}</TableCell>
                                    </React.Fragment>
                                );
                            })}
                        </TableRow>
                    ))}
                    <TableRow >
                        <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Total</TableCell>

                        {budgets.map((budget) => {
                            const totalPlanned = budget.categories.reduce((acc, cat) => acc + (cat.plannedAmount || 0), 0);
                            const totalActual = budget.categories.reduce((acc, cat) => acc + (cat.actualAmount || 0), 0);

                            return (
                                <React.Fragment key={budget.id}>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>{totalPlanned || ''}</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>{totalActual || ''}</TableCell>
                                </React.Fragment>
                            );
                        })}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );

}