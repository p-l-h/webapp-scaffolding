

import browserify from 'browserify';
import uglifyJs from 'uglify-js';


export default function (filePath, minify, callback) {
    
    callback = callback || function() {};
    
    browserify().add(filePath)
        .bundle(
            (err, buf) => {
                if (err) {
                    console.err(err);
                }
                
                if (minify) {
                    callback(uglifyJs(String(buf)));
                }
                else {
                    callback(String(buf));
                }
                
            }
        );
} 