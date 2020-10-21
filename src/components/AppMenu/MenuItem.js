import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, makeStyles, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
        '& + &': {
            marginTop: theme.spacing(),
        },
        minWidth: 'initial',
    },
}));

const MenuItem = ({ exact, Icon, name, path }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const match = useRouteMatch({
        exact,
        path,
    });

    const label = t(name);

    return (
        <Tooltip key={label} title={label}>
            <Button
                aria-label={label}
                className={classes.button}
                color={match ? 'primary' : 'default'}
                component={Link}
                to={path}
            >
                <Icon />
            </Button>
        </Tooltip>
    );
};

MenuItem.propTypes = {
    exact: PropTypes.bool,
    Icon: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

MenuItem.defaultProps = {
    exact: false,
};

export default MenuItem;
