//TODO: get the URI of the API using .env
const API_URL = process.env.REACT_APP_API_URL;
const LoginData = [
    {
        img: '',
        name: 'google',
        href: `${API_URL}/auth/google`,
        alt: 'google-icon',
        color: '#CB4024',
        txt: 'Login with Google',
    },
    {
        img: '',
        name: 'facebook',
        href: `${API_URL}/auth/facebook`,
        alt: 'facebook-icon',
        color: '#3B5899',
        txt: 'Login with Facebook',
    },
    // {
    //     img: '',
    //     name: 'instagram',
    //     href: `${API_URL}/auth/instagram`,
    //     alt: 'instagram-icon',
    //     colors: {
    //         leftBot: '#fec564',
    //         leftTop: '#5258cf',
    //         rightTop: '#893dc2',
    //         rightBot: '#d9317a',
    //         baseCoat:
    //             'linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)',
    //     },
    //     color: '#d9317a',
    //     txt: 'Login with Instagram',
    // },
];

export default LoginData;
