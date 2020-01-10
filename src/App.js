import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Router from './Router';
import store from './store';
import theme from './theme';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="App">
                    <Router />
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
