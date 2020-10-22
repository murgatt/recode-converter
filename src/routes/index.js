import HomeIcon from '@material-ui/icons/HomeOutlined';
import CompareIcon from '@material-ui/icons/Compare';
import ConverterPage from './ConverterPage';
import VideoComparisonPage from './VideoComparisonPage';

export default [
    {
        component: ConverterPage,
        exact: true,
        Icon: HomeIcon,
        name: 'converter',
        path: '/',
    },
    {
        component: VideoComparisonPage,
        exact: true,
        Icon: CompareIcon,
        name: 'videoComparator',
        path: '/video-comparator',
    },
];
