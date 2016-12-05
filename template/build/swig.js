

import swig from 'swig';

swig.setFilter('length', function (input) {
    return input.length;
});

swig.setFilter('json', function (input) {
    return JSON.stringify(input);
});

swig.setFilter('nl2br', function (input) {
    return input.replace('\n', '<br/>');
});

swig.setFilter('striptags', function(input) {
    return input;
});

swig.setFilter(
    'numberformat',
    (input) => {
        return input;
    }
);

swig.setDefaults({
    cache: false,
    loader: {
        resolve: function (to, from) {

            if (to.indexOf('.html') < 0) {
                to = to + '.html';
            }

            if (from) {
                to = 'app/' + to;
            }

            return  to;
        },
        load: function (identifier,cb) {

            let encoding = encoding || 'utf8';
            let template = dirRoot + '/' + identifier;


            if (!cb) {
                return fs.readFileSync(template, encoding);
            }
            else {
                fs.readFile(dirRoot + '/' + identifier, encoding, cb);
            }

        }
    }
});

export default swig;
