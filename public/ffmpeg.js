const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const SAMPLE = '/Users/tmurgat/Downloads/sample.mkv';
const OUTPUT = '/Users/tmurgat/Downloads/sample-output.mkv';

const convert = ({ input }) => {
    console.log('RUN CMD', input);

    return new Promise((resolve, reject) => {
        ffmpeg(SAMPLE)
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
            .saveToFile(OUTPUT);
    });
};

const listFiles = () => {
    const directoryPath = path.resolve(SAMPLE);
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);
        });
    });
};

exports.convert = convert;
