import { createMuiTheme } from '@material-ui/core';
import darkTheme from './dark';
import lightTheme from './light';

export const THEME_TYPES = {
    dark: darkTheme.type,
    light: lightTheme.type,
};

const getTheme = (type = THEME_TYPES.light) =>
    createMuiTheme({
        palette: type === THEME_TYPES.dark ? darkTheme : lightTheme,
    });

export default getTheme;
