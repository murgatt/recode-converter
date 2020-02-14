import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MUISelect } from '@material-ui/core';

const renderSelectItem = (option, native) => {
    const { label, value } = option;
    if (native) {
        return (
            <option {...option} key={value} value={value}>
                {label}
            </option>
        );
    }

    return (
        <MenuItem {...option} key={value} value={value}>
            {label}
        </MenuItem>
    );
};

const Select = props => {
    const {
        autoWidth,
        children,
        color,
        disabled,
        displayEmpty,
        error,
        fullWidth,
        helperText,
        label,
        margin,
        multiple,
        native,
        onChange,
        options,
        placeholder,
        placeholderDisabled,
        renderValue,
        required,
        value,
        variant,
    } = props;

    const [labelWidth, setLabelWidth] = useState(0);
    const shrinkLabel = useMemo(() => value || (placeholder && displayEmpty), [value, placeholder, displayEmpty]);

    const inputLabelRef = useRef(null);
    useEffect(() => {
        setLabelWidth(inputLabelRef.current.offsetWidth);
    }, [inputLabelRef]);

    const renderPlaceholder = useMemo(() => {
        if (!placeholder) {
            return null;
        }

        if (native) {
            return (
                <option disabled={placeholderDisabled} value="">
                    {placeholder}
                </option>
            );
        }

        return (
            <MenuItem disabled={placeholderDisabled} value="">
                {placeholder}
            </MenuItem>
        );
    }, [native, placeholder, placeholderDisabled]);

    const handleChange = useCallback(event => onChange(event.target.value, event), []);

    return (
        <FormControl
            color={color}
            disabled={disabled}
            error={error}
            fullWidth={fullWidth}
            margin={margin}
            required={required}
            variant={variant}
        >
            <InputLabel shrink={shrinkLabel} ref={inputLabelRef}>
                {label}
            </InputLabel>
            <MUISelect
                autoWidth={autoWidth}
                displayEmpty={displayEmpty}
                labelWidth={labelWidth}
                multiple={multiple}
                native={native}
                onChange={handleChange}
                renderValue={renderValue}
                value={value}
            >
                {renderPlaceholder}
                {children || options.map(option => renderSelectItem(option, native))}
            </MUISelect>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};

Select.propTypes = {
    autoWidth: PropTypes.bool,
    children: PropTypes.node,
    color: PropTypes.oneOf(['primary', 'secondary']),
    disabled: PropTypes.bool,
    displayEmpty: PropTypes.bool,
    error: PropTypes.bool,
    fullWidth: PropTypes.bool,
    helperText: PropTypes.node,
    label: PropTypes.node,
    margin: PropTypes.oneOf(['none', 'dense', 'normal']),
    multiple: PropTypes.bool,
    native: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.node.isRequired,
            value: PropTypes.string.isRequired,
        }),
    ),
    placeholder: PropTypes.node,
    placeholderDisabled: PropTypes.bool,
    renderValue: PropTypes.func,
    required: PropTypes.bool,
    value: PropTypes.any,
    variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

Select.defaultProps = {
    autoWidth: false,
    children: undefined,
    color: 'primary',
    disabled: false,
    displayEmpty: false,
    error: false,
    fullWidth: false,
    helperText: '',
    label: '',
    margin: 'none',
    multiple: false,
    native: false,
    onChange: () => {},
    options: [],
    placeholder: '',
    placeholderDisabled: false,
    renderValue: undefined,
    required: false,
    value: '',
    variant: 'standard',
};

export default Select;
