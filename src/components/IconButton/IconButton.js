import React from 'react';
import PropTypes from 'prop-types';
import { IconButton as MUIIconButton, Tooltip } from '@material-ui/core';

const IconButton = ({ children, label, ...otherProps }) => {
    const button = (
        <MUIIconButton aria-label={label} {...otherProps}>
            {children}
        </MUIIconButton>
    );

    if (label) {
        return <Tooltip title={label}>{button}</Tooltip>;
    }

    return button;
};

IconButton.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
    disabled: PropTypes.bool,
    disableFocusRipple: PropTypes.bool,
    disableRipple: PropTypes.bool,
    edge: PropTypes.oneOf(['start', 'end', false]),
    label: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium']),
};

export default IconButton;
