const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const ffmpegOptions = require('./ffmpegOptions');

const BASE_OUTPUT_OPTIONS = ['-map 0', '-c copy'];

const getOutputOptionsMap = {
    audioBitrate: ffmpegOptions.getBitrateOutputOption,
    audioCodec: ffmpegOptions.getCodecOutputOption,
};

const getOutputPath = input => {
    const { dir, ext, name } = path.parse(input);
    const filename = `${name} (1)${ext}`;

    return path.resolve(dir, filename);
};

const getOutputOptions = options => {
    const outputOptions = [...BASE_OUTPUT_OPTIONS];
    Object.keys(options).forEach(optionKey => {
        const optionValue = options[optionKey];
        const getOutputOption = getOutputOptionsMap[optionKey];
        const outputOption = getOutputOption ? getOutputOption(optionValue) : null;

        if (outputOption) {
            outputOptions.push(outputOption);
        }
    });

    return outputOptions;
};

const convert = ({ input, options = {}, callbacks = {} }) => {
    const {
        onConversionEnd = () => {},
        onConversionStart = () => {},
        onConversionProgress = () => {},
        onConversionError = () => {},
    } = callbacks;

    const output = getOutputPath(input);
    const outputOptions = getOutputOptions(options);

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
            .outputOptions(outputOptions)
            .saveToFile(output);
    });
};

exports.convert = convert;
