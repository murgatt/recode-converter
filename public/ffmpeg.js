const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

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
    return streamsMetadata.map(({ index, key, value }) => {
        return `-metadata:s:${index} ${key}=${value}`;
    });
};

const getSingleOutputOption = (option, value) => {
    const optionFlag = OPTION_FLAGS[option];
    if (optionFlag) {
        return value in optionFlag ? optionFlag[value] : `${optionFlag.defaultFlag} ${value}`;
    }

    return '';
};

const getOutputOptions = (options, file) => {
    const { ignoredStreams, streamsMetadata } = file;
    const ignoredStreamsOptions = getIgnoredStreamsOptions(ignoredStreams);
    const streamsMetadataOptions = getStreamsMetadataOptions(streamsMetadata);
    const outputOptions = [...BASE_OUTPUT_OPTIONS, ...ignoredStreamsOptions, ...streamsMetadataOptions];
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
    const { path: inputPath } = file;
    const {
        onConversionEnd = () => {},
        onConversionStart = () => {},
        onConversionProgress = () => {},
        onConversionError = () => {},
    } = callbacks;

    const output = getOutputPath(inputPath, destination);
    const outputOptions = getOutputOptions(options, file);

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
            .saveToFile(output);
    });
};

exports.convert = convert;
