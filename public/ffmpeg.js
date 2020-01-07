const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const SAMPLE = '/Users/tmurgat/Downloads/sample.mkv';
const OUTPUT = '/Users/tmurgat/Downloads/sample-output.mkv';

const convert = ({ input }) => {
    console.log('RUN CMD', input);

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
                resolve({ convertedFilePath: OUTPUT });
            })
            .on('progress', progress => console.log(`PROGRESS: ${progress.percent}`))
            // .outputOptions('-map', '0', '-c', 'copy', '-c:a', 'ac3')
            .saveToFile(OUTPUT);
    });
};

exports.convert = convert;
