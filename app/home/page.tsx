'use client'
import React, {useEffect, useState} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import BudgetTable from '../components/BudgetTable';
import {theme} from '../utils/MUItheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from "../components/appBar"
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import AddCategoryDialog from "@/app/components/AddCategoryDialog";
import {log} from "util";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Greate © '}
            <Link color="inherit" href="/home">
                By Vinson
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function Dashboard() {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const { data: session, status } = useSession(); // Использование хука

    const session1 = useSession()
    console.log('Session 1', session1)
    const userId = "64eea06a9e0d0382ad2eb813"

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allBudgets, setAllBudgets] = useState([]);
    const [currentMonth, setCurrentMonth] = useState("");

    const [open, setOpen] = useState(false);
    const [currenBudgetID, setCurrentBudgetID] = useState('')

    async function fetchBudgets() {
        if (!userId) return; // Проверка на наличие userID
        const res = await fetch(`/api/getBudgets?userId=${userId}`);
        const data = await res.json();
        console.log('data',data)
        setAllBudgets(data)

        if (res.status !== 200) {
            throw new Error(data.error);
        }

        return data;
    }

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

                    setCurrentBudgetID(currentBudget ? currentBudget.id : res[0]?.id);

                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });

    }, []);

    useEffect(() => {

        // Если нет сессии, перенаправляем на страницу входа
        if (status === "unauthenticated") {
            router.push('/');
        }
    }, []);

    if (status === "loading" || undefined) return <div>Loading...</div>;

    const addCategory = () => {

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddCategory = async (categoryName: string, categoryAmount: number) => {

        const newCategory = {
            name: categoryName,
            plannedAmount: categoryAmount,
            budgetId: currenBudgetID // замените это на реальный budgetId
        };

        try {
            const res = await fetch('/api/createCategory', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newCategory),
            });

            if (res.ok) {
                fetchBudgets()
            } else {
                const data = await res.json();
                console.error(data.error);
            }

        } catch (error) {
                console.error('Failed to create category:', error);
        }

        handleClose();
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex'}}>
                <Container maxWidth={isSmallScreen ? "sm" : "md"} sx={{mt: 4, mb: 4, height: '100vh'}}>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <AppBar/>
                        </Grid>
                        <Grid xs={12}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Typography variant="h6" align="center" sx={{flexGrow: 4}}>My budgets</Typography>
                                <Button
                                    onClick={() => handleClickOpen()}
                                    variant="contained"
                                    color="primary"
                                    sx={{mr: 1}}
                                >
                                    Add category
                                </Button>
                                <AddCategoryDialog open={open} handleClose={handleClose}
                                                   handleAddCategory={handleAddCategory}/>
                                <Button
                                    onClick={() => router.push('/addBudget')}
                                    variant="contained"
                                    color="secondary">
                                    Add budget
                                </Button>
                            </Box>
                        </Grid>
                        <Grid xs={12}>
                            <BudgetTable
                                setCurrentBudgetID={setCurrentBudgetID}
                                allBudgets={allBudgets}
                                currentMonth={currentMonth}
                                setCurrentMonth={setCurrentMonth}
                                userId={userId}
                                fetchBudgets={fetchBudgets}
                            />
                        </Grid>
                    </Grid>
                    <Copyright sx={{pt: 4}}/>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
