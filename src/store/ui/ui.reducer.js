import { OPEN_FFMPEG_ALERT, CLOSE_FFMPEG_ALERT, OPEN_VERSION_ALERT, CLOSE_VERSION_ALERT } from './ui.actions';

const initialState = {
    isFfmpegAlertOpen: false,
    isVersionAlertOpen: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_FFMPEG_ALERT:
            return { ...state, isFfmpegAlertOpen: true };
        case CLOSE_FFMPEG_ALERT:
            return { ...state, isFfmpegAlertOpen: false };
        case OPEN_VERSION_ALERT:
            return { ...state, isVersionAlertOpen: true };
        case CLOSE_VERSION_ALERT:
            return { ...state, isVersionAlertOpen: false };
        default:
            return state;
    }
};
