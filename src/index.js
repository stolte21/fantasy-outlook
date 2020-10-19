import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import App from './components/App';

const theme = createMuiTheme();

ReactDOM.render(
    <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </>,
    document.getElementById('root')
);