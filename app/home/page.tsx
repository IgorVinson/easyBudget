'use client'
import React, {useEffect} from 'react';
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
    const { data: session, status } = useSession();

    const router = useRouter();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(() => {

        // Если нет сессии, перенаправляем на страницу входа
        if (status === "unauthenticated") {
            router.push('/');
        }
    }, [status]);

    if (status === "loading" || undefined) return <div>Loading...</div>;


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
                                    onClick={() => router.push('/addBudget')}
                                    variant="contained"
                                    color="secondary">
                                    Add budget
                                </Button>
                            </Box>
                        </Grid>
                        <Grid xs={12}>
                            <BudgetTable/>
                        </Grid>
                    </Grid>
                    <Copyright sx={{pt: 4}}/>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
