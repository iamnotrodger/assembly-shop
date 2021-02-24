const API_URL = process.env.REACT_APP_API_URL;

const LoginData = [
    {
        logo: '',
        name: 'google',
        href: `${API_URL}/api/auth/google`,
    },
    {
        logo: '',
        name: 'facebook',
        href: `${API_URL}/api/auth/facebook`,
    },
];

export default LoginData;
