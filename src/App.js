import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import classNames from 'classnames';
import { CssBaseline, ThemeProvider, makeStyles, useMediaQuery } from '@material-ui/core';
import Router from './Router';
import store from './store';
import getTheme, { THEME_TYPES } from './theme';
import './registerElectronEvents';
import Snackbar from './components/Snackbar';
import FfmpegAlert from './components/FfmpegAlert';
import VersionAlert from './components/VersionAlert';
import FeatureFlipContext, { useFeatureFlip } from './featureFlipContext';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
    },
});

function App() {
    const classes = useStyles();
    const className = classNames('App', classes.root);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const themeType = prefersDarkMode ? THEME_TYPES.dark : THEME_TYPES.light;
    const theme = useMemo(() => getTheme(themeType), [themeType]);

    const [featureFlip, setFeatureFlip] = useFeatureFlip();
    window.setFeatureFlip = setFeatureFlip;

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <FeatureFlipContext.Provider value={featureFlip}>
                    <CssBaseline />
                    <div className={className}>
                        <Router />
                    </div>
                    <FfmpegAlert />
                    <VersionAlert />
                    <Snackbar />
                </FeatureFlipContext.Provider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
