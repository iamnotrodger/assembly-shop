import React from 'react';

const LoginButton = ({ login }) => {
    const { img, href, alt, color, txt, name } = login;

    //Stores the current location on and redirects to href
    const storeAndRedirect = (event) => {
        event.preventDefault();
        const { pathname } = window.location;
        window.localStorage.setItem('redirectUrl', pathname);
        window.location.assign(href);
    };

    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
            href=''
            onClick={storeAndRedirect}
            className='btn login-btn'
            style={{ backgroundColor: color, margin: 5, display: 'block' }}
            title={txt}>
            <img src={img} alt={alt} className='btn-icon' />
            <span className='btn-txt'>{name.toUpperCase()} LOGIN</span>
        </a>
    );
};

export default LoginButton;
