const LoginData = [
    {
        icon: 'public',
        name: 'google',
        href: `${process.env.REACT_APP_API_URL}/api/auth/google`,
    },
    {
        icon: 'facebook',
        name: 'facebook',
        href: `${process.env.REACT_APP_API_URL}/api/auth/facebook`,
    },
];

export default LoginData;
