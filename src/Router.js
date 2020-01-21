import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';

export default () => (
    <Router>
        <Switch>
            {routes.map(route => (
                <Route component={route.component} exact={!!route.exact} key={route.name} path={route.path} />
            ))}
        </Switch>
    </Router>
);
