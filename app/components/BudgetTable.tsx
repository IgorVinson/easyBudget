import React, {useEffect, useRef, useState} from 'react';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    Paper,
    OutlinedInput,
    Button,
    Box
} from '@mui/material';
import {tableCellClasses} from '@mui/material/TableCell';
import {styled} from '@mui/material/styles';
import ModeIcon from '@mui/icons-material/Mode';


const userId = '64eea06a9e0d0382ad2eb813'

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


async function fetchBudgets() {
    const res = await fetch(`/api/getBudgets?userId=${userId}`);
    const data = await res.json();

    if (res.status !== 200) {
        throw new Error(data.error);
    }

    return data;
}


export default function BudgetTable() {

    const inputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [allBudgets, setAllBudgets] = useState([]);
    const [currentMonth, setCurrentMonth] = useState("");
    const [categoryEditing, setCategoryEditing] = useState(null);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        setLoading(true);
        fetchBudgets()
            .then(res => {
                setAllBudgets(res);
                setLoading(false);

                // Получаем текущий месяц и год
                const now = new Date();
                const currentMonthString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

                // Ищем бюджет для текущего месяца
                const currentBudget = res.find(budget => budget.plannedMonth === currentMonthString);

                // Устанавливаем текущий месяц, если он есть в данных. Если нет - первый из списка
                setCurrentMonth(currentBudget ? currentBudget.plannedMonth : res[0]?.plannedMonth);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const filteredBudgets = allBudgets.filter(budget => budget.plannedMonth === currentMonth);
    const sortedCategories = filteredBudgets[0]?.categories.sort((a, b) => {
        return b.plannedAmount - a.plannedAmount;  // Для убывающей сортировки
    });

    const handleMonthChange = (e) => {
        setCurrentMonth(e.target.value);
    }

    const handleEditClick = (categoryId) => {
        setCategoryEditing(categoryId);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleSaveClick = async (categoryId, newName) => {
        try {
            const res = await fetch('/api/updateCategory', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    categoryId,
                    newName,
                })
            });

            if (res.ok) {
                const updatedBudgets = await fetchBudgets();
                setAllBudgets(updatedBudgets);
            } else {
                const data = await res.json();
                console.error(data.error);
            }

        } catch (error) {
            console.error('Failed to update category:', error);
        }

        setCategoryEditing(null);
        setNewName('')
    };


    const handleInputChange = (e) => {
        setNewName(e.target.value);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{whiteSpace: 'nowrap'}}></TableCell>
                            {filteredBudgets.map((budget, index) => (
                                <StyledTableCell align="center" colSpan={2} key={index} sx={{whiteSpace: 'nowrap'}}>
                                    <StyledSelect onChange={handleMonthChange} value={currentMonth}>
                                        {allBudgets.map((budget, index) => <option key={index}
                                                                                   value={budget.plannedMonth}>{budget.plannedMonth}</option>)}
                                    </StyledSelect>
                                </StyledTableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" sx={{whiteSpace: 'nowrap'}}></TableCell>
                            {filteredBudgets.map((_, index) => (
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
                        {sortedCategories.map((category, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{whiteSpace: 'nowrap'}}>
                                    {categoryEditing === category.id ? (
                                        <>
                                            <OutlinedInput
                                                defaultValue={category.name}
                                                onChange={handleInputChange}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleSaveClick(category.id, newName);
                                                    }
                                                }}
                                                size="small"
                                                inputRef={inputRef}
                                            />
                                            <Button
                                                color="secondary"
                                                onClick={() => handleSaveClick(category.id, newName)}>Save</Button>
                                        </>
                                    ) : (
                                        <Box>
                                            {category.name}
                                            <ModeIcon
                                                sx={{
                                                    position:"relative",
                                                    top: "3px",
                                                    left:"3px"
                                                }}
                                                fontSize='small'
                                                onClick={() => handleEditClick(category.id)}/>
                                        </Box>
                                    )}
                                </TableCell>
                                {filteredBudgets.map((budget) => {
                                    const matchingCategory = budget.categories.find(cat => cat.name === category.name);
                                    return (
                                        <React.Fragment key={budget.id}>
                                            <TableCell align="center"
                                                       sx={{whiteSpace: 'nowrap'}}>{matchingCategory ? matchingCategory.plannedAmount : '-'}</TableCell>
                                            <TableCell align="center"
                                                       sx={{whiteSpace: 'nowrap'}}>{matchingCategory ? matchingCategory.actualAmount : '-'}</TableCell>
                                        </React.Fragment>
                                    );
                                })}
                            </TableRow>
                        ))}
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