'use client';
import React, {useEffect} from 'react';
import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ThemeProvider} from "@mui/system";
import theme from "@/app/utils/MUItheme";
import i18n from './i18n';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {SessionProvider} from "next-auth/react";



export default async function RootLayout({children}: {
    children: React.ReactNode,
    session: any,

}) : React.ReactNode {
    // Ініціалізуємо i18next один раз на всій сторінці
    useEffect(() => {
        i18n.init({
            lng: 'en',
            fallbackLng: 'en',
            debug: true,
            backend: {
                loadPath: '/utils/translate/{{lng}}.json', // Адреса до перекладів
            },
            interpolation: {
                escapeValue: false,
            },
        });
    }, []);
    //

    async function fetchSession() {
        const res = await fetch('/api/session');  // Замените на ваш реальный путь к API
        const data = await res.json();

        return data;
    }

    const session =  fetchSession()

    return (
        <html lang="en">

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <SessionProvider session={session}>
                    <body>{children}</body>
                </SessionProvider>
            </ThemeProvider>
        </LocalizationProvider>
        </html>
    );
}