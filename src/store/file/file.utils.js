export const getDirPathFromFilePath = filePath => {
    const pathSeparator = navigator.platform === 'Win32' ? '\\' : '/';
    const filePathArray = filePath.split(pathSeparator);
    filePathArray.pop();

    return filePathArray.join(pathSeparator);
};

export const areFilesFromSameDirectory = files =>
    files.every(file => getDirPathFromFilePath(file.path) === getDirPathFromFilePath(files[0].path));

export const formatFileSize = (size, decimals = 2) => {
    if (size === 0) return '0 octets';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['octets', 'Ko', 'Mo', 'Go', 'To'];

    const i = Math.floor(Math.log(size) / Math.log(k));
    const parsedSize = parseFloat((size / k ** i).toFixed(dm)).toLocaleString();

    return `${parsedSize} ${sizes[i]}`;
};

export default {
    areFilesFromSameDirectory,
    getDirPathFromFilePath,
};
