import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, makeStyles } from '@material-ui/core';
import FileInput from '../components/FileInput';
import Player from '../components/Player';

const useStyles = makeStyles(theme => ({
    button: {
        display: 'block',
        margin: theme.spacing(2, 1),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-around',
        textAlign: 'center',
        width: '100%',
    },
    comparator: props => ({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: props.isPlayerDisplayed ? 'start' : 'center',
    }),
}));

const VideoComparisonPage = () => {
    const [mainVideo, setMainVideo] = useState(null);
    const [secondVideo, setSecondVideo] = useState(null);
    const mainVideoUrl = mainVideo ? window.URL.createObjectURL(mainVideo) : '';
    const secondVideoUrl = secondVideo ? window.URL.createObjectURL(secondVideo) : '';
    const isPlayerDisplayed = mainVideoUrl && secondVideoUrl;
    const classes = useStyles({ isPlayerDisplayed });
    const { t } = useTranslation();

    const handleFileChange = setVideo => files => {
        const file = files[0];
        setVideo(file);
    };

    return (
        <div className={classes.comparator}>
            {isPlayerDisplayed && <Player src={mainVideoUrl} secondarySrc={secondVideoUrl} />}
            <div className={classes.buttons}>
                <div>
                    <Button className={classes.button} component="label" color="primary" variant="outlined">
                        {mainVideoUrl ? t('videoComparison.changeFirstVideo') : t('videoComparison.addFirstVideo')}
                        <FileInput onChange={handleFileChange(setMainVideo)} />
                    </Button>
                    {mainVideo && mainVideo.name}
                </div>
                <div>
                    <Button className={classes.button} component="label" color="primary" variant="outlined">
                        {secondVideoUrl ? t('videoComparison.changeSecondVideo') : t('videoComparison.addSecondVideo')}
                        <FileInput onChange={handleFileChange(setSecondVideo)} />
                    </Button>
                    {secondVideo && secondVideo.name}
                </div>
            </div>
        </div>
    );
};

export default VideoComparisonPage;
