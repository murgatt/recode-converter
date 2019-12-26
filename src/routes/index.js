import Home from './Home';
import Converter from './Converter';

export default [
    {
        component: Home,
        exact: true,
        name: 'home',
        path: '/',
    },
    {
        component: Converter,
        name: 'converter',
        path: '/converter',
    },
];
