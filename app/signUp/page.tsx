'use client'
import {ThemeProvider} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {theme} from '../utils/MUItheme'
import {useState} from "react";
import {useRouter} from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/signIn">
                Easy Budget
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function SignUp() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ username?: string, email?: string, password?: string }>({});

    async function sendData(sendingData: object) {
        setLoading(true);  // Start loading

        try {
            const res = await fetch('/api/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sendingData),
                });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to fetch data');
            }

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const validate = (username: string, email: string, password: string) => {
        const newErrors = {};

        if (!username || username.length < 3) {
            newErrors.username = "Username should be at least 3 characters";
        }

        if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            newErrors.email = "Invalid email address";
        }

        if (!password || password.length < 6) {
            newErrors.password = "Password should be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username') as string;
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        if (!validate(username, email, password)) return;

        const sendingData = {
            username: username,
            email: email,
            password: password,
        }

        try {
            await sendData(sendingData);

            // Listen for the end of the route change and then stop the spinner
            const handleRouteChangeComplete = () => {
                setLoading(false);
                router.events?.off('routeChangeComplete', handleRouteChangeComplete);
            };

            router.events?.on('routeChangeComplete', handleRouteChangeComplete);
            router.push('/signIn?registered=true');
        } catch (error) {
            console.error("Error during registration:", error);
            setLoading(false); // stop loading in case of an exception or error
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-username"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="User Name"
                                    autoFocus
                                    error={!!errors.username}
                                    helperText={errors.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                            </Grid>
                        </Grid>
                        {loading && (
                            <Box sx={{display:'flex', justifyContent:'center', mt: 2, mb: 2, width:'100%'}}>
                                <CircularProgress/>
                            </Box>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>

                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 2}}/>
            </Container>
        </ThemeProvider>
    );
}