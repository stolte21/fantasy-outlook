import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import App from './components/App';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#002171'
        }
    }
});

// overriding the table header colors was inconsistent
// so i'm just using the !important designation and being done with it
const GlobalCss = withStyles({
    '@global': {
        '.MuiTableSortLabel-root': {
            '&:hover,&:focus': { color: 'white !important' },
            color: 'white !important'
        },
        '.MuiTableSortLabel-root.MuiTableSortLabel-active': {
            color: 'white !important',
            textDecoration: 'underline !important'
        },
        '.MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon': {
            color: 'white !important'
        }
    }
})(() => null);

ReactDOM.render(
    <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <GlobalCss />
            <App />
        </ThemeProvider>
    </>,
    document.getElementById('root')
);