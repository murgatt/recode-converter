import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Router from './Router';
import store from './store';
import theme from './theme';

// const electron = window.require('electron');
// const ipcRenderer = electron.ipcRenderer;

function App() {
    const handleElectronTest = () => {
        // const reponse = ipcRenderer.sendSync('test', 'This is a test');
    };

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <button onClick={handleElectronTest} type="button">
                    FFMPEG Test
                </button>
                <CssBaseline />
                <div className="App">
                    <Router />
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
