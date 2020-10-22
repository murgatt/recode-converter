import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import routes from './routes';
import AppMenu from './components/AppMenu';

const useStyles = makeStyles({
    main: {
        flexGrow: 1,
    },
});

export default () => {
    const classes = useStyles();

    return (
        <Router>
            <AppMenu />
            <main className={classes.main}>
                <Switch>
                    {routes.map(route => (
                        <Route component={route.component} exact={!!route.exact} key={route.name} path={route.path} />
                    ))}
                </Switch>
            </main>
        </Router>
    );
};
