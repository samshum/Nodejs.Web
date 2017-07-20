var server = require('./app');

server.listen({host:'127.0.0.1', port:3002}, function(){
	console.log('[SERVER] running at http://127.0.0.1:3002/');
});