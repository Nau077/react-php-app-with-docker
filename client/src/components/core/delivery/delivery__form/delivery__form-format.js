import React  from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

export default function Delivery__Form_Format(props) {
    const { inputRef, onChange, ...other } = props;
    const weight = props.name;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        name: weight,
                        value: values.value,
                    },
                });
            }}
            isNumericString
        />
    );
}
  
Delivery__Form_Format.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
  