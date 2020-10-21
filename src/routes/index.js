import HomeIcon from '@material-ui/icons/HomeOutlined';
import CompareIcon from '@material-ui/icons/Compare';
import ConverterPage from './ConverterPage';

export default [
    {
        component: ConverterPage,
        exact: true,
        Icon: HomeIcon,
        name: 'converter',
        path: '/',
    },
    {
        component: null,
        exact: true,
        Icon: CompareIcon,
        name: 'videoComparator',
        path: '/video-comparator',
    },
];
