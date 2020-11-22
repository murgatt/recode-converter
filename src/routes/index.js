import HomeIcon from '@material-ui/icons/HomeOutlined';
import CompareIcon from '@material-ui/icons/Compare';
import ConverterPage from './ConverterPage';
import VideoComparisonPage from './VideoComparisonPage';

export default [
    {
        component: ConverterPage,
        exact: true,
        Icon: HomeIcon,
        name: 'routes.converter',
        path: '/',
    },
    {
        component: VideoComparisonPage,
        exact: true,
        featureFlip: 'videoComparison',
        Icon: CompareIcon,
        name: 'routes.videoComparison',
        path: '/video-comparison',
    },
];
