import React from 'react';

const ErrorMessage = ({id, errors}) => {
    return (
        <>
            {errors && errors[id] && <span className="invalid-feedback">{errors[id].message}</span>}
        </>
    );
};

export default ErrorMessage;
