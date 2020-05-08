import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    formGroup: {
        '& > *': {
            marginBottom: theme.spacing(),
            marginTop: theme.spacing(),
        },
    },
}));

const FormGroup = ({ children }) => {
    const classes = useStyles();

    return <div className={classes.formGroup}>{children}</div>;
};

FormGroup.propTypes = {
    children: PropTypes.node,
};

FormGroup.defaultProps = {
    children: null,
};

export default FormGroup;
