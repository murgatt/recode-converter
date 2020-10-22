import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import FileInput from '../components/FileInput';
import Player from '../components/Player';

const VideoComparisonPage = () => {
    const [mainVideoUrl, setMainVideoUrl] = useState('');
    const [secondVideoUrl, setSecondVideoUrl] = useState('');

    const handleFileChange = setVideoUrl => files => {
        const file = files[0];
        const fileUrl = window.URL.createObjectURL(file);
        setVideoUrl(fileUrl);
    };

    return (
        <div>
            <h1>Comparison page</h1>
            <Button component="label">
                Add first video
                <FileInput onChange={handleFileChange(setMainVideoUrl)} />
            </Button>
            <Button component="label">
                Add second video
                <FileInput onChange={handleFileChange(setSecondVideoUrl)} />
            </Button>
            <br />
            <Player src={mainVideoUrl} secondarySrc={secondVideoUrl} />
        </div>
    );
};

export default VideoComparisonPage;
