const path = require('path');
const fs = require('fs');
const getDuration = require('../helpers/get-duration');
const directoryPath = require('../data/data.json').paths.file;

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(async function (file) {
        const filePath = path.resolve(directoryPath, file);
        const duration = await getDuration(filePath).catch(error => console.error(error));
        if (!duration) {
            process.exit(1);
        }
    });
});
