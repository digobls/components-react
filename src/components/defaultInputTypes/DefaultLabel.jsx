import React from 'react';

const DefaultLabel = React.memo(({id, label, isRequired}) => {
    return (
        <label htmlFor={id} className="default-label-input">
            {label}
            {isRequired && <span className="required-alert">*</span>}
        </label>
    );
});

export default DefaultLabel;
