

import Hapi from 'hapi';
import Inert from 'inert';
import fs from 'fs';
import path from 'path';

import dealScss from './precompile/scss';
import dealJs from './precompile/babel';

import initServer from '../mock/index';

{{#swig}}
import {swig} from './swig';
{{/swig}}


const server = new Server({
    connection: {
        state: {
            ingoreErrors: true
        }
    }
});

// regist the static file and directory handlers
server.register(Inert);

// serve all static files
server.route({
    path: '/{param*}',
    method: 'GET',
    handler: {
        directory: {
            path: './',
            listing: true
        }
    }
});

// serve the static files need precompiled
server.route({
    path: '/app/{param*}',
    method: 'GET',
    handler: (request, reply) => {
        let filePath = 'app/' + request.params.param
        let length = filePath.length;
        
        if (filePath.slice(length - 4, length) === '.css') {
            filePath = filePath.replace('.css', 'scss');
        }
        
        try {
            let fileStat = fs.statSync(filePath);
            
            if (fileStat.isDirectory()) {
                reply.continue();
            }
            else {
                switch(path.extname(filePath)){
                    case 'js':
                        dealJs(filePath, false, (result) => {
                            reply(result)
                                .type('text/javascript');
                        });
                        break;
                    case 'scss':
                        dealScss(filePath, false, (result) => {
                            reply(result)
                                .type('text/css');
                        });
                        break;
                    default:
                        reply.continue();
                        break;
                }
            }
            
        }
        catch (e) {
            reply.continue();
        }
    }
});

// regist other request
initServer(server);
  
server.connection({
    host: '0.0.0.0'
});
  
server.start(
    (err) => {
        if (err) {
            console.log(err);
        }
        console.log('server started at ', server.info.uri);
    }
);


