'use client'
import React, {useEffect, useState} from 'react';
import {
    ThemeProvider,
    Box,
    Container,
    CssBaseline,
    TextField,
    Button,
    Grid,
    Typography,
    FormControl,
    InputAdornment,
    OutlinedInput,
    IconButton,
    Avatar,
    InputLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import {theme} from '../utils/MUItheme';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import {useRouter} from 'next/navigation';
import {useSession} from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";

export default function AddBudget() {

    const router = useRouter();
    const { status } = useSession();

    const [isLoading] = useState(false);
    const [plannedMonth, setPlannedMonth] = useState(dayjs());
    const [fields, setFields] = useState([
        {categoryName: 'Rent', plannedAmount: 0},
        {categoryName: 'Utilities', plannedAmount: 0},
        {categoryName: 'Groceries', plannedAmount: 0},
        {categoryName: 'Car', plannedAmount: 0}
    ]);

    const [budget, setBudget] = useState({
        plannedMonth: '',
        userId: '',
        categories: []

    })

    const handleInputChange = (index, name, value) => {
        const updatedFields = [...fields];
        updatedFields[index][name] = value;
        setFields(updatedFields);
    };

    const handleAddField = () => {
        setFields([...fields, {categoryName: '', plannedAmount: 0}]);
    };

    const handleDeleteField = index => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        setBudget({
            plannedMonth: plannedMonth.format('MMM YYYY'),
            userId: '64eea06a9e0d0382ad2eb813', //test user
            categories: fields
        })

        const res = await fetch('/api/saveBudget', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                plannedMonth: plannedMonth.format('MMM YYYY'),
                userId: '64eea06a9e0d0382ad2eb813',
                categories: fields
            })
        });

        if (!res.ok) {
            const data = await res.json();
            console.error(data.error);
        } else router.push('/')

    };


    useEffect(() => {

        // Если нет сессии, перенаправляем на страницу входа
        if (status === "unauthenticated") {
            router.push('/');
        }
    }, [status]);

    if (status === "loading" || undefined) return <div>Loading...</div>;


    return (

        <ThemeProvider theme={theme}>
            {isLoading ? (<Box sx={{display: 'flex', justifyContent: 'center', mt: 2, mb: 2, width: '100%'}}>
                <CircularProgress/>
            </Box>) : (

                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <PointOfSaleIcon/>
                        </Avatar>
                        <Typography component="h5" variant="h5">
                            Enter budgeting month
                        </Typography>
                        <DatePicker
                            views={['month', 'year']}
                            sx={{mt: 1}}
                            value={plannedMonth}
                            onChange={(newValue) => setPlannedMonth(newValue)}
                        />
                        <Typography component="h3" variant="h5" sx={{mt: 4}}>
                            Enter budgets category
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                {fields.map((field, index) => (
                                    <React.Fragment key={index}>
                                        <Grid item xs={8}>
                                            <TextField
                                                name="categoryName"
                                                value={field.categoryName ? field.categoryName : null}
                                                onChange={e => handleInputChange(index, e.target.name, e.target.value)}
                                                fullWidth
                                                placeholder="Category Name"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor={`amount-${index}`}>Amount</InputLabel>
                                                <OutlinedInput
                                                    id={`amount-${index}`}
                                                    name="plannedAmount"
                                                    onChange={e => handleInputChange(index, e.target.name, e.target.value)}
                                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                    label="Amount"
                                                    placeholder="0.00"
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <IconButton onClick={() => handleDeleteField(index)} color="error">
                                                <DeleteIcon color="secondary"/>
                                            </IconButton>
                                        </Grid>
                                    </React.Fragment>
                                ))}
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Button variant="contained" onClick={handleAddField}>
                                            add categoty
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" fullWidth variant="contained" color="secondary">
                                        create budget
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            )}

        </ThemeProvider>
    );
}
