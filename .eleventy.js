const fs = require('fs');
const htmlmin = require('html-minifier');
const markdown = require('markdown-it')({ html: true });
const prettydata = require('pretty-data');
const getDuration = require('./src/helpers/get-duration');

module.exports = (config) => {
    config.addFilter('length', (path) => {
        const stats = fs.statSync(path);
        return stats.size;
    });

    config.addNunjucksAsyncFilter('duration', async (path, callback) => {
        const duration = await getDuration(path);

        callback(null, duration);
    });

    config.addFilter('ruDate', (value) => {
        return value.toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).replace(' г.', '');
    });

    config.addFilter('enDate', (value) => {
        return value.toLocaleString('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });

    config.addFilter('htmlmin', (value) => {
        return htmlmin.minify(
            value, {
                removeComments: true,
                collapseWhitespace: true
            }
        );
    });

    config.addFilter('markdown', (value) => {
        return markdown.render(value);
    });

    config.addTransform('xmlmin', (content, outputPath) => {
        if(outputPath && outputPath.endsWith('.xml')) {
            return prettydata.pd.xmlmin(content);
        }
        return content;
    });

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            data: 'data'
        },
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk'
    };
};
