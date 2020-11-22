/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Slider, makeStyles } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseIcon from '@material-ui/icons/Pause';
import IconButton from '../IconButton';

const useStyles = makeStyles(theme => ({
    controls: {
        alignItems: 'center',
        bottom: 0,
        display: 'flex',
        padding: theme.spacing(2),
        position: 'absolute',
        width: '100%',
        zIndex: 2,
    },
    player: {
        position: 'relative',
        width: '100%',
    },
    video: {
        height: '100%',
        width: '100%',
    },
    videoSlider: {
        zIndex: 1,
    },
    videoWrapper: {
        bottom: 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        width: '100%',
    },
}));

const Player = ({ src, secondarySrc }) => {
    const classes = useStyles();
    const playerRef = useRef(null);
    const mainVideoRef = useRef(null);
    const secondaryVideoRef = useRef(null);
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);

    const play = () => {
        if (mainVideoRef.current) {
            mainVideoRef.current.play();
        }
        if (secondaryVideoRef.current) {
            secondaryVideoRef.current.play();
        }
    };

    const pause = () => {
        if (mainVideoRef.current) {
            mainVideoRef.current.pause();
        }
        if (secondaryVideoRef.current) {
            secondaryVideoRef.current.pause();
        }
    };

    const seek = useCallback(newProgress => {
        const currentTime = (newProgress / 100) * (mainVideoRef.current.duration || 0);
        if (mainVideoRef.current) {
            mainVideoRef.current.currentTime = currentTime;
        }
        if (secondaryVideoRef.current) {
            secondaryVideoRef.current.currentTime = currentTime;
        }
    }, []);

    useEffect(() => {
        setProgress(0);
        seek(0);
    }, [seek, src, secondarySrc]);

    const handleMouseMove = useCallback(
        event => {
            if (playerRef.current && src && secondarySrc) {
                const { left, right } = playerRef.current.getBoundingClientRect();
                const { pageX } = event;
                const position = (100 * (pageX - left)) / (right - left);
                setSliderPosition(position);
            }
        },
        [src, secondarySrc],
    );

    const handlePlayPauseButtonClick = useCallback(() => {
        const willPlay = !isPlaying;
        setIsPlaying(willPlay);
        if (willPlay) {
            play();
        } else {
            pause();
        }
    }, [isPlaying]);

    const handleProgressChange = useCallback(
        (event, newValue) => {
            setProgress(newValue);
            seek(newValue);
        },
        [seek],
    );

    const handleTimeUpdate = useCallback(() => {
        const newProgress = Math.floor((100 / mainVideoRef.current.duration) * mainVideoRef.current.currentTime);
        setProgress(newProgress);
    }, []);

    let sliderStyle = null;
    let videoStyle = null;

    if (src && secondarySrc) {
        sliderStyle = { width: `${sliderPosition}%` };
        videoStyle = { width: `calc((100% / ${sliderPosition}) * 100)` };
    }

    const videoHeight = mainVideoRef.current ? mainVideoRef.current.videoHeight : 0;
    const videoWidth = mainVideoRef.current ? mainVideoRef.current.videoWidth : 0;
    const playerWidth = playerRef.current ? playerRef.current.offsetWidth : 0;
    const playerHeight = videoWidth > playerWidth ? videoHeight / (videoWidth / playerWidth) : videoHeight;

    return (
        <div className={classes.player} ref={playerRef} onMouseMove={handleMouseMove} style={{ height: playerHeight }}>
            {src && (
                <div className={classNames(classes.videoWrapper, classes.videoSlider)} style={sliderStyle}>
                    <video
                        className={classes.video}
                        loop
                        autoPlay
                        muted
                        src={src}
                        style={videoStyle}
                        ref={mainVideoRef}
                        onTimeUpdate={handleTimeUpdate}
                    />
                </div>
            )}
            {secondarySrc && (
                <div className={classes.videoWrapper}>
                    <video className={classes.video} loop muted autoPlay src={secondarySrc} ref={secondaryVideoRef} />
                </div>
            )}
            <div className={classes.controls}>
                <IconButton onClick={handlePlayPauseButtonClick}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</IconButton>
                <Slider onChange={handleProgressChange} value={progress} />
            </div>
        </div>
    );
};

Player.propTypes = {
    secondarySrc: PropTypes.string,
    src: PropTypes.string,
};

Player.defaultProps = {
    secondarySrc: '',
    src: '',
};

export default Player;
