'use client'
import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "rgb(237, 237, 237)",
        },
        secondary: {
            main: "rgb(10, 10, 10)",
            contrastText: "#ffffff",
            contrastText2: "#2792a6",
        },

    },
    components: {
        MuiLink: {
            defaultProps: {
                color: "rgb(10, 10, 10)",
            },
        },
    },
});


export const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#303030", // Ваш колір для primary у темній темі
        },
        secondary: {
            main: "#ffffff", // Ваш колір для secondary у темній темі
        },
        mode: "dark",
    },
    components: {
        MuiLink: {
            defaultProps: {
                color: "#ffffff", // Ваш колір по замовчуванню для посилань у темній темі
            },
        },
    },
});

export default { theme, darkTheme };