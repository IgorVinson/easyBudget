'use client'
import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "rgb(237, 237, 237)",
        },
        secondary: {
            main: "rgb(10, 10, 10)"
        }
    },
    components: {
        MuiLink: {
            defaultProps: {
                color: "rgb(10, 10, 10)",
            },
        },
    },
});

export default theme;