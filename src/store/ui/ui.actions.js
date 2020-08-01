const { ipcRenderer } = window.require('electron');

export const OPEN_FFMPEG_ALERT = 'ui/OPEN_FFMPEG_ALERT';
export const CLOSE_FFMPEG_ALERT = 'ui/CLOSE_FFMPEG_ALERT';

export const openFfmpegAlert = dispatch => dispatch({ type: OPEN_FFMPEG_ALERT });
export const closeFfmpegAlert = dispatch => {
    dispatch({ type: CLOSE_FFMPEG_ALERT });
    ipcRenderer.send('quit-app');
};
