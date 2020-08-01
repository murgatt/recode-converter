const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const { exec } = require('child_process');

const BASE_OUTPUT_OPTIONS = ['-map 0', '-c copy'];

const OPTION_FLAGS = {
    audioBitrate: {
        default: '',
        defaultFlag: '-b:a',
    },
    audioChannels: {
        default: '',
        defaultFlag: '-ac',
    },
    audioCodec: {
        defaultFlag: '-c:a',
        none: '-an',
        passthru: '',
    },
    audioSampleRate: {
        default: '',
        defaultFlag: '-ar',
    },
};

const getOutputPath = (inputPath, destination) => {
    const { dir, ext, name } = path.parse(inputPath);
    const filename = `${name} (1)${ext}`;
    const outputDirectory = destination || dir;

    return path.resolve(outputDirectory, filename);
};

const getIgnoredStreamsOptions = ignoredStreams => {
    return ignoredStreams.map(ignoredStreamIndex => `-map -0:${ignoredStreamIndex}`);
};

const getStreamsMetadataOptions = streamsMetadata => {
    const streamsMetadataOptions = [];
    streamsMetadata.forEach(({ index, key, value }) => {
        streamsMetadataOptions.push(`-metadata:s:${index}`);
        streamsMetadataOptions.push(`${key}=${value}`);
    });

    // metadata with spaces workaround
    return streamsMetadataOptions.length ? streamsMetadataOptions : [[]];
};

const getSingleOutputOption = (option, value) => {
    const optionFlag = OPTION_FLAGS[option];
    if (optionFlag) {
        return value in optionFlag ? optionFlag[value] : `${optionFlag.defaultFlag} ${value}`;
    }

    return '';
};

const getOutputOptions = options => {
    const outputOptions = [...BASE_OUTPUT_OPTIONS];
    Object.keys(options).forEach(optionKey => {
        const optionValue = options[optionKey];
        const outputOption = getSingleOutputOption(optionKey, optionValue);

        if (outputOption) {
            outputOptions.push(outputOption);
        }
    });

    return outputOptions;
};

const convert = ({ file, options = {}, callbacks = {}, destination }) => {
    const { ignoredStreams, path: inputPath, streamsMetadata } = file;
    const {
        onConversionEnd = () => {},
        onConversionStart = () => {},
        onConversionProgress = () => {},
        onConversionError = () => {},
    } = callbacks;

    const output = getOutputPath(inputPath, destination);
    const outputOptions = getOutputOptions(options, file);
    const ignoredStreamsOptions = getIgnoredStreamsOptions(ignoredStreams);
    const streamsMetadataOptions = getStreamsMetadataOptions(streamsMetadata);

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .on('start', commandLine => {
                console.log(`Spawned Ffmpeg with command: ${commandLine}`);
                onConversionStart(inputPath);
            })
            .on('error', (err, stdout, stderr) => {
                console.log(err, stdout, stderr);
                onConversionError(inputPath);
                reject(err);
            })
            .on('end', (stdout, stderr) => {
                console.log(stdout, stderr);
                resolve({ convertedFilePath: output });
                onConversionEnd(inputPath);
            })
            .on('progress', progress => {
                console.log(`PROGRESS: ${progress.percent}`);
                onConversionProgress(inputPath, progress);
            })
            .outputOptions(outputOptions)
            .addOutputOptions(ignoredStreamsOptions)
            // metadata with spaces workaround
            .addOutputOptions(...streamsMetadataOptions)
            .saveToFile(output);
    });
};

function checkFfmpegInstallation(callback) {
    exec('ffmpeg -version', (error) => {
        if (error) {
            console.error(error);
        }

        callback(!error);
    });
}

exports.convert = convert;
exports.checkFfmpegInstallation = checkFfmpegInstallation;
