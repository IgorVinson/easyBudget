import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableRow, TableCell, TableContainer, TableHead, Paper} from '@mui/material';

const userId = '64eea06a9e0d0382ad2eb813'

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
        <TableContainer component={Paper} sx={{ display: 'inline-table' }}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}></TableCell>
                        {budgets.map((budget, index) => (
                            <TableCell align="center" colSpan={2} key={index} sx={{ whiteSpace: 'nowrap' }}>{budget.plannedMonth}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}></TableCell>
                        {budgets.map((_, index) => (
                            <React.Fragment key={index}>
                                <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>Planned Amount</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>Actual Amount</TableCell>
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
                </TableBody>
            </Table>
        </TableContainer>
    );

}