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
import {useRouter} from 'next/navigation';
import {signIn} from "next-auth/react";
import {useEffect, useState} from "react";
import {useSearchParams} from 'next/navigation'
import CircularProgress from "@mui/material/CircularProgress";

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

export default function SignIn() {

    const searchParams = useSearchParams()
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [authAllowed, setAuthAllowed] = useState(true);
    const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
    const [showRegisteredMessage, setShowRegisteredMessage] = useState(false);

    useEffect(() => {
        if (searchParams.get('registered')) {
            setShowRegisteredMessage(true);
        }
    }, []);

    const validate = (email: string, password: string) => {
        const newErrors = {};

        // Basic email validation (could be improved further)
        if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            newErrors.email = "Invalid email address";
        }

        // Basic password validation (could be improved further)
        if (!password || password.length < 6) {
            newErrors.password = "Password should be at least 6 characters";
        }

        setErrors(newErrors);

        // Returns true if no errors were found
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        if (!validate(email, password)) return;

        setLoading(true)

        try {
            signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
            }).then((result) => {
                setLoading(false)
                if (result.error) {
                    console.error("Authentication failed:", result);
                    setAuthAllowed(false);
                } else {
                    const handleRouteChangeComplete = () => {
                        setLoading(false);
                        router.events?.off('routeChangeComplete', handleRouteChangeComplete);
                    };

                    router.events?.on('routeChangeComplete', handleRouteChangeComplete);
                    router.push('/saveBudget');
                }
            });

        } catch (error) {
            setLoading(false);
            console.error("Error during authentication:", error);
        }
    };

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
                        Sign in
                    </Typography>
                    {!authAllowed && (
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                padding: 2,
                                marginBottom: 1,
                                borderRadius: 1,
                                border: '1px solid #e0e0e0',
                                marginTop: 2
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="error"  // This will give it a red color, indicating an error
                                align="center"
                            >
                                Authentication not allowed. Please try again.
                            </Typography>
                        </Box>
                    )}
                    {showRegisteredMessage && authAllowed && (
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                padding: 2,
                                marginBottom: 1,
                                borderRadius: 1,
                                border: '1px solid #e0e0e0',
                                marginTop: 2
                            }}
                        >
                            <Typography
                                variant="body1"
                                align="center"
                                gutterBottom
                                color="secondary.contrastText2"
                            >
                                Thank you for registering! However, you can log in right now!
                            </Typography>
                        </Box>
                    )}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                        {/*    label="Remember me"*/}
                        {/*/>*/}
                        {loading && (
                            <Box sx={{display: 'flex', justifyContent: 'center', mt: 2, mb: 2, width: '100%'}}>
                                <CircularProgress/>
                            </Box>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent={"center"}>
                            <Grid item>
                                <Link href="/signUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
                <Copyright sx={{mt: 2, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}