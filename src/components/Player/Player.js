/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseIcon from '@material-ui/icons/Pause';
import IconButton from '../IconButton';

const useStyles = makeStyles(theme => ({
    controls: {
        bottom: 0,
        padding: theme.spacing(2),
        position: 'absolute',
        width: '100%',
        zIndex: 2,
    },
    player: {
        height: '400px',
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
    const [sliderPosition, setSliderPosition] = useState(50);

    const handleMouseMove = useCallback(
        event => {
            if (playerRef && src && secondarySrc) {
                const { right } = playerRef.current.getBoundingClientRect();
                const { pageX } = event;
                const position = (100 * pageX) / right;
                setSliderPosition(position);
            }
        },
        [src, secondarySrc],
    );

    let sliderStyle = null;
    let videoStyle = null;

    if (src && secondarySrc) {
        sliderStyle = { width: `${sliderPosition}%` };
        videoStyle = { width: `calc((100% / ${sliderPosition}) * 100)` };
    }

    return (
        <div className={classes.player} ref={playerRef} onMouseMove={handleMouseMove}>
            <div className={classNames(classes.videoWrapper, classes.videoSlider)} style={sliderStyle}>
                <video className={classes.video} loop autoPlay src={src} style={videoStyle} />
            </div>
            <div className={classes.videoWrapper}>
                <video className={classes.video} loop autoPlay src={secondarySrc} />
            </div>
            <div className={classes.controls}>
                <IconButton>
                    <PlayIcon />
                </IconButton>
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
