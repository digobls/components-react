import React from 'react';

const InputError = ({id, errors}) => {
    return (
        <>
            {errors && errors[id] && <span className="invalid-feedback">{errors[id].message}</span>}
        </>
    );
};

export default InputError;
