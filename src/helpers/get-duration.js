const music = require('music-metadata');

const getDuration = (path) => {
    return music.parseFile(path)
        .then(metadata => new Promise((resolve, reject) => {
            const duration = parseFloat(metadata.format.duration);
            if (!duration) {
                reject(`Duration is undefided. Maybe you need to run 'git lfs pull' ?`);
            }
            resolve(new Date(Math.ceil(duration) * 1000).toISOString().substr(11, 8));
        }))
        .catch(error => {
            console.log(error);
        });
}

module.exports = getDuration;