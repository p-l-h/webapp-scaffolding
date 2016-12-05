

import browserify from 'browserify';
import uglifyJs from 'uglify-js';


export default function (filePath, minify, callback) {
    callback = callback || function() {};
    browserify().add(filePath)
        .bundle(
            (err, buf) => {
                if (err) {
                    console.error(err);
                }

                let result = String(buf);
                if (minify) {
                    result = uglifyJs(result);
                }
                callback(result);
            }
        );
}
