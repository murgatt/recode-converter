const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const getOutputPath = input => {
    const { dir, ext, name } = path.parse(input);
    const filename = `${name} (1)${ext}`;

    return path.resolve(dir, filename);
};

const convert = (options, callbacks = {}) => {
    const { input } = options;
    const {
        onConversionEnd = () => {},
        onConversionStart = () => {},
        onConversionProgress = () => {},
        onConversionError = () => {},
    } = callbacks;

    const output = getOutputPath(input);

    return new Promise((resolve, reject) => {
        ffmpeg(input)
            .on('start', commandLine => {
                console.log(`Spawned Ffmpeg with command: ${commandLine}`);
                onConversionStart(input);
            })
            .on('error', (err, stdout, stderr) => {
                console.log(err, stdout, stderr);
                onConversionError(input);
                reject(err);
            })
            .on('end', (stdout, stderr) => {
                console.log(stdout, stderr);
                resolve({ convertedFilePath: output });
                onConversionEnd(input);
            })
            .on('progress', progress => {
                console.log(`PROGRESS: ${progress.percent}`);
                onConversionProgress(input, progress);
            })
            .outputOptions('-map', '0', '-c', 'copy', '-c:a', 'ac3')
            .saveToFile(output);
    });
};

exports.convert = convert;
