const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const getOutputPath = input => {
    const { dir, ext, name } = path.parse(input);
    const filename = `${name} (1)${ext}`;

    return path.resolve(dir, filename);
};

const convert = ({ input }) => {
    const output = getOutputPath(input);

    return new Promise((resolve, reject) => {
        ffmpeg(input)
            .on('start', commandLine => {
                console.log(`Spawned Ffmpeg with command: ${commandLine}`);
            })
            .on('error', (err, stdout, stderr) => {
                console.log(err, stdout, stderr);
                reject(err);
            })
            .on('end', (stdout, stderr) => {
                console.log(stdout, stderr);
                resolve({ convertedFilePath: output });
            })
            .on('progress', progress => console.log(`PROGRESS: ${progress.percent}`))
            .outputOptions('-map', '0', '-c', 'copy', '-c:a', 'ac3')
            .saveToFile(output);
    });
};

exports.convert = convert;
