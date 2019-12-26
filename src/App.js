import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Router from './Router';
import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <Router />
            </div>
        </ThemeProvider>
    );
}

export default App;
