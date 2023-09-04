'use client';
import React, {useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import BudgetTable from './components/BudgetTable';
import { theme, darkTheme } from './utils/MUItheme';
import LanguageSwitcher from './utils/translate/switcherTranslation'
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from "./components/appBar"

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Greate © '}
      <Link color="inherit" href="https://github.com/RomanHard">
        By Tiazhkorob
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;

}

2// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { t } = useTranslation();

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  }

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <ThemeProvider theme={darkMode ? darkTheme : theme}>
          <Box sx={{ display: 'flex' }}>
              <Container maxWidth={isSmallScreen ? "sm" : "md"} sx={{ mt: 4, mb: 4, height: '100vh' }}>
                  <Grid container spacing={2}>
                      <Grid xs={12} >
                          <AppBar />
                      </Grid>
                      <Grid xs={12} >
                    <Typography variant="h6" align="center">My budgets</Typography>
                      </Grid>
                      <Grid xs={12} >
                          <BudgetTable />
                      </Grid>
                  </Grid>
                  <Copyright sx={{ pt: 4 }} />
              </Container>
          </Box>
      </ThemeProvider>
  );
}
