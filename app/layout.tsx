'use client';
import React, { useEffect  } from 'react';
import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ThemeProvider} from "@mui/system";
import theme from "@/app/utils/MUItheme";
import i18n from './i18n';


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
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

    return (
        <html lang="en">
        <ThemeProvider theme={theme}>
            <body>{children}</body>
        </ThemeProvider>
        </html>
    );
}