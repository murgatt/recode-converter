import HomePage from './HomePage';
import ConverterPage from './ConverterPage';

export default [
    {
        component: HomePage,
        exact: true,
        name: 'home',
        path: '/',
    },
    {
        component: ConverterPage,
        name: 'converter',
        path: '/converter',
    },
];
