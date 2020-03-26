const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const BASE_OUTPUT_OPTIONS = ['-map 0', '-c copy'];

const OPTION_FLAGS = {
    audioBitrate: {
        default: '',
        defaultFlag: '-b:a',
    },
    audioCodec: {
        defaultFlag: '-c:a',
        none: '-an',
        passthru: '',
    },
};

const getOutputPath = (input, destination) => {
    const { dir, ext, name } = path.parse(input);
    const filename = `${name} (1)${ext}`;
    const outputDirectory = destination || dir;

    return path.resolve(outputDirectory, filename);
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

const convert = ({ input, options = {}, callbacks = {}, destination }) => {
    const {
        onConversionEnd = () => {},
        onConversionStart = () => {},
        onConversionProgress = () => {},
        onConversionError = () => {},
    } = callbacks;

    const output = getOutputPath(input, destination);
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
