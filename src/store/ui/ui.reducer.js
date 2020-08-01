import { OPEN_FFMPEG_ALERT, CLOSE_FFMPEG_ALERT } from './ui.actions';

const initialState = {
    isFfmpegAlertOpen: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_FFMPEG_ALERT:
            return { ...state, isFfmpegAlertOpen: true };
        case CLOSE_FFMPEG_ALERT:
            return { ...state, isFfmpegAlertOpen: false };
        default:
            return state;
    }
};
