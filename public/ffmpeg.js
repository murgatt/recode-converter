const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const optionsMap = {
    audioBitrate: {
        default: {
            flag: '-c:a',
        },
        none: {
            flag: '-na',
            value: '',
        },
        passthru: {
            flag: '',
            value: '',
        }
    }
};

const getOutputPath = input => {
    const { dir, ext, name } = path.parse(input);
    const filename = `${name} (1)${ext}`;

    return path.resolve(dir, filename);
};

const getSingleOutputOption = (key, value) => {
    const option = optionsMap[key];
    if (!option) {
        return ['', ''];
    }

    const currentOptionMap = option[value] || option.default;
    const outputFlag = currentOptionMap.flag;
    const outputValue = currentOptionMap.hasOwnProperty('value') ? currentOptionMap.value : value;

    return [outputFlag, outputValue];
};

const getOutputOptions = options => {
    const outputOptions = [];
    Object.keys(options).forEach(optionKey => {
        const optionValue = options[optionKey];
        outputOptions.concat(getSingleOutputOption(optionKey, optionValue));
    });
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
    console.log('outputOptions', outputOptions);

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
            .outputOptions('-map', '0', '-c', 'copy')
            .saveToFile(output);
    });
};

exports.convert = convert;
