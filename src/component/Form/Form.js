import { Formik } from 'formik';
import React from 'react';

const Form = ({ className = 'form', children, ...props }) => {
    return (
        <Formik {...props}>
            {() => <div className={className}>{children}</div>}
        </Formik>
    );
};

export default Form;
