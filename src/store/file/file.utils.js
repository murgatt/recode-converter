export const getDirPathFromFilePath = filePath => {
    const pathSeparator = navigator.platform === 'Win32' ? '\\' : '/';
    const filePathArray = filePath.split(pathSeparator);
    filePathArray.pop();

    return filePathArray.join(pathSeparator);
};

export const areFilesFromSameDirectory = files =>
    files.every(file => getDirPathFromFilePath(file.path) === getDirPathFromFilePath(files[0].path));

export default {
    areFilesFromSameDirectory,
    getDirPathFromFilePath,
};
