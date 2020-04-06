import React from 'react';
import { Provider } from 'react-redux';
import classNames from 'classnames';
import { CssBaseline, ThemeProvider, makeStyles } from '@material-ui/core';
import Router from './Router';
import store from './store';
import theme from './theme';
import './registerElectronEvents';
import Snackbar from './components/Snackbar';

const useStyles = makeStyles({
    root: {
        height: '100vh',
    },
});

function App() {
    const classes = useStyles();
    const className = classNames('App', classes.root);

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={className}>
                    <Router />
                </div>
                <Snackbar />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
