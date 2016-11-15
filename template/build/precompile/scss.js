

import sass from 'node-sass';
import postcss from 'postcss';
import autoPrefixer from 'autoprefixer';
import cleanCss from 'clean-css';


/**
 * css handler
 *
 */
export default function (filePath, minify, callback) {
    
    callback = callback || function () {};
    
    sass.render(
        {
            file: filePath
        },
        (err, result) => {
                        
            if (err) {
                console.error(err);
                return;
            }
            
            if (!result) {
                callback('');
                return;
            }
            
            postcss(
                autoPrefixer(
                    {
                        browsers: ['last 3 versions']
                    }
                )
            )
            .process(result.css)
            .then((css) => {
                if (minify) {
                    callback(new CleanCss().minify(css.css).styles);
                }
                else {
                    callback(css.css);
                }
            });
        }
    )
}


