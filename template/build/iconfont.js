

import txicons from 'txcions';
import path from 'path';

txicons({
    source: path.normalize(__dirname + '/../app/img/svg/*.svg'),
    dest: path.normalize(__dirname + '/../app/common/css/_fonts.scss')
});