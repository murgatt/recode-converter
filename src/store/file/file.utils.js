export const getDirPathFromFilePath = filePath => {
    const filePathArray = filePath.split('/');
    filePathArray.pop();

    return filePathArray.join('/');
};

export const areFilesFromSameDirectory = files =>
    files.every(file => getDirPathFromFilePath(file.path) === getDirPathFromFilePath(files[0].path));

export default {
    areFilesFromSameDirectory,
    getDirPathFromFilePath,
};
