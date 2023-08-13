'use client'
import React, {useState} from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import {theme} from '../utils/MUItheme';


async function getData() {
    const res = await fetch('/api/test')
    const data = await res.json(); // read response data regardless of status
    if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch data');
    }
    return data;
}


export default function AddBudget() {
    const users = getData().then(data => {
            console.log(data);
        }
    );

    const [fields, setFields] = useState([
        {category: 'Rent', amount: ''},
        {category: 'Utilities', amount: ''},
        {category: 'Groceries', amount: ''},
        {category: 'Car', amount: ''}
    ]);

    const handleInputChange = (index, name, value) => {
        const updatedFields = [...fields];
        updatedFields[index][name] = value;
        setFields(updatedFields);
    };

    const handleAddField = () => {
        setFields([...fields, {category: '', amount: ''}]);
    };

    const handleDeleteField = index => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(fields);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <PointOfSaleIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Enter budgets category
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            {fields.map((field, index) => (
                                <React.Fragment key={index}>
                                    <Grid item xs={8}>
                                        <TextField
                                            name="category"
                                            value={field.category}
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
                                                name="amount"
                                                value={field.amount}
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
                                        <AddIcon/>
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant="contained" color="secondary">
                                    Add budgets categories
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
